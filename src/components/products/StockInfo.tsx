/**
 * Stock Info Component
 * Displays product stock status with theme-aware styling
 */
'use client';

import { useTranslations } from 'next-intl';
import { Product } from '@/types';

interface StockInfoProps {
  product: Product;
  locale: string;
}

export const StockInfo = ({ product, locale }: StockInfoProps) => {
  const t = useTranslations('product');
  const isRTL = locale === 'ar';

  return (
    <div className="border-t border-[var(--color-border)] pt-6">
      <div className="flex items-center justify-between">
        <span className="text-[var(--color-text-secondary)]">{t('stockStatus')}:</span>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-[var(--color-success)]' : 'bg-[var(--color-error)]'}`}></div>
          <span className={`font-medium ${product.inStock ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
            {product.inStock ? t('inStock') : t('outOfStock')}
          </span>
        </div>
      </div>
      {product.inStock && (
        <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
          {isRTL ? `${product.stockQuantity} قطع متوفرة` : `${product.stockQuantity} items available`}
        </p>
      )}
    </div>
  );
};