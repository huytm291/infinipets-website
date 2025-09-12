import { useState, useEffect } from 'react';
import { Star, ArrowRight, Shield, Heart, Recycle, Send, CheckCircle, Play, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ChatBot from '@/components/ChatBot';
import LoadingScreen from '@/components/LoadingScreen';
import { categories, featuredProducts, limitedProducts } from '@/data/products';
import NewsletterSection from '@/components/NewsletterSection'; 

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Các state về giỏ hàng, yêu thích và dark mode đã được chuyển ra Context và Layout
  // Logic xử lý cũng sẽ được chuyển đi sau này.
  const handleFavorite = (productId: string) => {
    console.log(`Toggled favorite for product: ${productId}`);
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  const testimonials = [
    {
      id: 1,
      name: "Sarah & Luna",
      location: "Berlin, Germany",
      text: "Luna looks absolutely stunning in her Forest Explorer set! The quality is exceptional and the fit is perfect. We get compliments everywhere we go! 🐕✨",
      rating: 5,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Marco & Bella",
      location: "Milan, Italy", 
      text: "The handmade sweater is incredibly soft and warm. Bella loves wearing it during our morning walks. INFINIPETS truly understands pet fashion! 🧶❤️",
      rating: 5,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma & Max",
      location: "Amsterdam, Netherlands",
      text: "Max's superhero cape makes him the star of the dog park! The attention to detail and comfort is amazing. Highly recommend! 🦸‍♂️🐾",
      rating: 5,
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div>
      {/* KHÔNG CÒN HEADER Ở ĐÂY */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-green-600 to-blue-600 opacity-90">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Luxury Fashion for You & Your Pet
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover exclusive, high-quality fashion that celebrates the bond between you and your beloved companion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <span>Explore Collection</span><span className="ml-2">🐕</span>
            </button>
            <button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
              <Play className="mr-2" size={16} /><span>Watch Story</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
              Explore Our Collections
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              From everyday essentials to show-stopping costumes, find the perfect style for every personality
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-700">
                    <img src={category.image} alt={category.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-6">
                        <h3 className="font-coiny text-xl mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                        <div className="flex items-center justify-between text-xs">
                            <span>{category.productCount} items</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
              Featured Favorites
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Handpicked by our style experts and loved by pets across Europe
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onFavorite={handleFavorite}
                isFavorited={false} // Sẽ cập nhật sau
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
                      Words from Our Pack
                  </h2>
                  <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                      See what pet parents are saying about their INFINIPETS experience
                  </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="rounded-2xl p-8 shadow-lg bg-white dark:bg-gray-700">
                          <div className="flex items-center space-x-1 mb-4">
                              {Array.from({ length: testimonial.rating }).map((_, i) => (
                                  <Star key={i} size={16} className="text-teal-400 fill-current" />
                              ))}
                          </div>
                          <p className="mb-6 italic text-gray-700 dark:text-gray-300">"{testimonial.text}"</p>
                          <div className="flex items-center space-x-3">
                              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                              <div>
                                  <h4 className="font-semibold">{testimonial.name}</h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <NewsletterSection />
      
      <ChatBot />
    </div>
  );
}