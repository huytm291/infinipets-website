import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string; // ISO string
  slug: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  onClick?: (slug: string) => void;
}

export default function BlogPostCard({ post, onClick }: BlogPostCardProps) {
  return (
    <motion.article
      layout
      whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(20, 184, 166, 0.3)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700"
      onClick={() => onClick?.(post.slug)}
      tabIndex={0}
      role="button"
      aria-label={`Read blog post: ${post.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(post.slug);
        }
      }}
    >
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-48 object-cover"
        draggable={false}
      />
      <div className="p-6">
        <time
          dateTime={post.publishedAt}
          className="block text-sm text-gray-500 dark:text-gray-400 mb-2 select-none"
        >
          {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
        </time>
        <h3 className="font-coiny text-2xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">
          {post.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{post.excerpt}</p>
      </div>
    </motion.article>
  );
}