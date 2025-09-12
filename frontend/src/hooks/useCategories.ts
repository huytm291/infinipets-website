import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from<Category>('categories')
      .select('*')
      .order('name', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setCategories(data);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}