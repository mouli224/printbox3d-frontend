# Backend Integration Guide

## Setup Complete ✅

Your frontend is now fully integrated with your Django backend running on `localhost:8000`.

## What's Changed

### 1. API Service Layer (`src/services/api.js`)
- **Product API**: Fetches products with filters, featured products, and best sellers
- **Contact API**: Submits contact form messages
- **Custom Order API**: Handles custom order submissions with file uploads
- **Category API**: Fetches product categories
- **Newsletter API**: Handles newsletter subscriptions
- **Testimonial API**: Fetches customer testimonials

### 2. Updated Components

#### Products
- **Shop.js**: Fetches products from `/api/products/` with filters
- **ProductDetail.js**: Fetches product details by slug from `/api/products/{slug}/`
- **BestSellers.js**: Fetches from `/api/products/best_sellers/` or `/api/products/featured/`

#### Forms
- **Contact.js**: Submits to `/api/contact/`
- **CustomOrder.js**: Submits to `/api/custom-orders/` with file upload

#### Other Components
- **FeaturedCategories.js**: Fetches from `/api/categories/`
- **Testimonials.js**: Fetches from `/api/testimonials/featured/`

### 3. Key Features

✅ **Automatic error handling** with fallback UI
✅ **Loading states** for better UX
✅ **CORS proxy** configured in package.json
✅ **Product slugs** for SEO-friendly URLs
✅ **File upload support** for custom orders
✅ **Pagination ready** (backend returns paginated results)

## API Endpoints Used

```
GET  /api/products/                    - List all products (with filters)
GET  /api/products/{slug}/             - Get product detail
GET  /api/products/featured/           - Get featured products
GET  /api/products/best_sellers/       - Get best selling products
GET  /api/categories/                  - List all categories
POST /api/contact/                     - Submit contact form
POST /api/custom-orders/               - Submit custom order
POST /api/newsletter/                  - Subscribe to newsletter
GET  /api/testimonials/featured/       - Get featured testimonials
```

## How to Run

### 1. Start Backend
```bash
# In your backend directory
python manage.py runserver 8000
```

### 2. Start Frontend
```bash
# In your frontend directory
npm start
```

The app will run on `http://localhost:3000` and connect to backend on `http://localhost:8000`.

## Environment Variables

Create a `.env` file in the frontend root:

```env
REACT_APP_API_URL=http://localhost:8000
```

For production, update to your Railway deployment URL:
```env
REACT_APP_API_URL=https://your-app.railway.app
```

## Filter Mapping

Frontend filters are automatically mapped to backend query parameters:

| Frontend Filter | Backend Query Parameter |
|----------------|------------------------|
| `category: 'home-decor'` | `category__slug=home-decor` |
| `material: 'PLA'` | `material__name=PLA` |
| `sort: 'price-low'` | `ordering=price` |
| `sort: 'price-high'` | `ordering=-price` |
| `sort: 'name'` | `ordering=name` |

## Response Format

The backend returns paginated responses:

```json
{
  "count": 10,
  "next": "http://localhost:8000/api/products/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Product Name",
      "slug": "product-name",
      "price": "899.00",
      "category_name": "Home Decor",
      "material_name": "PLA",
      ...
    }
  ]
}
```

The frontend automatically extracts the `results` array.

## Troubleshooting

### CORS Issues
If you see CORS errors, make sure:
1. Backend has `http://localhost:3000` in `CORS_ALLOWED_ORIGINS`
2. Frontend `package.json` has `"proxy": "http://localhost:8000"`
3. Both servers are running

### 404 Errors
- Check that backend URLs end with `/` (e.g., `/api/products/`)
- Verify backend is running on port 8000
- Check Django URL patterns match the API calls

### Image Loading Issues
- Images paths from backend are relative (e.g., `/media/products/image.jpg`)
- Make sure Django is serving media files in development:
  ```python
  # In urls.py
  from django.conf import settings
  from django.conf.urls.static import static
  
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  ```

## Testing the Integration

1. **Products Page**: Navigate to `/shop` - should load products from backend
2. **Product Detail**: Click any product - should load full details
3. **Contact Form**: Submit a message - should save to backend
4. **Custom Order**: Submit with file - should upload to backend
5. **Home Page**: Should load featured products, categories, and testimonials

## Next Steps

- Add authentication for user accounts
- Implement shopping cart functionality
- Add order management
- Set up payment gateway integration
- Deploy to production (Railway, Vercel, etc.)

---

**Integration Status**: ✅ Complete
**Backend URL**: http://localhost:8000
**Frontend URL**: http://localhost:3000
