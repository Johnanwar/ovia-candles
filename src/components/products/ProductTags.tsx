'use client';

import { useTranslations } from 'next-intl';
import { Product } from '@/types';

interface ProductTagsProps {
  product: Product;
}

export const ProductTags = ({ product }: ProductTagsProps) => {
  const t = useTranslations('product');

  return (
    <div className="border-t pt-6">
      <h4 className="text-sm font-medium text-gray-900 mb-2">
        {t('tags')}:
      </h4>
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
