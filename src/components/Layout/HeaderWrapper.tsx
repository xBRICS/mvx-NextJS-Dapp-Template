import { getTranslations } from 'next-intl/server';
import { Header } from './Header';

export async function HeaderWrapper() {
  const t = await getTranslations('common');
  
  return (
    <Header 
      translations={{
        title: t('title'),
        dashboard: t('dashboard'),
        settings: t('settings'),
        language: t('language'),
        theme: {
          light: t('theme.light'),
          dark: t('theme.dark')
        }
      }}
    />
  );
} 