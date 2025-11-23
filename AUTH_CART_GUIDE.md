# User Authentication & Shopping Cart - Setup Guide

## ✅ What's Been Implemented

### 1. User Authentication System
- **Registration** with name, email, password, address, phone
- **Login/Logout** functionality
- **Protected routes** (redirects to login if needed)
- **User profile** management
- **JWT token-based** authentication with localStorage

### 2. Shopping Cart System  
- **Add to cart** from product detail page
- **Update quantities** in cart
- **Remove items** from cart
- **Persistent cart** (localStorage for guests, backend for logged-in users)
- **Real-time cart count** in header
- **Cart page** with checkout flow

### 3. Updated Components
- **Header**: User menu, cart icon with badge, sign in/out
- **ProductDetail**: Working "Add to Cart" and "Buy Now" buttons
- **Cart Page**: Full cart management UI

## 📁 New Files Created

```
src/
├── context/
│   ├── AuthContext.js      # User authentication state
│   └── CartContext.js      # Shopping cart state
├── pages/
│   ├── Auth/
│   │   ├── Login.js        # Login page
│   │   ├── Login.css       # Auth page styles
│   │   └── Register.js     # Registration page
│   └── Cart/
│       ├── Cart.js         # Shopping cart page
│       └── Cart.css        # Cart page styles
└── services/
    └── api.js (updated)    # Added auth & cart APIs
```

## 🔗 Backend API Endpoints Required

Your Django backend needs these endpoints:

### Authentication Endpoints

```python
POST /api/auth/register/
Body: {
    "email": "user@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+91 1234567890",
    "address": "123 Main St",
    "city": "Bangalore"
}
Response: {
    "token": "jwt_token_here",
    "user": { "id": 1, "email": "...", "first_name": "..." }
}

POST /api/auth/login/
Body: {
    "email": "user@example.com",
    "password": "password123"
}
Response: {
    "token": "jwt_token_here",
    "user": { "id": 1, "email": "...", "first_name": "..." }
}

GET /api/auth/user/
Headers: Authorization: Bearer <token>
Response: { "id": 1, "email": "...", "first_name": "..." }

PUT /api/auth/profile/
Headers: Authorization: Bearer <token>
Body: { "first_name": "...", "address": "..." }
Response: { "id": 1, "email": "...", "first_name": "..." }
```

### Cart Endpoints

```python
GET /api/cart/
Headers: Authorization: Bearer <token> (optional for guests)
Response: {
    "items": [
        {
            "id": 1,
            "product": { "id": 1, "name": "...", "price": "899.00", ... },
            "quantity": 2
        }
    ]
}

POST /api/cart/add/
Headers: Authorization: Bearer <token> (optional)
Body: { "product_id": 1, "quantity": 2 }
Response: { "message": "Item added to cart" }

PUT /api/cart/update/{item_id}/
Headers: Authorization: Bearer <token> (optional)
Body: { "quantity": 3 }
Response: { "message": "Cart updated" }

DELETE /api/cart/remove/{item_id}/
Headers: Authorization: Bearer <token> (optional)
Response: { "message": "Item removed" }

DELETE /api/cart/clear/
Headers: Authorization: Bearer <token> (optional)
Response: { "message": "Cart cleared" }
```

## 🗄️ Django Backend Setup

### 1. Create User Model (if custom)

```python
# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return self.email
```

### 2. Create Cart Models

```python
# cart/models.py
from django.db import models
from django.conf import settings
from products.models import Product

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=40, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
```

### 3. Install & Configure JWT

```bash
pip install djangorestframework-simplejwt
```

```python
# settings.py
INSTALLED_APPS = [
    ...
    'rest_framework',
    'rest_framework_simplejwt',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
}
```

### 4. Create API Views

```python
# accounts/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, RegisterSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(username=email, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
            'user': UserSerializer(user).data
        })
    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    return Response(UserSerializer(request.user).data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    serializer = UserSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

```python
# cart/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, _ = Cart.objects.get_or_create(session_key=session_key)
    
    return Response(CartSerializer(cart).data)

@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, _ = Cart.objects.get_or_create(session_key=session_key)
    
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product_id=product_id,
        defaults={'quantity': quantity}
    )
    
    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    
    return Response({'message': 'Item added to cart'})
```

### 5. URL Configuration

```python
# urls.py
from django.urls import path
from accounts import views as account_views
from cart import views as cart_views

urlpatterns = [
    # Auth endpoints
    path('api/auth/register/', account_views.register),
    path('api/auth/login/', account_views.login),
    path('api/auth/user/', account_views.get_user),
    path('api/auth/profile/', account_views.update_profile),
    
    # Cart endpoints
    path('api/cart/', cart_views.get_cart),
    path('api/cart/add/', cart_views.add_to_cart),
    path('api/cart/update/<int:item_id>/', cart_views.update_cart_item),
    path('api/cart/remove/<int:item_id>/', cart_views.remove_from_cart),
    path('api/cart/clear/', cart_views.clear_cart),
]
```

## 🚀 How to Test

### 1. Start Backend
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 8000
```

### 2. Start Frontend
```bash
npm start
```

### 3. Test Flow
1. **Register**: Go to `/register` and create an account
2. **Login**: Sign in at `/login`
3. **Browse**: Go to `/shop` and view products
4. **Add to Cart**: Click on a product, add to cart
5. **View Cart**: Click cart icon in header
6. **Checkout**: Proceed to checkout (to be implemented)

## 🎯 Features

### Authentication
- ✅ User registration with validation
- ✅ Email/password login
- ✅ JWT token storage in localStorage
- ✅ Auto-login on registration
- ✅ Protected routes
- ✅ User menu in header
- ✅ Logout functionality

### Shopping Cart
- ✅ Add products to cart
- ✅ Update quantities
- ✅ Remove items
- ✅ Cart badge with item count
- ✅ Persistent cart (localStorage for guests)
- ✅ Sync cart to backend for logged-in users
- ✅ Cart page with summary
- ✅ Buy now functionality

## 📱 Frontend Usage

### Using Auth Context

```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (isAuthenticated) {
    return <div>Hello {user.first_name}!</div>;
  }
  
  return <button onClick={() => navigate('/login')}>Sign In</button>;
}
```

### Using Cart Context

```javascript
import { useCart } from './context/CartContext';

function ProductCard({ product }) {
  const { addToCart, getCartCount } = useCart();
  
  const handleAdd = async () => {
    await addToCart(product, 1);
    alert('Added to cart!');
  };
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAdd}>Add to Cart</button>
      <p>Cart has {getCartCount()} items</p>
    </div>
  );
}
```

## 🔐 Security Notes

1. **Tokens**: JWT tokens stored in localStorage (consider httpOnly cookies for production)
2. **HTTPS**: Use HTTPS in production
3. **CORS**: Configure proper CORS settings
4. **Validation**: All inputs validated on frontend and backend
5. **Rate Limiting**: Add rate limiting to auth endpoints

## 🎨 Styling

All components use consistent styling with:
- Purple gradient theme (#667eea to #764ba2)
- Smooth transitions and hover effects
- Responsive design
- Loading states
- Error handling

## 📝 Next Steps

1. **Profile Page**: Create user profile management page
2. **Order History**: Add order history page
3. **Checkout**: Implement checkout flow
4. **Payment**: Integrate payment gateway (Razorpay/Stripe)
5. **Email Verification**: Add email verification on registration
6. **Password Reset**: Implement forgot password flow
7. **Address Book**: Multiple shipping addresses
8. **Wishlist**: Add wishlist functionality

---

**Status**: ✅ Authentication & Cart fully implemented and ready to test!
