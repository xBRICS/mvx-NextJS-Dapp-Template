export const safeStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  },
  
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
  },
  
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  },
  
  clear: (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  }
}; 