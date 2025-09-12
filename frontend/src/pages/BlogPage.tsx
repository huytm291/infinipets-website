import { useState, useEffect } from 'react';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient'; 

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  published_at: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, cover_image_url, published_at')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setBlogPosts(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handlePostClick = (slug: string) => {
    window.location.href = `/blog/${slug}`;
  };

  return (
    <main className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-coiny text-5xl mb-12 text-center bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none"
        >
          Latest Blog Posts
        </motion.h1>

        {loading && <p className="text-center text-gray-600 dark:text-gray-300">Loading posts...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <BlogPostCard post={post} onClick={handlePostClick} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}