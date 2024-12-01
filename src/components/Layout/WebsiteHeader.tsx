'use client';

import { FC } from 'react';
import { Connect } from '../Connect';
import { useGetIsLoggedIn } from '@/hooks';
import { useRouter } from 'next/navigation';

export const WebsiteHeader: FC = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const router = useRouter();

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  };

  return (
    <header className="bg-primary/50 backdrop-blur-sm border-b border-neutral/20">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-accent">
                DynamoDAO
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <button
                onClick={handleDashboardClick}
                className="btn-outline"
              >
                Dashboard
              </button>
            )}
            <Connect />
          </div>
        </div>
      </div>
    </header>
  );
}; 