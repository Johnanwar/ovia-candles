/**
 * Product Tags Component
 * Displays product tags with theme-aware styling
 */
'use client';

import { useTranslations } from 'next-intl';
import { Product } from '@/types';

interface ProductTagsProps {
  product: Product;
}

export const ProductTags = ({ product }: ProductTagsProps) => {
  const t = useTranslations('product');

  return (
    <div className="border-t border-[var(--color-border)] pt-6">
      <h4 className="text-sm font-medium text-[var(--color-text)] mb-2">
        {t('tags')}:
      </h4>
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag, index) => (
          <span key={index} className="bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] px-2 py-1 rounded text-xs border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-200">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};