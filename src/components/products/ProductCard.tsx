/**
 * Product Card Component
 * Displays product information with theme-aware styling
 */
'use client';

import { Button } from '@/components/common';
import { useCart } from '@/hooks';
import { useTranslations } from 'next-intl';
import { Product } from '@/types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export const ProductCard = ({ product, locale }: ProductCardProps) => {
  const t = useTranslations('common');
  const { addToCart } = useCart();
  const isRTL = locale === 'ar';
  const productName = isRTL ? product.nameAr : product.name;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6 group hover:shadow-lg hover:border-[var(--color-primary)] transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden rounded-lg bg-[var(--color-background-secondary)] relative">
        <img
          src={product.image}
          alt={productName}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-[var(--color-error)] text-[var(--color-text-inverse)] px-2 py-1 rounded text-xs font-medium">
            {t('outOfStock')}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-[var(--color-text)] line-clamp-2 mb-3">
          {productName}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-[var(--color-text)]">
              {product.price.toLocaleString()} {product.currency}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[var(--color-text-tertiary)] line-through">
                {product.originalPrice.toLocaleString()} {product.currency}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-[var(--color-warning)]">★</span>
            <span className="text-sm text-[var(--color-text-secondary)]">{product.rating}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? t('addToCart') : t('outOfStock')}
          </Button>
          <Link href={`/${locale}/products/${product.id}`}>
            <Button variant="outline" size="sm">
              {t('viewDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};