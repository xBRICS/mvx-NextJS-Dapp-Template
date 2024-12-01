'use client';

import { FC, ReactNode } from 'react';
import { useGetIsLoggedIn } from '@/hooks';

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

export const BaseLayout: FC<BaseLayoutProps> = ({ children, className = '' }) => {
  const isLoggedIn = useGetIsLoggedIn();

  return (
    <div className={`min-h-screen bg-primary ${className}`}>
      <main className="container-custom py-8">
        {children}
      </main>
    </div>
  );
}; 