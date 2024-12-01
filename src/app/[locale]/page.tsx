'use client';

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-light-primary dark:bg-dark-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
          {t('title')}
        </h1>
        <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>
    </main>
  );
} 