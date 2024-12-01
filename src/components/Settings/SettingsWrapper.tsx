import { getTranslations } from 'next-intl/server';
import { Settings } from './Settings';

export async function SettingsWrapper() {
  const t = await getTranslations('common');
  
  return (
    <Settings 
      settingsLabel={t('settings')}
      languageLabel={t('language')}
      themeLabels={{
        light: t('theme.light'),
        dark: t('theme.dark')
      }}
    />
  );
} 