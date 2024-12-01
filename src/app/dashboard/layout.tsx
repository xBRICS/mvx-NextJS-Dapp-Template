'use client';

import { AuthRedirectWrapper } from '@/wrappers';
import { FC, PropsWithChildren } from 'react';
import { DashboardSidebar } from '@/components/Layout';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthRedirectWrapper>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </AuthRedirectWrapper>
  );
};

export default DashboardLayout;