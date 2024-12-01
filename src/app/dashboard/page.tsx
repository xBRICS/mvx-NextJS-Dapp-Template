'use client';
import { contractAddress } from '@/config';
import {
  Account,
  PingPongAbi,
  SignMessage,
  NativeAuth,
  BatchTransactions,
  PingPongRaw,
  PingPongService,
  Transactions
} from './widgets';
import { AuthRedirectWrapper } from '@/wrappers/AuthRedirectWrapper';
import { ClientHooks } from '@/components/ClientHooks';
import { Widget } from './components';
import { WidgetType } from '@/types/widget.types';
import { useTranslations } from 'next-intl';

const WIDGETS: WidgetType[] = [
  {
    title: 'Account',
    widget: Account,
    description: 'Connected account details',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account'
  },
  {
    title: 'Ping & Pong (Manual)',
    widget: PingPongRaw,
    description:
      'Smart Contract interactions using manually formulated transactions',
    reference:
      'https://docs.multiversx.com/sdk-and-tools/indices/es-index-transactions/',
    anchor: 'ping-pong-manual'
  },
  {
    title: 'Ping & Pong (ABI)',
    widget: PingPongAbi,
    description:
      'Smart Contract interactions using the ABI generated transactions',
    reference:
      'https://docs.multiversx.com/sdk-and-tools/sdk-js/sdk-js-cookbook/#using-interaction-when-the-abi-is-available',
    anchor: 'ping-pong-abi'
  },
  {
    title: 'Ping & Pong (Backend)',
    widget: PingPongService,
    description:
      'Smart Contract interactions using the backend generated transactions',
    reference: 'https://github.com/multiversx/mx-ping-pong-service',
    anchor: 'ping-pong-backend'
  },
  {
    title: 'Sign message',
    widget: SignMessage,
    description: 'Message signing using the connected account',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account-1',
    anchor: 'sign-message'
  },
  {
    title: 'Native auth',
    widget: NativeAuth,
    description:
      'A secure authentication token can be used to interact with the backend',
    reference: 'https://github.com/multiversx/mx-sdk-js-native-auth-server'
  },
  {
    title: 'Batch Transactions',
    widget: BatchTransactions,
    description:
      'A secure authentication token can be used to interact with the backend',
    reference:
      'https://github.com/multiversx/mx-sdk-dapp#sending-transactions-synchronously-in-batches',
    anchor: 'batch-transactions'
  },
  {
    title: 'Transactions (All)',
    widget: Transactions,
    description: 'List transactions for the connected account',
    reference:
      'https://api.elrond.com/#/accounts/AccountController_getAccountTransactions'
  },
  {
    title: 'Transactions (Ping & Pong)',
    widget: Transactions,
    props: { receiver: contractAddress },
    description: 'List transactions filtered for a given Smart Contract',
    reference:
      'https://api.elrond.com/#/accounts/AccountController_getAccountTransactions'
  }
];

const DashboardPage = () => {
  const t = useTranslations('dashboard');

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <>
        <ClientHooks />
        <div className="bg-light-primary dark:bg-dark-primary min-h-screen p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-light-secondary dark:bg-dark-secondary 
                          border border-light-accent/10 dark:border-dark-accent/10">
              <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">
                Overview
              </h2>
              <p className="text-light-muted dark:text-dark-muted">
                Your dashboard content here
              </p>
            </div>
            {/* Add more dashboard widgets */}
          </div>
        </div>
      </>
    </AuthRedirectWrapper>
  );
};

export default DashboardPage;
