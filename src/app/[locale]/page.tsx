import { Header } from '@/components/layout';
import { ProductsSection } from '@/components/products';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header locale={locale} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-[var(--color-text-inverse)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {isRTL ? 'اكتشف عالم العطور' : 'Discover the World of Fragrances'}
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {isRTL 
              ? 'مجموعة فاخرة من الشموع والزيوت العطرية لمنزلك' 
              : 'Premium collection of candles and essential oils for your home'
            }
          </p>
        </div>
      </section>

      <ProductsSection locale={locale} />

      {/* Features Section */}
      <section className="bg-[var(--color-background-secondary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[var(--color-text)] mb-4">
              {isRTL ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
            </h3>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {isRTL ? 'نقدم لك أفضل المنتجات والخدمات' : 'We provide you with the best products and services'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[var(--color-primary-light)] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                {isRTL ? 'شحن سريع' : 'Fast Shipping'}
              </h4>
              <p className="text-[var(--color-text-secondary)]">
                {isRTL ? 'توصيل سريع وآمن لجميع أنحاء البلاد' : 'Quick and secure delivery nationwide'}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[var(--color-success-light)] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                {isRTL ? 'جودة مضمونة' : 'Quality Guaranteed'}
              </h4>
              <p className="text-[var(--color-text-secondary)]">
                {isRTL ? 'منتجات عالية الجودة من أفضل المكونات الطبيعية' : 'High-quality products made from the finest natural ingredients'}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[var(--color-accent-light)] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                {isRTL ? 'رعاية العملاء' : 'Customer Care'}
              </h4>
              <p className="text-[var(--color-text-secondary)]">
                {isRTL ? 'فريق دعم متاح 24/7 لمساعدتك' : '24/7 support team ready to help you'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-background-secondary)] border-t border-[var(--color-border)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h5 className="text-lg font-semibold text-[var(--color-text)] mb-4">
              {isRTL ? 'متجر الشموع' : 'Candles Store'}
            </h5>
            <p className="text-[var(--color-text-secondary)] mb-4">
              {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200">
                {isRTL ? 'فيسبوك' : 'Facebook'}
              </a>
              <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200">
                {isRTL ? 'تويتر' : 'Twitter'}
              </a>
              <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200">
                {isRTL ? 'إنستغرام' : 'Instagram'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}