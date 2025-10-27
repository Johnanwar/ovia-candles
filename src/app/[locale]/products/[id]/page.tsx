import { Header } from '@/components/Header';
import { ProductActions } from '@/components/ProductActions';
import { getProductById } from '@/lib/productUtils';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface ProductDetailsPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { locale, id } = await params;
  const isRTL = locale === 'ar';
  
  const product = getProductById(id);
  
  if (!product) {
    notFound();
  }

  const productName = isRTL ? product.nameAr : product.name;
  const productDescription = isRTL ? product.descriptionAr : product.description;
  const productSize = isRTL ? product.sizeAr : product.size;
  const productMadeIn = isRTL ? product.madeInAr : product.madeIn;
  const productFragrance = isRTL ? product.fragranceAr : product.fragrance;
  const productWaxType = isRTL ? product.waxTypeAr : product.waxType;
  const productWickType = isRTL ? product.wickTypeAr : product.wickType;
  const productCategory = isRTL ? product.categoryAr : product.category;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700">
                  {isRTL ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700">
                  {isRTL ? 'المنتجات' : 'Products'}
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">{productName}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.image}
                alt={productName}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={image}
                      alt={`${productName} ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productName}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {productDescription}
              </p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-lg font-medium text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviewCount} {isRTL ? 'تقييم' : 'reviews'})</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {productCategory}
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price.toLocaleString()} {product.currency}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()} {product.currency}
                  </span>
                )}
              </div>
              
              <ProductActions product={product} locale={locale} />
            </div>

            {/* Product Specifications */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {isRTL ? 'مواصفات المنتج' : 'Product Specifications'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-bold">{isRTL ? 'الحجم:' : 'Size:'}</span>
                    <span className="font-small text-gray-600 ">{productSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className=" font-bold">{isRTL ? 'الأبعاد:' : 'Dimensions:'}</span>
                    <span className="font-small text-gray-600 ">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">{isRTL ? 'الوزن:' : 'Weight:'}</span>
                    <span className="font-small text-gray-600 ">{product.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">{isRTL ? 'وقت الاحتراق:' : 'Burn Time:'}</span>
                    <span className="font-small text-gray-600 ">{product.burnTime}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className=" font-bold">{isRTL ? 'العطر:' : 'Fragrance:'}</span>
                    <span className="font-small text-gray-600 ">{productFragrance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className=" font-bold">{isRTL ? 'نوع الشمع:' : 'Wax Type:'}</span>
                    <span className="font-small text-gray-600">{productWaxType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">{isRTL ? 'نوع الفتيل:' : 'Wick Type:'}</span>
                    <span className="font-small text-gray-600 ">{productWickType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className=" font-bold">{isRTL ? 'مصنوع في:' : 'Made in:'}</span>
                    <span className="font-small text-green-600">{productMadeIn}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Information */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{isRTL ? 'حالة المخزون:' : 'Stock Status:'}</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? (isRTL ? 'متوفر' : 'In Stock') : (isRTL ? 'نفد المخزون' : 'Out of Stock')}
                  </span>
                </div>
              </div>
              {product.inStock && (
                <p className="text-sm text-gray-500 mt-1">
                  {isRTL ? `${product.stockQuantity} قطع متوفرة` : `${product.stockQuantity} items available`}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {isRTL ? 'العلامات:' : 'Tags:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}