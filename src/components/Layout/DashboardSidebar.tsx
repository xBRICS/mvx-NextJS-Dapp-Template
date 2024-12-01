'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const DashboardSidebar: FC = () => {
  const pathname = usePathname();
  const t = useTranslations('dashboard');

  const navItems = [
    { name: t('overview'), href: '/dashboard', icon: '📊' },
    { name: t('transactions'), href: '/dashboard/transactions', icon: '💸' },
    { name: t('tokens'), href: '/dashboard/tokens', icon: '🪙' },
    { name: t('nfts'), href: '/dashboard/nfts', icon: '🎨' },
    { name: t('smartContracts'), href: '/dashboard/smart-contracts', icon: '📜' },
    { name: t('staking'), href: '/dashboard/staking', icon: '🏦' },
    { name: t('governance'), href: '/dashboard/governance', icon: '⚖️' },
    { name: t('analytics'), href: '/dashboard/analytics', icon: '📈' }
  ];

  // Add locale to hrefs
  const locale = pathname.split('/')[1];
  const localizedNavItems = navItems.map(item => ({
    ...item,
    href: `/${locale}${item.href}`
  }));

  return (
    <aside className="w-64 bg-light-primary dark:bg-dark-primary border-r border-light-accent/10 dark:border-dark-accent/10">
      <div className="h-full px-6 py-8">
        {/* Navigation Links */}
        <nav className="space-y-2">
          {localizedNavItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl
                          transition-all duration-300 hover:scale-[1.02]
                          ${isActive 
                            ? 'bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text border border-light-accent/10 dark:border-dark-accent/10' 
                            : 'text-light-muted dark:text-dark-muted hover:bg-light-secondary dark:hover:bg-dark-secondary hover:text-light-text dark:hover:text-dark-text'
                          }`}
              >
                <div className={`w-8 h-8 rounded-lg ${isActive ? 'bg-black/30' : 'bg-black/20'} 
                              flex items-center justify-center text-lg`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Network Status */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="p-4 rounded-xl 
                       bg-light-secondary dark:bg-dark-secondary 
                       border border-light-accent/10 dark:border-dark-accent/10
                       transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <div className="text-sm text-light-muted dark:text-dark-muted">
                  {t('networkStatus')}
                </div>
                <div className="font-medium text-light-text dark:text-dark-text">
                  {t('network')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}; 