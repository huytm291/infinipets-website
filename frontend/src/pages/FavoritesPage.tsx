import { useFavorites } from '@/contexts/FavoritesContext';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import { products } from '@/data/products';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  // Lọc sản phẩm yêu thích từ danh sách products
  const favoriteProducts = products.filter((p) => favorites.has(p.id));

  return (
    <main className="min-h-screen py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-6">
        <h1 className="font-coiny text-5xl mb-12 bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none">
          Your Favorite Products
        </h1>

        {favoriteProducts.length === 0 ? (
          <p className="text-xl text-gray-700 dark:text-gray-300">
            You have no favorite products yet.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {favoriteProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <ProductCard product={product} isFavorited={true} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}