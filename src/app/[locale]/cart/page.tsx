/**
 * Cart Page
 * Full cart functionality with item management and summary
 */
import { getTranslations } from 'next-intl/server';
import { CartContent } from '@/components/cart';

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;
  const t = await getTranslations('cart');

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
            {t('title')}
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-1 sm:mt-2">
            {t('description')}
          </p>
        </div>

        <CartContent locale={locale} />
      </main>
    </div>
  );
}
