'use client';

import { FC } from 'react';
import { useGetIsLoggedIn } from '@/hooks';
import { Connect } from '../Connect';
import { useTranslations } from 'next-intl';

export const DashboardHeader: FC = () => {
  const t = useTranslations('common');

  return (
    <header className="bg-light-secondary dark:bg-dark-secondary border-b border-light-accent/10 dark:border-dark-accent/10">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
                {t('title')}
              </h1>
            </div>
          </div>
          <Connect />
        </div>
      </div>
    </header>
  );
}; 