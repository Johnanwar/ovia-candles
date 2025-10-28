/**
 * Product Images Component
 * Displays product images with theme-aware styling
 */
'use client';
import { Product } from '@/types';

interface ProductImagesProps {
  product: Product;
  productName: string;
}

export const ProductImages = ({ product, productName }: ProductImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-border)] shadow-sm">
        <img
          src={product.image}
          alt={productName}
          className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
      {product.images && product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-200 cursor-pointer">
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};