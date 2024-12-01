'use client';

import { FC, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';

interface SettingsProps {
  settingsLabel: string;
  languageLabel: string;
  themeLabels: {
    light: string;
    dark: string;
  };
}

export const Settings: FC<SettingsProps> = ({ settingsLabel, languageLabel, themeLabels }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = async (newLocale: string) => {
    try {
      // Get the current path without the locale
      const segments = pathname.split('/');
      segments[1] = newLocale; // Replace the locale segment
      const newPath = segments.join('/') || '/';
      
      // Update local storage
      localStorage.setItem('language', newLocale);
      
      // Update context
      setLanguage(newLocale as 'en' | 'ro');
      
      // Navigate to the new locale path
      router.push(newPath);
      router.refresh(); // Force a refresh to ensure all translations are updated
      setIsOpen(false);
    } catch (error) {
      console.error('Error switching language:', error);
    }
  };

  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl bg-light-secondary dark:bg-dark-secondary 
                  border border-light-accent/10 dark:border-dark-accent/10
                  flex items-center justify-center
                  hover:bg-light-accent/10 dark:hover:bg-dark-accent/10
                  transition-all duration-300"
      >
        <svg 
          className="w-5 h-5 text-light-text dark:text-dark-text" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 py-2
                        bg-light-secondary dark:bg-dark-secondary
                        border border-light-accent/10 dark:border-dark-accent/10
                        rounded-xl shadow-xl">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full px-4 py-2 text-left hover:bg-light-accent/10 dark:hover:bg-dark-accent/10
                        text-light-text dark:text-dark-text"
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{theme === 'dark' ? '🌙' : '☀️'}</span>
                {theme === 'dark' ? themeLabels.light : themeLabels.dark}
              </span>
            </button>

            {/* Language Select */}
            <div className="px-4 py-2">
              <div className="text-sm text-light-muted dark:text-dark-muted mb-1">
                {languageLabel}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2 py-1 rounded ${
                    language === 'en' 
                      ? 'bg-light-accent/10 dark:bg-dark-accent/10' 
                      : ''
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => handleLanguageChange('ro')}
                  className={`px-2 py-1 rounded ${
                    language === 'ro'
                      ? 'bg-light-accent/10 dark:bg-dark-accent/10'
                      : ''
                  }`}
                >
                  🇷🇴 RO
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}; 