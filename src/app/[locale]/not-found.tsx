'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useGetIsLoggedIn } from '@/hooks';

export default function NotFound() {
  const t = useTranslations('errors.404');
  const nav = useTranslations('navigation');
  const router = useRouter();
  const isLoggedIn = useGetIsLoggedIn();

  const handleNavigate = () => {
    const path = isLoggedIn ? '/dashboard' : '/';
    const locale = window.location.pathname.split('/')[1] || 'en';
    router.push(`/${locale}${path}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-light-primary dark:bg-dark-primary">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold mb-4 text-light-text dark:text-dark-text">
          {t('title')}
        </h1>
        
        <p className="text-light-muted dark:text-dark-muted text-lg mb-8">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Go Back Button */}
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl 
                     bg-light-secondary hover:bg-light-accent/10 dark:bg-dark-secondary dark:hover:bg-dark-accent/10
                     border border-light-accent/10 dark:border-dark-accent/10
                     text-light-text dark:text-dark-text font-medium
                     transition-all duration-300 hover:scale-[1.02]
                     flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {nav('goBack')}
          </button>

          {/* Home/Dashboard Button */}
          <button
            onClick={handleNavigate}
            className="px-6 py-3 rounded-xl 
                     bg-light-secondary hover:bg-light-accent/10 dark:bg-dark-secondary dark:hover:bg-dark-accent/10
                     border border-light-accent/10 dark:border-dark-accent/10
                     text-light-text dark:text-dark-text font-medium
                     transition-all duration-300 hover:scale-[1.02]
                     flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isLoggedIn 
                  ? "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  : "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                }
              />
            </svg>
            {isLoggedIn ? nav('toDashboard') : nav('toHome')}
          </button>
        </div>
      </div>
    </main>
  );
} 