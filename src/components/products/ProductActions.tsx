/**
 * Product Actions Component
 * Add to Cart and Wishlist buttons with theme-aware styling
 */
'use client';

import { Button } from '@/components/common';
import { useCart } from '@/hooks';
import { useTranslations } from 'next-intl';
import { Product } from '@/types';

interface ProductActionsProps {
  product: Product;
  locale: string;
}

export const ProductActions = ({ product, locale }: ProductActionsProps) => {
  const t = useTranslations('product');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlist = () => {
    // TODO: Implement wishlist functionality
    console.log('Add to wishlist:', product.id);
  };

  return (
    <div className="flex space-x-4">
      <Button
        variant="primary"
        size="lg"
        className="flex-1 hover:scale-105 transition-transform duration-200"
        onClick={handleAddToCart}
        disabled={!product.inStock}
      >
        {product.inStock ? t('addToCart') : t('outOfStock')}
      </Button>
      <Button 
        variant="outline" 
        size="lg" 
        onClick={handleWishlist}
        className="hover:scale-105 transition-transform duration-200"
      >
        {t('wishlist')}
      </Button>
    </div>
  );
};