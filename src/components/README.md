# Components Structure

## Folder Organization

```
src/components/
├── index.tsx              # Main export file
├── common/                # Shared/reusable components
│   ├── index.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── LanguageSwitcher.tsx
│   └── CartIcon.tsx
├── products/              # Product-related components
│   ├── index.tsx
│   ├── ProductCard.tsx
│   ├── ProductImages.tsx
│   ├── ProductInfo.tsx
│   ├── ProductSpecs.tsx
│   ├── ProductTags.tsx
│   ├── StockInfo.tsx
│   ├── ProductActions.tsx
│   └── ProductsSection.tsx
└── layout/               # Layout components
    ├── index.tsx
    ├── Header.tsx
    └── Breadcrumb.tsx
```

## Import Examples

### Common Components
```tsx
import { Button, Card, LanguageSwitcher, CartIcon } from '@/components/common';
```

### Product Components
```tsx
import { ProductCard, ProductImages, ProductInfo } from '@/components/products';
```

### Layout Components
```tsx
import { Header, Breadcrumb } from '@/components/layout';
```

### All Components (from main index)
```tsx
import { Button, ProductCard, Header } from '@/components';
```

## Benefits

1. **Organized**: Components grouped by purpose
2. **Clear Path**: Easy to find components
3. **Maintainable**: Related components in same folder
4. **Scalable**: Easy to add new components
5. **Clean Imports**: Clear import paths
