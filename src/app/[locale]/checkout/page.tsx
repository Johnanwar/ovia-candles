/**
 * Checkout Page
 * Order confirmation with customer information form
 */
import { CheckoutContent } from '@/components/checkout/CheckoutContent';

interface CheckoutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params;

  return <CheckoutContent locale={locale} />;
}

