import React, { useState } from 'react';
import CategoryList from '@/components/products/CategoryList';
import ProductList from '@/components/products/ProductList';

const ProductsPage: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryList selectedCategoryId={selectedCategoryId ?? undefined} onSelectCategory={setSelectedCategoryId} />
      <ProductList categoryId={selectedCategoryId ?? undefined} />
    </div>
  );
};

export default ProductsPage;