import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

export default function useProducts(categoryId?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = supabase.from<Product>('products').select('*').order('name', { ascending: true });
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    query.then(({ data, error }) => {
      if (!error && data) setProducts(data);
      setLoading(false);
    });
  }, [categoryId]);

  return { products, loading };
}