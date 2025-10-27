// Product management utilities
import { Product } from '@/types';
import productsData from '@/data/products.json';

export const getAllProducts = (): Product[] => {
  return productsData as Product[];
};

export const getProductById = (id: string): Product | undefined => {
  return productsData.find(product => product.id === id) as Product | undefined;
};

export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  ) as Product[];
};

export const getProductsByPriceRange = (minPrice: number, maxPrice: number): Product[] => {
  return productsData.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  ) as Product[];
};

export const getInStockProducts = (): Product[] => {
  return productsData.filter(product => product.inStock) as Product[];
};

export const searchProducts = (query: string, locale: string = 'en'): Product[] => {
  const searchTerm = query.toLowerCase();
  return productsData.filter(product => {
    const name = locale === 'ar' ? product.nameAr : product.name;
    const description = locale === 'ar' ? product.descriptionAr : product.description;
    const fragrance = locale === 'ar' ? product.fragranceAr : product.fragrance;
    
    return (
      name.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      fragrance.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }) as Product[];
};

export const getProductCategories = (): string[] => {
  const categories = new Set(productsData.map(product => product.category));
  return Array.from(categories);
};

export const getProductCategoriesAr = (): string[] => {
  const categories = new Set(productsData.map(product => product.categoryAr));
  return Array.from(categories);
};
