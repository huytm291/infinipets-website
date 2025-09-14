import React from 'react';
import useProducts from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import { Product } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductListProps {
  categoryId?: string;
  searchTerm?: string;
  onFavorite?: (productId: string) => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
  favorites?: string[];
  showActions?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ 
  categoryId, 
  searchTerm,
  onFavorite,
  onEditProduct,
  onDeleteProduct,
  favorites = [],
  showActions = false
}) => {
  const { products, loading, error } = useProducts(categoryId, searchTerm);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square rounded-3xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading products: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
        <p className="text-gray-500">
          {searchTerm 
            ? `No products match "${searchTerm}"`
            : categoryId 
              ? "No products in this category"
              : "No products available"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onFavorite={onFavorite}
          onEdit={onEditProduct}
          onDelete={onDeleteProduct}
          isFavorited={favorites.includes(product.id)}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

export default ProductList;