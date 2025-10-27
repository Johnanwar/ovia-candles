# Component Structure Overview

## File Organization

### `/src/components/index.tsx`
**Purpose**: Exports shared/reusable UI components
- ✅ **Button**: Styled button with variants (primary, secondary, outline)
- ✅ **Card**: Container component with shadow
- ✅ **LanguageSwitcher**: Toggle between EN/AR
- ✅ **CartIcon**: Shopping cart icon with badge

### `/src/components/ProductCard.tsx`
**Purpose**: Standalone product card component for displaying products
- Shows product image, name, price, rating
- Add to Cart button
- View Details button
- Out of Stock indicator
- **Used by**: ProductsSection component

### Individual Component Files
**Purpose**: Specific components for product details page
- `Breadcrumb.tsx` - Navigation breadcrumb
- `Header.tsx` - App header with cart and language switcher
- `ProductImages.tsx` - Product image gallery
- `ProductInfo.tsx` - Product name, description, pricing
- `ProductActions.tsx` - Add to Cart and Wishlist buttons
- `ProductSpecs.tsx` - Product specifications table
- `StockInfo.tsx` - Stock status display
- `ProductTags.tsx` - Product tags display
- `ProductsSection.tsx` - Products grid with ProductCards

## Component Differences

### ProductCard.tsx vs index.tsx (OLD - REMOVED)

**Before (Duplicate in index.tsx):**
- Used `<Card>` wrapper component
- Had redundant ProductCard implementation
- Caused confusion about which one to use

**After (Clean Separation):**
- ProductCard is ONLY in `ProductCard.tsx`
- index.tsx contains ONLY shared components (Button, Card, LanguageSwitcher, CartIcon)
- Clear file purpose with documentation

## Usage Example

```tsx
// Import from dedicated file
import { ProductCard } from '@/components/ProductCard';
import { Button, LanguageSwitcher } from '@/components';

// Use ProductCard in product grids
<ProductCard product={product} locale={locale} />
```

## Benefits

1. **Clear Organization**: Each file has a single, clear purpose
2. **No Duplication**: One implementation per component
3. **Easy to Find**: Components organized by feature
4. **Maintainable**: Changes made in one place
5. **Self-Documenting**: File names indicate purpose
