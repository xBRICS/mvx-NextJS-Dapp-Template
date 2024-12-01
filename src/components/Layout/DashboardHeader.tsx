'use client';

import { FC } from 'react';
import { useGetIsLoggedIn } from '@/hooks';
import { Connect } from '../Connect';
import { logout } from '@/helpers';
import { useRouter } from 'next/navigation';
import { getWindowLocation } from '@/utils/sdkDappUtils';

export const DashboardHeader: FC = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const router = useRouter();

  const handleLogout = async () => {
    const { href } = getWindowLocation();
    sessionStorage.clear();
    await logout(href, () => {
      router.replace('/');
    }, false);
    window.location.reload();
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
      <div className="dynamo-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold dynamo-gradient-text">
                DynamoDAO
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="dynamo-button"
              >
                Disconnect
              </button>
            ) : (
              <Connect />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 