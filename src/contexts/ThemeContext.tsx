/**
 * Theme Context and Provider
 * Provides theme state and configuration to all components
 */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, ThemeConfig, themes } from '@/config/theme';

interface ThemeContextType {
  theme: ThemeConfig;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultMode = 'light' 
}) => {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setModeState(savedTheme);
    } else if (systemPrefersDark) {
      setModeState('dark');
    }
    
    setMounted(true);
  }, []);

  // Update localStorage and apply theme
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', mode);
      
      // Apply theme to document
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mode);
      
      // Apply CSS custom properties
      const theme = themes[mode];
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--radius-${key}`, value);
      });
      
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
      
      Object.entries(theme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--shadow-${key}`, value);
      });
    }
  }, [mode, mounted]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const toggleTheme = () => {
    setModeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const theme = themes[mode];

  const value: ThemeContextType = {
    theme,
    mode,
    setMode,
    toggleTheme,
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
