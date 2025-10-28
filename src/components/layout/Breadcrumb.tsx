/**
 * Breadcrumb Component
 * Navigation breadcrumb with theme-aware styling
 */
'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface BreadcrumbProps {
  locale: string;
  productName: string;
}

export const Breadcrumb = ({ locale, productName }: BreadcrumbProps) => {
  const t = useTranslations('navigation');

  return (
    <div className="bg-[var(--color-background-secondary)] border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href={`/${locale}`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200">
                {t('home')}
              </Link>
            </li>
            <li className="text-[var(--color-text-tertiary)]">/</li>
            <li>
              <Link href={`/${locale}/products`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200">
                {t('products')}
              </Link>
            </li>
            <li className="text-[var(--color-text-tertiary)]">/</li>
            <li className="text-[var(--color-text)] font-medium">{productName}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};
