'use client';
import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetIsLoggedIn } from '@/hooks';
import { RouteNamesEnum } from '@/localConstants';

interface AuthRedirectWrapperProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export const AuthRedirectWrapper: FC<AuthRedirectWrapperProps> = ({ 
  children,
  requireAuth = true
}) => {
  const router = useRouter();
  const isLoggedIn = useGetIsLoggedIn();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn && requireAuth) {
        router.replace('/');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoggedIn, requireAuth, router]);

  if (!isLoggedIn && requireAuth) {
    return null;
  }

  return <>{children}</>;
};