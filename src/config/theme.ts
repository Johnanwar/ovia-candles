/**
 * Theme Configuration
 * Centralized theme colors and configurations for light and dark modes
 */

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  // Border colors
  border: string;
  borderSecondary: string;
  borderFocus: string;
  
  // Interactive colors
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryLight: string;
  
  secondary: string;
  secondaryHover: string;
  secondaryActive: string;
  
  // Status colors
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;
  
  // Shadow colors
  shadow: string;
  shadowHover: string;
  
  // Overlay colors
  overlay: string;
  overlayLight: string;
  
  // Special colors
  accent: string;
  accentHover: string;
  accentLight: string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  colors: ThemeColors;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const lightTheme: ThemeConfig = {
  mode: 'light',
  colors: {
    // Background colors
    background: '#ffffff',
    backgroundSecondary: '#f8fafc',
    backgroundTertiary: '#f1f5f9',
    
    // Text colors
    text: '#1e293b',
    textSecondary: '#64748b',
    textTertiary: '#94a3b8',
    textInverse: '#ffffff',
    
    // Border colors
    border: '#e2e8f0',
    borderSecondary: '#cbd5e1',
    borderFocus: '#3b82f6',
    
    // Interactive colors
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryActive: '#1d4ed8',
    primaryLight: '#dbeafe',
    
    secondary: '#6b7280',
    secondaryHover: '#4b5563',
    secondaryActive: '#374151',
    
    // Status colors
    success: '#10b981',
    successLight: '#d1fae5',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    error: '#ef4444',
    errorLight: '#fee2e2',
    info: '#06b6d4',
    infoLight: '#cffafe',
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowHover: 'rgba(0, 0, 0, 0.15)',
    
    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.1)',
    
    // Special colors
    accent: '#8b5cf6',
    accentHover: '#7c3aed',
    accentLight: '#ede9fe',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

export const darkTheme: ThemeConfig = {
  mode: 'dark',
  colors: {
    // Background colors
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    backgroundTertiary: '#334155',
    
    // Text colors
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    textInverse: '#0f172a',
    
    // Border colors
    border: '#334155',
    borderSecondary: '#475569',
    borderFocus: '#60a5fa',
    
    // Interactive colors
    primary: '#60a5fa',
    primaryHover: '#3b82f6',
    primaryActive: '#2563eb',
    primaryLight: '#1e3a8a',
    
    secondary: '#9ca3af',
    secondaryHover: '#6b7280',
    secondaryActive: '#4b5563',
    
    // Status colors
    success: '#34d399',
    successLight: '#064e3b',
    warning: '#fbbf24',
    warningLight: '#451a03',
    error: '#f87171',
    errorLight: '#7f1d1d',
    info: '#22d3ee',
    infoLight: '#083344',
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowHover: 'rgba(0, 0, 0, 0.4)',
    
    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.2)',
    
    // Special colors
    accent: '#a78bfa',
    accentHover: '#8b5cf6',
    accentLight: '#4c1d95',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  },
};

export const themes: Record<ThemeMode, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
};
