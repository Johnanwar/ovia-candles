// Reusable UI components
'use client';
import { ReactNode } from 'react';
import { cn } from '@/utils';
import { Product } from '@/types';
import { useCart } from '@/hooks';
import { useTranslations } from 'next-intl';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-md p-6', className)}>
      {children}
    </div>
  );
};

// Product Card Component
interface ProductCardProps {
  product: Product;
  locale: string;
}

export const ProductCard = ({ product, locale }: ProductCardProps) => {
  const t = useTranslations('common');
  const { addToCart } = useCart();
  
  const isRTL = locale === 'ar';
  const productName = isRTL ? product.nameAr : product.name;
  const productDescription = isRTL ? product.descriptionAr : product.description;
  const productSize = isRTL ? product.sizeAr : product.size;
  const productMadeIn = isRTL ? product.madeInAr : product.madeIn;
  const productFragrance = isRTL ? product.fragranceAr : product.fragrance;

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
        <img
          src={product.image}
          alt={productName}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {isRTL ? 'نفد المخزون' : 'Out of Stock'}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {productName}
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">
            {productSize}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {productDescription}
        </p>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{isRTL ? 'العطر:' : 'Fragrance:'}</span>
            <span className="font-medium">{productFragrance}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{isRTL ? 'الوزن:' : 'Weight:'}</span>
            <span className="font-medium">{product.weight}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{isRTL ? 'وقت الاحتراق:' : 'Burn Time:'}</span>
            <span className="font-medium">{product.burnTime}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{isRTL ? 'مصنوع في:' : 'Made in:'}</span>
            <span className="font-medium text-green-600">{productMadeIn}</span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString()} {product.currency}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString()} {product.currency}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviewCount})</span>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? t('addToCart') : (isRTL ? 'نفد المخزون' : 'Out of Stock')}
          </Button>
          <Button variant="outline" size="sm">
            {t('viewDetails')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Language Switcher Component
interface LanguageSwitcherProps {
  currentLocale: string;
}

export const LanguageSwitcher = ({ currentLocale }: LanguageSwitcherProps) => {
  const isRTL = currentLocale === 'ar';
  
  const switchLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLanguage}
      className="min-w-[60px]"
    >
      {isRTL ? 'EN' : 'عربي'}
    </Button>
  );
};

// Cart Icon Component
interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

export const CartIcon = ({ itemCount, onClick }: CartIconProps) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};
