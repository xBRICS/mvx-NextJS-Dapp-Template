'use client';

import { useTranslations } from 'next-intl';
import { AuthRedirectWrapper } from '@/wrappers';

const DashboardPage = () => {
  const t = useTranslations('dashboard');

  const WIDGETS = [
    {
      title: t('widgets.account.title'),
      description: t('widgets.account.description'),
      reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account'
    },
    {
      title: t('widgets.transactions.title'),
      description: t('widgets.transactions.description'),
      reference: 'https://api.elrond.com/#/accounts/AccountController_getAccountTransactions'
    }
  ];

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <div className="bg-light-primary dark:bg-dark-primary min-h-screen p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WIDGETS.map((widget, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-light-secondary dark:bg-dark-secondary 
                        border border-light-accent/10 dark:border-dark-accent/10"
            >
              <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">
                {widget.title}
              </h2>
              <p className="text-light-muted dark:text-dark-muted">
                {widget.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};

export default DashboardPage; 