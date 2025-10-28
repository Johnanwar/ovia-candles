# Multi-Theme System Documentation

## Overview

The candles e-commerce app now features a comprehensive multi-theme system supporting light and dark modes with configurable colors. The system is built with CSS custom properties, React Context, and Tailwind CSS for maximum flexibility and performance.

## Architecture

### Theme Configuration (`src/config/theme.ts`)
- **ThemeMode**: Type definition for 'light' | 'dark'
- **ThemeColors**: Comprehensive color palette interface
- **ThemeConfig**: Complete theme configuration with colors, spacing, shadows, and border radius
- **lightTheme & darkTheme**: Pre-configured theme objects
- **themes**: Theme registry object

### Theme Context (`src/contexts/ThemeContext.tsx`)
- **ThemeProvider**: React context provider for theme state
- **useThemeContext**: Hook to access theme context
- **Features**:
  - Automatic system preference detection
  - Local storage persistence
  - CSS custom property injection
  - Hydration-safe rendering

### Enhanced Hook (`src/hooks/index.ts`)
- **useTheme**: Enhanced hook providing:
  - `theme`: Complete theme configuration
  - `mode`: Current theme mode
  - `setMode`: Function to change theme
  - `toggleTheme`: Function to toggle between themes
  - `isDark/isLight`: Boolean helpers
  - `colors`: Direct access to theme colors

## CSS Custom Properties

The system uses CSS custom properties for all theme values:

### Color Variables
```css
--color-background: Primary background color
--color-background-secondary: Secondary background
--color-background-tertiary: Tertiary background
--color-text: Primary text color
--color-text-secondary: Secondary text
--color-text-tertiary: Tertiary text
--color-text-inverse: Inverse text (for dark backgrounds)
--color-border: Primary border color
--color-border-secondary: Secondary border
--color-border-focus: Focus border color
--color-primary: Primary brand color
--color-primary-hover: Primary hover state
--color-primary-active: Primary active state
--color-primary-light: Light primary variant
--color-secondary: Secondary brand color
--color-success: Success state color
--color-warning: Warning state color
--color-error: Error state color
--color-info: Info state color
--color-accent: Accent color
--color-shadow: Shadow color
--color-overlay: Overlay color
```

### Design System Variables
```css
--radius-sm/md/lg/xl: Border radius values
--spacing-xs/sm/md/lg/xl: Spacing values
--shadow-sm/md/lg/xl: Shadow definitions
```

## Component Usage

### Theme Switcher Component
```tsx
import { ThemeSwitcher } from '@/components/common';

<ThemeSwitcher />
<ThemeSwitcher showLabel={true} />
<ThemeSwitcher className="custom-class" />
```

### Using Theme in Components
```tsx
import { useTheme } from '@/hooks';

const MyComponent = () => {
  const { theme, mode, toggleTheme, isDark, colors } = useTheme();
  
  return (
    <div 
      className="bg-[var(--color-background)] text-[var(--color-text)]"
      style={{ backgroundColor: colors.background }}
    >
      <button onClick={toggleTheme}>
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>
    </div>
  );
};
```

### CSS Classes with Theme Variables
```tsx
// Using Tailwind with CSS custom properties
<div className="bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)]">

// Hover states
<button className="hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-text-inverse)]">

// Focus states
<input className="focus:border-[var(--color-border-focus)] focus:ring-[var(--color-primary)]">
```

## Theme Customization

### Adding New Colors
1. Update `ThemeColors` interface in `src/config/theme.ts`
2. Add color values to both `lightTheme` and `darkTheme`
3. Add CSS custom property in `src/app/globals.css`
4. Use in components with `var(--color-new-color)`

### Creating New Theme Variants
1. Create new theme configuration object
2. Add to `themes` registry
3. Update `ThemeMode` type if needed
4. Modify `ThemeProvider` to handle new mode

### Example: Adding a Purple Theme
```typescript
export const purpleTheme: ThemeConfig = {
  mode: 'purple',
  colors: {
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    // ... other colors
  },
  // ... other config
};

export const themes: Record<ThemeMode, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
  purple: purpleTheme, // Add new theme
};
```

## Features

### ✅ Implemented Features
- **Light/Dark Mode Toggle**: Smooth transitions between themes
- **System Preference Detection**: Automatically detects user's OS preference
- **Persistent Storage**: Theme preference saved in localStorage
- **CSS Custom Properties**: All colors configurable via CSS variables
- **Component Integration**: All components use theme system
- **Page Integration**: All pages support theming
- **RTL Support**: Works with Arabic language layout
- **Smooth Transitions**: 300ms transitions for theme changes
- **Accessibility**: Proper focus states and contrast ratios
- **Performance**: CSS custom properties for optimal performance

### 🎨 Design Features
- **Elegant Animations**: Smooth hover effects and transitions
- **Consistent Spacing**: Unified spacing system
- **Shadow System**: Layered shadow system for depth
- **Border Radius**: Consistent rounded corners
- **Color Harmony**: Carefully selected color palettes
- **Typography**: Theme-aware text colors
- **Interactive States**: Hover, focus, and active states

### 🔧 Technical Features
- **Type Safety**: Full TypeScript support
- **Context API**: React Context for state management
- **Custom Hooks**: Reusable theme logic
- **CSS Variables**: Dynamic CSS custom properties
- **Tailwind Integration**: Works seamlessly with Tailwind
- **Server-Side Rendering**: SSR compatible
- **Hydration Safe**: Prevents hydration mismatches

## Usage Examples

### Basic Theme Toggle
```tsx
import { useTheme } from '@/hooks';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {mode === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};
```

### Conditional Styling
```tsx
import { useTheme } from '@/hooks';

const ConditionalComponent = () => {
  const { isDark, colors } = useTheme();
  
  return (
    <div className={isDark ? 'dark-specific-class' : 'light-specific-class'}>
      <div style={{ color: colors.primary }}>
        Themed content
      </div>
    </div>
  );
};
```

### Custom Theme Colors
```tsx
const CustomComponent = () => {
  return (
    <div 
      className="bg-[var(--color-background)]"
      style={{
        '--color-custom': '#ff6b6b',
        backgroundColor: 'var(--color-custom)'
      }}
    >
      Custom themed content
    </div>
  );
};
```

## Browser Support

- **Modern Browsers**: Full support for CSS custom properties
- **Fallbacks**: Graceful degradation for older browsers
- **Mobile**: Full support on mobile devices
- **RTL**: Complete RTL language support

## Performance

- **CSS Variables**: Native browser support for optimal performance
- **Minimal Re-renders**: Context optimization prevents unnecessary renders
- **Lazy Loading**: Theme provider only loads when needed
- **Caching**: Theme preferences cached in localStorage

## Future Enhancements

- **More Theme Variants**: Additional color schemes
- **User Customization**: Allow users to create custom themes
- **Theme Presets**: Pre-built theme collections
- **Animation Controls**: User preference for reduced motion
- **High Contrast Mode**: Accessibility enhancement
- **Seasonal Themes**: Automatic theme switching based on season

## Migration Guide

### From Hard-coded Colors
```tsx
// Before
<div className="bg-white text-gray-900 border border-gray-300">

// After
<div className="bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)]">
```

### From Conditional Classes
```tsx
// Before
<div className={isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>

// After
<div className="bg-[var(--color-background)] text-[var(--color-text)]">
```

## Troubleshooting

### Common Issues
1. **Hydration Mismatch**: Ensure ThemeProvider wraps the app
2. **Colors Not Updating**: Check CSS custom property names
3. **Transitions Not Smooth**: Verify transition classes are applied
4. **RTL Issues**: Ensure RTL-specific styles use theme variables

### Debug Mode
```tsx
const { theme, mode } = useTheme();
console.log('Current theme:', theme);
console.log('Current mode:', mode);
```

This comprehensive theme system provides a solid foundation for creating beautiful, accessible, and maintainable user interfaces that adapt to user preferences and system settings.
