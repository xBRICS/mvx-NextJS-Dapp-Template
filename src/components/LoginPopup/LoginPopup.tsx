'use client';

import { FC, useEffect, useState } from 'react';
import { LoginOptions } from '../LoginOptions/LoginOptions';
import { Portal } from '../Portal/Portal';
import { useGetIsLoggedIn } from '@/hooks';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  callbackRoute: string;
}

export const LoginPopup: FC<LoginPopupProps> = ({ isOpen, onClose, callbackRoute }) => {
  const [mounted, setMounted] = useState(false);
  const isLoggedIn = useGetIsLoggedIn();

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLoggedIn) {
      onClose();
    }
  }, [isLoggedIn, onClose]);

  if (!mounted) return null;

  return (
    <Portal>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
        style={{ zIndex: 9999 }}
      />
      
      <div 
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{ zIndex: 10000 }}
      >
        <div 
          className={`relative bg-[#1e1e1e] w-full max-w-[400px] rounded-2xl shadow-2xl
                     transform transition-all duration-300
                     ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}
        >
          <div className="relative px-8 pt-8 pb-6 border-b border-white/10">
            <button 
              onClick={onClose}
              className="absolute right-8 top-8 text-[#888888] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-white text-center">
              Connect Wallet
            </h2>
            <p className="text-[#888888] text-sm text-center mt-2">
              Choose your preferred wallet to connect
            </p>
          </div>

          <div className="p-8">
            <LoginOptions 
              callbackRoute={callbackRoute} 
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </Portal>
  );
}; 