import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  published_at: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, content, cover_image_url, published_at')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">Loading post...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-red-600 dark:text-red-400">{error || 'Post not found.'}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="prose prose-lg dark:prose-invert mx-auto text-gray-800 dark:text-gray-200"
        >
          <h1 className="font-coiny text-5xl mb-6">{post.title}</h1>
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full rounded-2xl mb-8 object-cover max-h-96"
            draggable={false}
          />
          <p>{post.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          {/* Nếu bạn lưu nội dung bài viết dạng HTML */}
        </motion.article>
      </div>
    </main>
  );
}