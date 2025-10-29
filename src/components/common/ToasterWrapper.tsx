/**
 * Toaster Wrapper Component
 * Wraps Sonner Toaster with RTL support
 */
'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { useParams } from 'next/navigation';

export const ToasterWrapper = () => {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Toaster 
      position={isRTL ? "top-left" : "top-right"} 
      richColors 
      expand={true}
      closeButton
    />
  );
};
