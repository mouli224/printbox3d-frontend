import API_BASE_URL from '../config/api';

// Product API functions
export const productAPI = {
  // Get all products with optional filters
  getAll: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Map frontend filters to backend query parameters
      if (filters.category && filters.category !== 'all') {
        queryParams.append('category__slug', filters.category);
      }
      if (filters.material && filters.material !== 'all') {
        queryParams.append('material__name', filters.material);
      }
      if (filters.sort) {
        // Map sort options to backend ordering
        const sortMap = {
          'price-low': 'price',
          'price-high': '-price',
          'name': 'name',
          'featured': '-is_featured'
        };
        queryParams.append('ordering', sortMap[filters.sort] || '-created_at');
      }
      if (filters.page) {
        queryParams.append('page', filters.page);
      }

      const url = `${API_BASE_URL}/api/products/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // Return the results array from paginated response
      return data.results || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get a single product by slug or ID
  getBySlug: async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${slug}/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${slug}:`, error);
      throw error;
    }
  },

  // Get featured products
  getFeatured: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/featured/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Get best sellers
  getBestSellers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/best_sellers/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      throw error;
    }
  }
};

// Contact form API
export const contactAPI = {
  submit: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit contact form');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
};

// Custom order API
export const customOrderAPI = {
  submit: async (formData) => {
    try {
      // Backend expects multipart/form-data with design_file field
      const response = await fetch(`${API_BASE_URL}/api/custom-orders/`, {
        method: 'POST',
        body: formData // FormData object, don't set Content-Type header
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit custom order');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting custom order:', error);
      throw error;
    }
  }
};

// Categories API
export const categoryAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // Handle paginated response - return results array
      return data.results || data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getBySlug: async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/${slug}/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching category ${slug}:`, error);
      throw error;
    }
  }
};

// Newsletter API
export const newsletterAPI = {
  subscribe: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.email?.[0] || 'Failed to subscribe');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }
};

// Testimonials API
export const testimonialAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials/featured/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured testimonials:', error);
      throw error;
    }
  }
};

// Authentication API
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        let errorData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData = { detail: 'Registration endpoint not available. Please set up the backend.' };
        }
        const error = new Error('Registration failed');
        error.status = response.status;
        error.data = errorData;
        throw error;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        let errorData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData = { detail: 'Login endpoint not available. Please set up the backend.' };
        }
        const error = new Error('Login failed');
        error.status = response.status;
        error.data = errorData;
        throw error;
      }
      
      const data = await response.json();
      // Store token in sessionStorage (clears on browser close)
      if (data.token) {
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  logout: () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        // Token might be invalid, clear it
        authAPI.logout();
        return null;
      }
      
      const user = await response.json();
      sessionStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error fetching current user:', error);
      authAPI.logout();
      return null;
    }
  },

  updateProfile: async (userData) => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error('Profile update failed');
        error.status = response.status;
        error.data = errorData;
        throw error;
      }
      
      const data = await response.json();
      sessionStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
};

// Cart API
export const cartAPI = {
  getCart: async () => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/`, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  addItem: async (productId, quantity = 1) => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ product_id: productId, quantity })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add item to cart');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  updateItem: async (itemId, quantity) => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/update/${itemId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ quantity })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  removeItem: async (itemId) => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/remove/${itemId}/`, {
        method: 'DELETE',
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  },

  clearCart: async () => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/clear/`, {
        method: 'DELETE',
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

// Payment/Order API
export const orderAPI = {
  // Create order and get Razorpay order details
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Verify payment after Razorpay payment
  verifyPayment: async (paymentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/verify-payment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment verification failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  // Get order status by order ID
  getOrderStatus: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw error;
    }
  },

  // Record payment failure
  recordPaymentFailure: async (failureData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/payment-failed/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(failureData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to record payment failure');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error recording payment failure:', error);
      throw error;
    }
  }
};

// Default export with all APIs
const api = {
  get: async (url, options = {}) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error || errorData.detail || 'Request failed');
    }
    
    return await response.json();
  },

  post: async (url, data, options = {}) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error || errorData.detail || 'Request failed');
    }
    
    return await response.json();
  },

  put: async (url, data, options = {}) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error || errorData.detail || 'Request failed');
    }
    
    return await response.json();
  },

  delete: async (url, options = {}) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error || errorData.detail || 'Request failed');
    }
    
    return await response.json();
  }
};

export default api;
