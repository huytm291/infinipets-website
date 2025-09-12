import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/data/products"; // Sau này sẽ fetch từ Supabase
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductsPage() {
  // Quản lý trạng thái favorite đơn giản (demo)
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      console.log(`Toggled favorite for product: ${productId}`);
      return newSet;
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="font-coiny text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none">
          Our Collection
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          Explore our full range of luxury fashion for you and your pet.
        </p>
      </div>

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
        {featuredProducts.concat(featuredProducts).map((product, index) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ProductCard
              product={product}
              onFavorite={handleFavorite}
              isFavorited={favorites.has(product.id)}
              className="cursor-pointer"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}