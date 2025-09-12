import { useState } from 'react';
import { posts } from '@/data/posts';
import BlogPostCard from '@/components/BlogPostCard';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const [blogPosts] = useState(posts);

  const handlePostClick = (slug: string) => {
    // Ví dụ: chuyển trang chi tiết bài viết
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
      </div>
    </main>
  );
}