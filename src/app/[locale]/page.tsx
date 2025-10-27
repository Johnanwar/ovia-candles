import { Header } from '@/components/layout';
import { ProductsSection } from '@/components/products';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
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
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {isRTL ? 'شحن سريع' : 'Fast Shipping'}
              </h4>
              <p className="text-gray-600">
                {isRTL ? 'توصيل سريع وآمن لجميع أنحاء البلاد' : 'Quick and secure delivery nationwide'}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {isRTL ? 'جودة مضمونة' : 'Quality Guaranteed'}
              </h4>
              <p className="text-gray-600">
                {isRTL ? 'منتجات عالية الجودة من أفضل المكونات الطبيعية' : 'High-quality products made from the finest natural ingredients'}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {isRTL ? 'رعاية العملاء' : 'Customer Care'}
              </h4>
              <p className="text-gray-600">
                {isRTL ? 'فريق دعم متاح 24/7 لمساعدتك' : '24/7 support team ready to help you'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h5 className="text-lg font-semibold mb-4">
              {isRTL ? 'متجر الشموع' : 'Candles Store'}
            </h5>
            <p className="text-gray-400 mb-4">
              {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {isRTL ? 'فيسبوك' : 'Facebook'}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {isRTL ? 'تويتر' : 'Twitter'}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {isRTL ? 'إنستغرام' : 'Instagram'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
