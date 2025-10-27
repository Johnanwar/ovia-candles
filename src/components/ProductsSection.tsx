'use client';

import { ProductCard } from '@/components/ProductCard';
import { sampleProducts } from '@/lib/products';

interface ProductsSectionProps {
  locale: string;
}

export const ProductsSection = ({ locale }: ProductsSectionProps) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'المنتجات' : 'Products'}
          </h3>
          <p className="text-lg text-gray-600">
            {locale === 'ar' ? 'اكتشف مجموعتنا الرائعة من المنتجات' : 'Discover our amazing collection of products'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
