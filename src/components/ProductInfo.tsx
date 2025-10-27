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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {productName}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {productDescription}
        </p>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="text-lg font-medium text-gray-900">{product.rating}</span>
            <span className="text-gray-500">({product.reviewCount} {t('reviews')})</span>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {productCategory}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="border-t pt-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-3xl font-bold text-gray-900">
            {product.price.toLocaleString()} {product.currency}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-gray-500 line-through">
              {product.originalPrice.toLocaleString()} {product.currency}
            </span>
          )}
        </div>
        
        <ProductActions product={product} locale={locale} />
      </div>
    </div>
  );
};
