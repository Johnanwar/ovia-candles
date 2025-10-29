/**
 * Cart Page
 * Full cart functionality with item management and summary
 */
import { CartContent } from '@/components/cart';

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            {isRTL ? 'سلة التسوق' : 'Shopping Cart'}
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            {isRTL ? 'راجع مشترياتك وأكمل الطلب' : 'Review your items and complete your order'}
          </p>
        </div>

        <CartContent locale={locale} />
      </main>
    </div>
  );
}
