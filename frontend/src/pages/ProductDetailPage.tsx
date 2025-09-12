import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // hoặc router bạn dùng
import { supabase } from '@/lib/supabaseClient';
import ProductDetail from '@/components/products/ProductDetail';
import { Product } from '@/hooks/useProducts';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    supabase
      .from<Product>('products')
      .select('*')
      .eq('id', productId)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setProduct(data);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;