/**
 * Product Specifications Component
 * Displays detailed product specifications with theme-aware styling
 */
'use client';

import { useTranslations } from 'next-intl';
import { Product } from '@/types';

interface ProductSpecsProps {
  product: Product;
  locale: string;
}

export const ProductSpecs = ({ product, locale }: ProductSpecsProps) => {
  const t = useTranslations('product');
  const isRTL = locale === 'ar';

  const productSize = isRTL ? product.sizeAr : product.size;
  const productMadeIn = isRTL ? product.madeInAr : product.madeIn;
  const productFragrance = isRTL ? product.fragranceAr : product.fragrance;
  const productWaxType = isRTL ? product.waxTypeAr : product.waxType;
  const productWickType = isRTL ? product.wickTypeAr : product.wickType;

  return (
    <div className="border-t border-[var(--color-border)] pt-6">
      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">
        {t('specifications')}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-bold text-[var(--color-text)]">{t('size')}:</span>
            <span className="text-[var(--color-text-secondary)]">{productSize}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-[var(--color-text)]">{t('dimensions')}:</span>
            <span className="text-[var(--color-text-secondary)]">{product.dimensions}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-[var(--color-text)]">{t('weight')}:</span>
            <span className="text-[var(--color-text-secondary)]">{product.weight}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-[var(--color-text)]">{t('burnTime')}:</span>
            <span className="text-[var(--color-text-secondary)]">{product.burnTime}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-bold text-[var(--color-text)]">{t('fragrance')}:</span>
            <span className="text-[var(--color-text-secondary)]">{productFragrance}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-[var(--color-text)]">{t('waxType')}:</span>
            <span className="text-[var(--color-text-secondary)]">{productWaxType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-[var(--color-text)]">{t('wickType')}:</span>
            <span className="text-[var(--color-text-secondary)]">{productWickType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-[var(--color-text)]">{t('madeIn')}:</span>
            <span className="text-[var(--color-success)] font-medium">{productMadeIn}</span>
          </div>
        </div>
      </div>
    </div>
  );
};