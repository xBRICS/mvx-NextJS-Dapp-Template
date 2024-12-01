import { redirect } from 'next/navigation';

export default function RootPage() {
  const savedLang = typeof window !== 'undefined' 
    ? localStorage.getItem('language') || 'en'
    : 'en';
    
  redirect(`/${savedLang}`);
}
