'use client';

interface ProductImagesProps {
  product: {
    image: string;
    images?: string[];
  };
  productName: string;
}

export const ProductImages = ({ product, productName }: ProductImagesProps) => {
  return (
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
  );
};
