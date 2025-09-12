import { motion } from 'framer-motion';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <main className="min-h-screen py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-6">
        <h1 className="font-coiny text-5xl mb-12 text-center bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none">
          Explore All Categories
        </h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="group cursor-pointer rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-shadow duration-400 bg-white dark:bg-gray-800"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out select-none"
                draggable={false}
              />
              <div className="p-8">
                <h3 className="font-coiny text-2xl mb-3">{category.name}</h3>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-6">{category.description}</p>
                <div className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <span>{category.productCount} items</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}