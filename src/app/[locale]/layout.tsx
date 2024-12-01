import '../../styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { HeaderWrapper } from '@/components/Layout';
import App from '../index';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider>
        <LanguageProvider>
          <App>
            <div className="min-h-screen max-w-full relative bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text">
              <HeaderWrapper />
              {children}
            </div>
          </App>
        </LanguageProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
} 