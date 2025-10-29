/**
 * Client Layout Component
 * Wraps children with Header inside providers
 */
'use client';

import { Header } from './Header';
import { useParams } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <>
      <Header locale={locale} />
      {children}
    </>
  );
};
