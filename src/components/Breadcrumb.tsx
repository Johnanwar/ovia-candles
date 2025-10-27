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
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700">
                {t('home')}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700">
                {t('products')}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{productName}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};
