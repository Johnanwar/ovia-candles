import { Header, Breadcrumb } from '@/components/layout';
import { ProductImages, ProductInfo, ProductSpecs, StockInfo, ProductTags } from '@/components/products';
import { getProductById } from '@/lib/productUtils';
import { notFound } from 'next/navigation';

interface ProductDetailsPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { locale, id } = await params;
  
  const product = getProductById(id);
  
  if (!product) {
    notFound();
  }

  const productName = locale === 'ar' ? product.nameAr : product.name;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} />
      <Breadcrumb locale={locale} productName={productName} />

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductImages product={product} productName={productName} />
          <div className="space-y-6">
            <ProductInfo product={product} locale={locale} />
            <ProductSpecs product={product} locale={locale} />
            <StockInfo product={product} locale={locale} />
            <ProductTags product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}