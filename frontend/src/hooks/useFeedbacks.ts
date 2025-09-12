import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Feedback {
  id: string;
  product_id: string;
  user_email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function useFeedbacks(productId: string) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    supabase
      .from<Feedback>('feedbacks')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setFeedbacks(data);
        setLoading(false);
      });
  }, [productId]);

  // Hàm gửi feedback mới
  const addFeedback = async (feedback: Omit<Feedback, 'id' | 'created_at'>) => {
    const { data, error } = await supabase.from('feedbacks').insert([feedback]);
    if (!error && data) {
      setFeedbacks((prev) => [data[0], ...prev]);
      return true;
    }
    return false;
  };

  return { feedbacks, loading, addFeedback };
}