import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage (persists across sessions)
  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        setCartItems([]);
      }
    }
  };

  const saveCartToLocalStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    try {
      // Use local cart (backend cart not implemented yet)
      const existingItem = cartItems.find(item => item.product.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = cartItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...cartItems, { product, quantity, id: Date.now() }];
      }
      
      setCartItems(newItems);
      saveCartToLocalStorage(newItems);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    
    setLoading(true);
    try {
      // Use local cart (backend cart not implemented yet)
      const newItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setCartItems(newItems);
      saveCartToLocalStorage(newItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    setLoading(true);
    try {
      // Use local cart (backend cart not implemented yet)
      const newItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(newItems);
      saveCartToLocalStorage(newItems);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      // Use local cart (backend cart not implemented yet)
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Memoize cart count to ensure header updates
  const cartCount = getCartCount();

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    cartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
