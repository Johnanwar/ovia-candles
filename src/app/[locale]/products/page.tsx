import { Header } from '@/components/layout';
import { ProductsSection } from '@/components/products';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a href={`/${locale}`} className="text-gray-500 hover:text-gray-700">
                  {isRTL ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">
                {isRTL ? 'المنتجات' : 'Products'}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <ProductsSection locale={locale} />
    </div>
  );
}
