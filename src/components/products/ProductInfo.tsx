/**
 * Product Info Component
 * Displays product name, description, rating, pricing, and actions
 * Uses theme system for consistent styling
 */
'use client';

import { useTranslations } from 'next-intl';
import { ProductActions } from './ProductActions';
import { Product } from '@/types';

interface ProductInfoProps {
  product: Product;
  locale: string;
}

export const ProductInfo = ({ product, locale }: ProductInfoProps) => {
  const t = useTranslations('product');
  const isRTL = locale === 'ar';

  const productName = isRTL ? product.nameAr : product.name;
  const productDescription = isRTL ? product.descriptionAr : product.description;
  const productCategory = isRTL ? product.categoryAr : product.category;

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
          {productName}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-4">
          {productDescription}
        </p>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <span className="text-[var(--color-warning)]">★</span>
            <span className="text-lg font-medium text-[var(--color-text)]">{product.rating}</span>
            <span className="text-[var(--color-text-secondary)]">({product.reviewCount} {t('reviews')})</span>
          </div>
          <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] px-3 py-1 rounded-full text-sm font-medium">
            {productCategory}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="border-t border-[var(--color-border)] pt-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-3xl font-bold text-[var(--color-text)]">
            {product.price.toLocaleString()} {product.currency}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-[var(--color-text-tertiary)] line-through">
              {product.originalPrice.toLocaleString()} {product.currency}
            </span>
          )}
        </div>

        <ProductActions product={product} locale={locale} />
      </div>
    </div>
  );
};