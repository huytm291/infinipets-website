import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { posts, Post } from '@/data/posts';
import { motion } from 'framer-motion';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (slug) {
      const found = posts.find((p) => p.slug === slug);
      setPost(found || null);
    }
  }, [slug]);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Post not found.</p>
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
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-2xl mb-8 object-cover max-h-96"
            draggable={false}
          />
          <p>{post.excerpt}</p>
          {/* Bạn có thể thêm nội dung chi tiết hơn ở đây */}
        </motion.article>
      </div>
    </main>
  );
}