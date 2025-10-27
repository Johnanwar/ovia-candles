# Candles Store - E-commerce App

A modern Next.js e-commerce application built with TypeScript, supporting Arabic and English languages. Features a complete shopping experience with product catalog, shopping cart, and multilingual support.

## Features

- ⚡ **Next.js 16** with App Router
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🌍 **Internationalization** (Arabic & English)
- 🛒 **Shopping Cart** functionality
- 📱 **Responsive Design** 
- 🧩 **Component-based Architecture**
- 🎯 **Custom Hooks** for reusable logic
- 🛠️ **ESLint** for code quality

## E-commerce Features

- **Product Catalog**: Browse products with images, descriptions, and pricing
- **Shopping Cart**: Add/remove items, update quantities
- **Multilingual Support**: Full Arabic and English language support
- **Responsive Design**: Works perfectly on all devices
- **Product Categories**: Organized product categories
- **Stock Management**: Track product availability
- **Rating System**: Product ratings and reviews display

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   └── [locale]/       # Internationalized routes
│       ├── layout.tsx   # Root layout with i18n
│       ├── page.tsx     # Home page
│       └── globals.css  # Global styles
├── components/         # Reusable UI components
│   ├── ProductCard     # Product display component
│   ├── LanguageSwitcher # Language toggle
│   └── CartIcon        # Shopping cart icon
├── hooks/              # Custom React hooks
│   ├── useCart         # Shopping cart management
│   ├── useLocalStorage # Local storage utility
│   └── useTheme        # Theme management
├── types/              # TypeScript type definitions
│   ├── Product         # Product interface
│   ├── Cart            # Shopping cart types
│   └── Order           # Order management
├── utils/              # Utility functions
├── lib/                # External library configurations
│   └── products.ts     # Sample product data
├── i18n/               # Internationalization config
└── messages/           # Translation files
    ├── en.json         # English translations
    └── ar.json         # Arabic translations
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)
   - English: [http://localhost:3000/en](http://localhost:3000/en)
   - Arabic: [http://localhost:3000/ar](http://localhost:3000/ar)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl
- **Fonts:** Geist Sans & Geist Mono
- **Linting:** ESLint with Next.js config

## Language Support

The application supports two languages:
- **English (en)**: Default language
- **Arabic (ar)**: Full RTL support

Language switching is available through the header component, and all content is properly localized including:
- Product names and descriptions
- Navigation elements
- UI labels and messages
- Error messages

## Development Guidelines

- Follow the existing project structure
- Use TypeScript for all new files
- Create reusable components in `/src/components`
- Add custom hooks in `/src/hooks`
- Define types in `/src/types`
- Keep utility functions in `/src/utils`
- Add translations to both `en.json` and `ar.json`
- Maintain clean, readable code with minimal comments
- Test both English and Arabic language versions
