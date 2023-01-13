import React, { useEffect, useState } from 'react';

import { getTransactions } from '@multiversx/sdk-dapp/apiCalls';

import {
  useGetAccount,
  useGetActiveTransactionsStatus,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';

import { ServerTransactionType } from '@multiversx/sdk-dapp/types';
import { faBan, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';

import { apiTimeout, contractAddress, transactionSize } from '../../config';
import { DashboardLayout } from '../../components/Dahsboard/DashboardLayout';
import dynamic from "next/dynamic";

const TransactionsTable = dynamic(
    async () => {
      return (await import("@multiversx/sdk-dapp/UI/TransactionsTable")).TransactionsTable;
    },
    { ssr: false }
);

const Loader = dynamic(
    async () => {
      return (await import("@multiversx/sdk-dapp/UI/Loader")).Loader;
    },
    { ssr: false }
);

const PageState = dynamic(
    async () => {
      return (await import("@multiversx/sdk-dapp/UI/PageState")).PageState;
    },
    { ssr: false }
);

const DashboardPage = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const { success, fail } = useGetActiveTransactionsStatus();

  const [transactions, setTransactions] = useState<ServerTransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const { data } = await getTransactions({
        apiAddress,
        sender: address,
        receiver: contractAddress,
        condition: 'must',
        transactionSize,
        apiTimeout
      });
      setTransactions(data);
    } catch (err) {
      const { message } = err as AxiosError;
      setError(message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (success || fail) {
      fetchTransactions();
    }
  }, [success, fail]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className='my-5'>
        <PageState
          icon={faBan}
          className='text-muted'
          title='Error fetching transactions.'
        />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className='my-5'>
        <PageState
          icon={faExchangeAlt}
          className='text-muted'
          title='No Transactions'
        />
      </div>
    );
  }

  return <TransactionsTable transactions={transactions} />;
};

export default function Dashboard() {
  return (
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
  )
}
