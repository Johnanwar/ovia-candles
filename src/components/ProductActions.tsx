'use client';

import { Button } from '@/components';
import { useCart } from '@/hooks';
import { Product } from '@/types';

interface ProductActionsProps {
  product: Product;
  locale: string;
}

export const ProductActions = ({ product, locale }: ProductActionsProps) => {
  const { addToCart } = useCart();
  const isRTL = locale === 'ar';

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
        className="flex-1"
        onClick={handleAddToCart}
        disabled={!product.inStock}
      >
        {product.inStock ? (isRTL ? 'أضف إلى السلة' : 'Add to Cart') : (isRTL ? 'نفد المخزون' : 'Out of Stock')}
      </Button>
      <Button variant="outline" size="lg" onClick={handleWishlist}>
        {isRTL ? 'المفضلة' : 'Wishlist'}
      </Button>
    </div>
  );
};
