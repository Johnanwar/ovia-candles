/**
 * Theme Switcher Component
 * Toggle between light and dark themes with elegant animations
 */
'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeSwitcher = ({ className, showLabel = false }: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    
    // Update localStorage
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    
    // Apply CSS custom properties
    const lightTheme = {
      '--color-background': '#ffffff',
      '--color-background-secondary': '#f8fafc',
      '--color-background-tertiary': '#f1f5f9',
      '--color-text': '#1e293b',
      '--color-text-secondary': '#64748b',
      '--color-text-tertiary': '#94a3b8',
      '--color-text-inverse': '#ffffff',
      '--color-border': '#e2e8f0',
      '--color-border-secondary': '#cbd5e1',
      '--color-border-focus': '#d4af37',
      '--color-primary': '#d4af37',
      '--color-primary-hover': '#b8941f',
      '--color-primary-active': '#9a7a0a',
      '--color-primary-light': '#f7f0d9',
      '--color-secondary': '#2c2c2c',
      '--color-secondary-hover': '#1a1a1a',
      '--color-secondary-active': '#0f0f0f',
      '--color-success': '#10b981',
      '--color-success-light': '#d1fae5',
      '--color-warning': '#f59e0b',
      '--color-warning-light': '#fef3c7',
      '--color-error': '#ef4444',
      '--color-error-light': '#fee2e2',
      '--color-info': '#06b6d4',
      '--color-info-light': '#cffafe',
      '--color-shadow': 'rgba(0, 0, 0, 0.1)',
      '--color-shadow-hover': 'rgba(0, 0, 0, 0.15)',
      '--color-overlay': 'rgba(0, 0, 0, 0.5)',
      '--color-overlay-light': 'rgba(0, 0, 0, 0.1)',
      '--color-accent': '#8b5cf6',
      '--color-accent-hover': '#7c3aed',
      '--color-accent-light': '#ede9fe',
    };

    const darkTheme = {
      '--color-background': '#0f172a',
      '--color-background-secondary': '#1e293b',
      '--color-background-tertiary': '#334155',
      '--color-text': '#f8fafc',
      '--color-text-secondary': '#cbd5e1',
      '--color-text-tertiary': '#94a3b8',
      '--color-text-inverse': '#0f172a',
      '--color-border': '#334155',
      '--color-border-secondary': '#475569',
      '--color-border-focus': '#d4af37',
      '--color-primary': '#d4af37',
      '--color-primary-hover': '#e6c547',
      '--color-primary-active': '#b8941f',
      '--color-primary-light': '#2a2419',
      '--color-secondary': '#2c2c2c',
      '--color-secondary-hover': '#404040',
      '--color-secondary-active': '#1a1a1a',
      '--color-success': '#34d399',
      '--color-success-light': '#064e3b',
      '--color-warning': '#fbbf24',
      '--color-warning-light': '#451a03',
      '--color-error': '#f87171',
      '--color-error-light': '#7f1d1d',
      '--color-info': '#22d3ee',
      '--color-info-light': '#083344',
      '--color-shadow': 'rgba(0, 0, 0, 0.3)',
      '--color-shadow-hover': 'rgba(0, 0, 0, 0.4)',
      '--color-overlay': 'rgba(0, 0, 0, 0.7)',
      '--color-overlay-light': 'rgba(0, 0, 0, 0.2)',
      '--color-accent': '#a78bfa',
      '--color-accent-hover': '#8b5cf6',
      '--color-accent-light': '#4c1d95',
    };

    const theme = newTheme === 'dark' ? darkTheme : lightTheme;
    
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${className}`}
        disabled
      >
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <div className="flex items-center space-x-2">
        {/* Sun Icon */}
        <svg
          className={`w-4 h-4 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`w-4 h-4 absolute transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>

        {showLabel && (
          <span className="text-sm font-medium">
            {isDark ? 'Dark' : 'Light'}
          </span>
        )}
      </div>
    </Button>
  );
};
