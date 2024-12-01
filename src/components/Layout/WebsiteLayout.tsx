'use client';

import { FC, ReactNode } from 'react';
import { WebsiteHeader } from './WebsiteHeader';

interface WebsiteLayoutProps {
  children: ReactNode;
}

export const WebsiteLayout: FC<WebsiteLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <WebsiteHeader />
      <main>
        {children}
      </main>
    </div>
  );
}; 