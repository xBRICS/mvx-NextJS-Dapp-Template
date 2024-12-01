'use client';

import { FC } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Treasury', href: '/dashboard/treasury' },
  { name: 'Governance', href: '/dashboard/governance' },
  { name: 'Stake', href: '/dashboard/stake' },
  { name: 'Swap', href: '/dashboard/swap' },
  { name: 'Analytics', href: '/dashboard/analytics' },
];

export const DashboardSidebar: FC = () => {
  return (
    <nav className="w-64 bg-slate-800/30 min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-300 rounded-lg
                         hover:bg-slate-700/50 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}; 