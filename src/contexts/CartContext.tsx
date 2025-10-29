/**
 * Cart Context and Provider
 * Provides cart state and functionality to all components
 */
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Cart, CartItem, Product } from '@/types';
import { calculateCartTotals } from '@/lib/cartUtils';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

const initialCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCartState] = useState<Cart>(initialCart);
  const [mounted, setMounted] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          const cartWithTotals = calculateCartTotals(parsedCart);
          setCartState(cartWithTotals);
        }
      } catch (error) {
        setCartState(initialCart);
      }
    }
    setMounted(true);
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);

  // Handle cross-tab sync
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart' && e.newValue) {
        try {
          const newCart = JSON.parse(e.newValue);
          const cartWithTotals = calculateCartTotals(newCart);
          setCartState(cartWithTotals);
        } catch (error) {
          // Silent fail
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartState((prevCart) => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        const updatedItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return calculateCartTotals({ ...prevCart, items: updatedItems });
      } else {
        const newItem: CartItem = { product, quantity };
        const updatedItems = [...prevCart.items, newItem];
        return calculateCartTotals({ ...prevCart, items: updatedItems });
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartState((prevCart) => {
      const updatedItems = prevCart.items.filter(item => item.product.id !== productId);
      return calculateCartTotals({ ...prevCart, items: updatedItems });
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartState((prevCart) => {
      const updatedItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      return calculateCartTotals({ ...prevCart, items: updatedItems });
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartState(initialCart);
  }, []);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
