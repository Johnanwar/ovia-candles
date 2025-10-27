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
    <div className="border-t pt-6">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">{t('stockStatus')}:</span>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? t('inStock') : t('outOfStock')}
          </span>
        </div>
      </div>
      {product.inStock && (
        <p className="text-sm text-gray-500 mt-1">
          {isRTL ? `${product.stockQuantity} قطع متوفرة` : `${product.stockQuantity} items available`}
        </p>
      )}
    </div>
  );
};
