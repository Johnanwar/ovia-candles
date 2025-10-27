import Link from 'next/link';
import { Button } from '@/components/common';

interface NotFoundPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NotFoundPage({ params }: NotFoundPageProps) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {isRTL ? 'المنتج غير موجود' : 'Product Not Found'}
        </h2>
        <p className="text-gray-600 mb-8">
          {isRTL 
            ? 'عذراً، المنتج الذي تبحث عنه غير موجود أو تم حذفه.' 
            : 'Sorry, the product you are looking for does not exist or has been removed.'
          }
        </p>
        <Link href={`/${locale}`}>
          <Button variant="primary" size="lg">
            {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
