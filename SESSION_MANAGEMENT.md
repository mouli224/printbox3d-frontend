# Session Management

## Overview
The application now uses **sessionStorage** instead of localStorage for better security and user experience.

## How It Works

### sessionStorage vs localStorage

| Feature | sessionStorage | localStorage (previous) |
|---------|---------------|------------------------|
| **Persistence** | Cleared when tab/window closes | Persists indefinitely |
| **Scope** | Per tab/window | Shared across all tabs |
| **Use Case** | Sensitive session data | Long-term preferences |

### What Gets Cleared on Browser/Tab Close

1. **Authentication**
   - User login status
   - Auth token
   - User profile data

2. **Shopping Cart**
   - Cart items
   - Item quantities
   - Cart total

### Benefits

✅ **Better Security**: Auth tokens don't persist after closing browser  
✅ **Privacy**: Shopping cart cleared when session ends  
✅ **No Stale Data**: Fresh start each session  
✅ **Prevents Token Theft**: Tokens expire with browser session  

## Implementation

### Files Updated

1. **src/context/AuthContext.js**
   - Reads user and token from `sessionStorage`
   - Clears on browser close

2. **src/context/CartContext.js**
   - Stores cart in `sessionStorage`
   - Auto-cleared when tab closes

3. **src/services/api.js**
   - All API calls use `sessionStorage` for auth tokens
   - Token cleared on logout or browser close

## User Experience

### Normal Refresh (F5 or Ctrl+R)
- ✅ User stays logged in
- ✅ Cart items preserved
- Session continues

### Close Tab/Window
- ❌ User logged out
- ❌ Cart cleared
- Fresh session on next visit

### Multiple Tabs
- Each tab has its own session
- Logging in one tab doesn't affect others
- Independent carts per tab

## Development Notes

If you need to test persistent login during development, temporarily switch back to `localStorage` in:
- `AuthContext.js`
- `CartContext.js`
- `api.js`

For production, **always use sessionStorage** for sensitive data.

## Migration from localStorage

Any existing data in localStorage from previous sessions will not be automatically migrated. Users will need to log in again on their next visit.

To manually clear old data (optional):
```javascript
// Run once in browser console
localStorage.removeItem('authToken');
localStorage.removeItem('user');
localStorage.removeItem('cart');
```
