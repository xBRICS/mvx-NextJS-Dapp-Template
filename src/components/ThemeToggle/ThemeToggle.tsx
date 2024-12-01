'use client';

import { FC } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full
                 transition-colors duration-300 focus:outline-none
                 bg-neutral/20 dark:bg-accent/20"
      role="switch"
      aria-checked={theme === 'dark'}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full 
         transition-transform duration-300
         bg-white dark:bg-accent
         flex items-center justify-center`}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}; 