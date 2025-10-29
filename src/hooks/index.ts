// Custom hooks
'use client';
import { useState } from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

// Enhanced theme hook using the new theme system
export const useTheme = () => {
  const { theme, mode, setMode, toggleTheme } = useThemeContext();
  
  return {
    theme,
    mode,
    setMode,
    toggleTheme,
    isDark: mode === 'dark',
    isLight: mode === 'light',
    colors: theme.colors,
  };
};