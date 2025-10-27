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
  const productFragrance = isRTL ? product.fragranceAr : product.fragrance;
  const productWaxType = isRTL ? product.waxTypeAr : product.waxType;
  const productWickType = isRTL ? product.wickTypeAr : product.wickType;
  const productMadeIn = isRTL ? product.madeInAr : product.madeIn;

  return (
    <div className="border-t pt-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {t('specifications')}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-bold">{t('size')}:</span>
            <span className="font-small text-gray-600">{productSize}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">{t('dimensions')}:</span>
            <span className="font-small text-gray-600">{product.dimensions}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">{t('weight')}:</span>
            <span className="font-small text-gray-600">{product.weight}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">{t('burnTime')}:</span>
            <span className="font-small text-gray-600">{product.burnTime}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-bold">{t('fragrance')}:</span>
            <span className="font-small text-gray-600">{productFragrance}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">{t('waxType')}:</span>
            <span className="font-small text-gray-600">{productWaxType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">{t('wickType')}:</span>
            <span className="font-small text-gray-600">{productWickType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">{t('madeIn')}:</span>
            <span className="font-small text-green-600">{productMadeIn}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
