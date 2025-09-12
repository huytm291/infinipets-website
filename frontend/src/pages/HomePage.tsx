import { useState, useEffect } from 'react';
import { Star, ArrowRight, Play } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import ChatBot from '@/components/ChatBot';
import LoadingScreen from '@/components/LoadingScreen';
import { categories, featuredProducts } from '@/data/product';
import NewsletterSection from '@/components/NewsletterSection';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Testimonials state
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
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [errorTestimonials, setErrorTestimonials] = useState<string | null>(null);

  // Fetch testimonials from Supabase
  useEffect(() => {
    async function fetchTestimonials() {
      setLoadingTestimonials(true);
      setErrorTestimonials(null);
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
        setErrorTestimonials(err.message || 'Failed to load testimonials');
      } finally {
        setLoadingTestimonials(false);
      }
    }

    fetchTestimonials();
  }, []);

  const handleFavorite = (productId: string) => {
    console.log(`Toggled favorite for product: ${productId}`);
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#14b8a6] via-[#4ade80] to-[#3ac66a]"
        style={{
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight select-none drop-shadow-lg"
          >
            Luxury Fashion for You &amp; Your Pet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
            className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto drop-shadow-md"
          >
            Discover exclusive, high-quality fashion that celebrates the bond between you and your beloved companion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              className="bg-gradient-to-r from-[#14b8a6] to-[#4ade80] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center select-none"
              aria-label="Explore Collection"
            >
              <span>Explore Collection</span>
              <span className="ml-3 text-2xl animate-pulse">🐕</span>
            </button>
            <button
              className="border-2 border-white/40 backdrop-blur-sm text-white px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:bg-white/20 transition-colors duration-300 flex items-center justify-center select-none"
              aria-label="Watch Story"
            >
              <Play className="mr-3" size={18} />
              <span>Watch Story</span>
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-7 h-12 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1.5 h-4 bg-white rounded-full mt-3 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-coiny text-5xl mb-6 bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none drop-shadow-md"
            >
              Explore Our Collections
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="text-2xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
            >
              From everyday essentials to show-stopping costumes, find the perfect style for every personality
            </motion.p>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
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
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-coiny text-5xl mb-6 bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none drop-shadow-md"
            >
              Featured Favorites
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="text-2xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
            >
              Handpicked by our style experts and loved by pets across Europe
            </motion.p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <ProductCard
                  product={product}
                  onFavorite={handleFavorite}
                  isFavorited={false}
                  className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-coiny text-5xl mb-6 bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none drop-shadow-md"
            >
              Words from Our Pack
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="text-2xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
            >
              See what pet parents are saying about their INFINIPETS experience
            </motion.p>
          </div>

          {loadingTestimonials && (
            <p className="text-center text-gray-600 dark:text-gray-400">Loading testimonials...</p>
          )}

          {errorTestimonials && (
            <p className="text-center text-red-600 dark:text-red-400">{errorTestimonials}</p>
          )}

          {!loadingTestimonials && !errorTestimonials && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.18,
                  },
                },
              }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="rounded-3xl p-8 shadow-2xl bg-white dark:bg-gray-800 flex flex-col"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover select-none"
                      draggable={false}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={18} className="text-[#14b8a6] fill-current" />
                    ))}
                  </div>
                  <p className="flex-grow text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <NewsletterSection />
      <ChatBot />
    </div>
  );
}