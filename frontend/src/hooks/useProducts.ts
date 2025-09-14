import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  stock?: number;
  rating?: number;
  created_at?: string;
}

export default function useProducts(categoryId?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('products')
          .select('*')
          .order('name', { ascending: true });
        
        if (categoryId) {
          query = query.eq('category_id', categoryId);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching products:', error);
        } else {
          setProducts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Real-time subscription
    const subscription = supabase
      .channel('products_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setProducts(prev => [...prev, payload.new as Product]);
          } else if (payload.eventType === 'UPDATE') {
            setProducts(prev => 
              prev.map(product => product.id === payload.new.id ? payload.new as Product : product)
            );
          } else if (payload.eventType === 'DELETE') {
            setProducts(prev => prev.filter(product => product.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [categoryId]);

  return { products, loading };
}