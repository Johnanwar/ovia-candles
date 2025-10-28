import Link from 'next/link';
import { Button } from '@/components/common';

interface NotFoundPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NotFoundPage({ params }: NotFoundPageProps) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-text)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--color-text-secondary)] mb-4">
          {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h2>
        <p className="text-[var(--color-text-tertiary)] mb-8">
          {isRTL ? 'عذراً، الصفحة التي تبحث عنها غير موجودة' : 'Sorry, the page you are looking for does not exist'}
        </p>
        <Link href={`/${locale}`}>
          <Button variant="primary" size="lg">
            {isRTL ? 'العودة للرئيسية' : 'Go Home'}
          </Button>
        </Link>
      </div>
    </div>
  );
}