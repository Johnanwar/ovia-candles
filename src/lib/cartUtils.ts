// Cart management utilities
import { Cart } from '@/types';

export const calculateCartTotals = (cart: Cart): Cart => {
  const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return { ...cart, total, itemCount };
};
