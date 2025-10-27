import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  // Default to English if locale is not supported
  const validLocale = locales.includes(locale as any) ? locale : 'en';

  return {
    locale: validLocale as string,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});
