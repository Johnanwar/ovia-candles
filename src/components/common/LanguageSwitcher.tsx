/**
 * Language Switcher Component
 * Toggle between English and Arabic languages
 */
'use client';
import { Button } from './Button';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export const LanguageSwitcher = ({ currentLocale }: LanguageSwitcherProps) => {
  const isRTL = currentLocale === 'ar';
  
  const switchLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLanguage}
      className="min-w-[60px]"
    >
      {isRTL ? 'EN' : 'عربي'}
    </Button>
  );
};
