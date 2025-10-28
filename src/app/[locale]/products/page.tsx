import { Header } from '@/components/layout';
import { ProductsSection } from '@/components/products';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header locale={locale} />

      {/* Breadcrumb */}
      <div className="bg-[var(--color-background-secondary)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a href={`/${locale}`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200">
                  {isRTL ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li className="text-[var(--color-text-tertiary)]">/</li>
              <li className="text-[var(--color-text)] font-medium">
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