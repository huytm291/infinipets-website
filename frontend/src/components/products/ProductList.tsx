import React from 'react';
import useProducts from '@/hooks/useProducts';
import ProductCard from './ProductCard';

interface ProductListProps {
  categoryId?: string;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId }) => {
  const { products, loading } = useProducts(categoryId);

  if (loading) return <p>Loading products...</p>;

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;