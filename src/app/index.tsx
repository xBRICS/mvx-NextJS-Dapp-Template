'use client';

import type { PropsWithChildren, ReactNode } from 'react';
import {
  TransactionsToastList,
  NotificationModal,
  SignTransactionsModals,
  DappProvider
} from '@/components';
import {
  apiTimeout,
  walletConnectV2ProjectId,
  environment,
  sampleAuthenticatedDomains
} from '@/config';
import { BatchTransactionsContextProvider } from '@/wrappers';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import { RouteNamesEnum } from '@/localConstants';

const AppContent = ({ children }: PropsWithChildren) => {
  return (
    <DappProvider
      environment={environment}
      customNetworkConfig={{
        name: 'customConfig',
        apiTimeout,
        walletConnectV2ProjectId
      }}
      dappConfig={{
        isSSR: true,
        shouldUseWebViewProvider: true,
        logoutRoute: RouteNamesEnum.home
      }}
    >
      <AxiosInterceptorContext.Listener>
        <TransactionsToastList />
        <NotificationModal />
        <SignTransactionsModals />
        {children}
      </AxiosInterceptorContext.Listener>
    </DappProvider>
  );
};

export default function App({ children }: { children: ReactNode }) {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomains={sampleAuthenticatedDomains}
      >
        <BatchTransactionsContextProvider>
          <AppContent>{children}</AppContent>
        </BatchTransactionsContextProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
}
