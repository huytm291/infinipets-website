import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-coiny text-5xl mb-12 text-center bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none"
        >
          About INFINIPETS
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          className="prose prose-lg dark:prose-invert mx-auto text-gray-700 dark:text-gray-300"
        >
          <p>
            INFINIPETS is a luxury pet fashion brand dedicated to celebrating the unique bond between pets and their owners. We believe that pets deserve the best in style, comfort, and quality.
          </p>
          <p>
            Our collections are carefully crafted with premium materials and attention to detail, ensuring your beloved companions look and feel amazing.
          </p>
          <p>
            Founded in 2023, INFINIPETS has quickly become a favorite among pet parents across Europe who value both fashion and function.
          </p>
          <p>
            Join us on our journey to redefine pet fashion and make every walk a runway moment.
          </p>
        </motion.div>
      </div>
    </main>
  );
}