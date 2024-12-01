'use client';

import { FC } from 'react';
import { useGetIsLoggedIn } from '@/hooks';
import { Connect } from '../Connect';
import { Settings } from '../Settings';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const Header: FC = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const router = useRouter();
  const t = useTranslations('common');

  return (
    <header className="bg-light-primary dark:bg-dark-primary border-b border-light-accent/10 dark:border-dark-accent/10">
      <div className="max-w-[1200px] mx-auto px-8 h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-light-text dark:text-dark-text cursor-pointer" 
                  onClick={() => router.push('/')}>
                {t('title')}
              </h1>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <button 
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 rounded-xl 
                         bg-light-secondary hover:bg-light-accent/10 dark:bg-dark-secondary dark:hover:bg-dark-accent/10
                         border border-light-accent/10 dark:border-dark-accent/10
                         text-light-text dark:text-dark-text font-medium
                         transition-all duration-300 hover:scale-[1.02]"
              >
                {t('dashboard')}
              </button>
            )}
            <Settings 
              settingsLabel={t('settings')}
              languageLabel={t('language')}
              themeLabels={{
                light: t('theme.light'),
                dark: t('theme.dark')
              }}
            />
            <Connect />
          </div>
        </div>
      </div>
    </header>
  );
};