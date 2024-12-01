'use client';

import React, { FC, useState, useEffect } from 'react';
import { useGetIsLoggedIn } from '@/hooks';
import { LoginPopup } from '../LoginPopup/LoginPopup';
import { logout } from '@/helpers';
import { useRouter } from 'next/navigation';
import { getWindowLocation } from '@/utils/sdkDappUtils';
import { safeStorage } from '@/utils/storage';

export const Connect: FC = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useGetIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && isLoginPopupOpen) {
      setIsLoginPopupOpen(false);
    }
  }, [isLoggedIn, isLoginPopupOpen]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { href } = getWindowLocation();
      safeStorage.clear();
      await logout(href, () => {
        router.replace('/');
      }, false);
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setIsLoginPopupOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="px-4 py-2 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] 
                  border border-[#333333]
                  text-white font-medium
                  flex items-center gap-2
                  transition-all duration-300 hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span>{isLoggedIn ? 'Disconnecting...' : 'Connecting...'}</span>
          </div>
        ) : (
          <span className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <span>Disconnect</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </>
            ) : (
              <>
                <span>Connect</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </>
            )}
          </span>
        )}
      </button>
      {!isLoggedIn && (
        <LoginPopup 
          isOpen={isLoginPopupOpen} 
          onClose={() => setIsLoginPopupOpen(false)}
          callbackRoute="/dashboard"
        />
      )}
    </>
  );
};