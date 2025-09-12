import { useState, useEffect } from 'react';
import TestimonialsSection from '@/components/TestimonialsSection';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import { supabase } from '@/lib/supabaseClient';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<
    {
      id: number;
      name: string;
      location: string;
      text: string;
      rating: number;
      image: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch testimonials từ Supabase khi mount
  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('id, name, location, text, rating, image_url')
          .order('id', { ascending: true });

        if (error) throw error;

        const mapped = (data || []).map((item) => ({
          id: item.id,
          name: item.name,
          location: item.location,
          text: item.text,
          rating: item.rating,
          image: item.image_url,
        }));

        setTestimonials(mapped);
      } catch (err: any) {
        setError(err.message || 'Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  // Hàm thêm feedback mới vào state khi FeedbackForm gửi thành công
  const handleNewFeedback = (newFeedback: {
    id: number;
    name: string;
    location: string;
    text: string;
    rating: number;
    image: string;
  }) => {
    setTestimonials((prev) => [newFeedback, ...prev]);
  };

  return (
    <main className="min-h-screen py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-4 space-y-20">
        {loading && <p className="text-center text-gray-600 dark:text-gray-400">Loading testimonials...</p>}
        {error && <p className="text-center text-red-600 dark:text-red-400">{error}</p>}
        {!loading && !error && <TestimonialsSection testimonials={testimonials} />}
        <FeedbackForm onSuccess={handleNewFeedback} />
      </div>
    </main>
  );
}