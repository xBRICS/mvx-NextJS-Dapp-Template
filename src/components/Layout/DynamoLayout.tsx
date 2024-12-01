'use client';

import { FC, ReactNode } from 'react';
import { useGetIsLoggedIn } from '@/hooks';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';

interface DynamoLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export const DynamoLayout: FC<DynamoLayoutProps> = ({ 
  children,
  showSidebar = true 
}) => {
  const isLoggedIn = useGetIsLoggedIn();

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <div className="flex">
        {isLoggedIn && showSidebar && <DashboardSidebar />}
        <main className={`flex-1 p-6 ${!showSidebar ? 'max-w-7xl mx-auto' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}; 