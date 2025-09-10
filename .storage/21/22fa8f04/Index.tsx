import { useState, useEffect } from 'react';
import { ChevronRight, Star, ArrowRight, Truck, Shield, Heart, Recycle, Send, CheckCircle, Play, Sparkles, Award } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ChatBot from '@/components/ChatBot';
import LoadingScreen from '@/components/LoadingScreen';
import { categories, featuredProducts, limitedProducts } from '@/data/products';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    // Auto-slide for hero carousel
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsSubscribing(false);
    setEmail('');
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

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

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        favoriteCount={favorites.length}
        cartCount={cartItems.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* New Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-green-600 to-blue-600 opacity-90">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-teal-400 to-green-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg rotate-45 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-teal-400 to-green-400 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg rotate-12 opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="text-teal-400" size={16} />
                <span className="text-sm font-medium">Premium Pet Fashion Since 2024</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-coiny text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                <span className="block text-white mb-2">Welcome to</span>
                <span 
                  className="block bg-gradient-to-r from-teal-400 via-green-400 to-teal-400 bg-clip-text text-transparent font-black"
                  style={{
                    textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                  }}
                >
                  INFINIPETS
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl mb-4 text-white/90 font-light">
                Infinite Styles for Infinite Personalities
              </p>

              {/* Description */}
              <p className="text-lg mb-8 text-white/80 max-w-lg leading-relaxed">
                Discover premium pet fashion crafted with love in Europe. From everyday comfort to extraordinary occasions, we create styles that celebrate your pet's unique personality.
              </p>

              {/* Stats */}
              <div className="flex items-center space-x-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">10K+</div>
                  <div className="text-sm text-white/70">Happy Pets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">500+</div>
                  <div className="text-sm text-white/70">Unique Designs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">15+</div>
                  <div className="text-sm text-white/70">EU Countries</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="group bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center">
                  <span>Shop Collections</span>
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                
                <button className="group flex items-center space-x-2 text-white border-2 border-white/30 backdrop-blur-sm px-6 py-4 rounded-full hover:bg-white/10 transition-all duration-300">
                  <Play className="group-hover:scale-110 transition-transform" size={16} />
                  <span>Watch Our Story</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 mt-8 text-sm text-white/60">
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-green-400" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck size={16} className="text-teal-400" />
                  <span>Free EU Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award size={16} className="text-green-400" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Main Product Showcase */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=400&fit=crop"
                    alt="Featured Pet Fashion"
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  
                  {/* Floating Product Cards */}
                  <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-green-400 rounded-full"></div>
                      <div>
                        <div className="text-xs font-semibold text-gray-800">Superhero Cape</div>
                        <div className="text-xs text-gray-500">€49.99</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
                      <div>
                        <div className="text-xs font-semibold text-gray-800">Cozy Sweater</div>
                        <div className="text-xs text-gray-500">€34.99</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 text-6xl animate-spin" style={{ animationDuration: '20s' }}>✨</div>
              <div className="absolute bottom-0 left-0 text-4xl animate-bounce" style={{ animationDelay: '2s' }}>🐾</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-white/60 text-xs mt-2 text-center">Scroll to explore</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
              Explore Our Collections
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              From everyday essentials to show-stopping costumes, find the perfect style for every personality
            </p>
          </div>

          <div className="masonry-grid">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="masonry-item group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`rounded-2xl overflow-hidden shadow-lg hover-lift ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-coiny text-xl mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90 mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {category.productCount} items
                        </span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
              Featured Favorites
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Handpicked by our style experts and loved by pets across Europe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onFavorite={handleFavorite}
                isFavorited={favorites.includes(product.id)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center mx-auto">
              View All Products
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Limited Edition */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
              Limited Edition Collections
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Exclusive designs available for a limited time only
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {limitedProducts.map((product) => (
              <div key={product.id} className={`rounded-2xl overflow-hidden shadow-xl hover-lift ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="bg-gradient-to-r from-teal-500 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        LIMITED EDITION
                      </span>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} size={14} className="text-teal-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <h3 className={`font-coiny text-2xl mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                    <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.description}</p>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        €{product.price}
                      </span>
                      <span className="text-sm text-red-500 font-medium">Only 12 left!</span>
                    </div>
                    <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold px-6 py-3 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 w-full">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Craft Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
              Behind the Seams
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Every piece is handcrafted with love, attention to detail, and premium materials
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop"
                  alt="Handcrafting process"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                  <Heart className="text-teal-600 dark:text-teal-400" size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Handcrafted with Love</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Each piece is carefully crafted by skilled artisans who understand the unique needs of pets and their owners.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <Shield className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Premium Materials</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>We source only the finest, pet-safe materials that are comfortable, durable, and beautiful.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                  <Recycle className="text-teal-600 dark:text-teal-400" size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sustainable Practices</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Our commitment to the environment means using eco-friendly materials and sustainable production methods.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
              Words from Our Pack
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              See what pet parents across Europe are saying about their INFINIPETS experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`rounded-2xl p-8 shadow-lg hover-lift ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} size={16} className="text-teal-400 fill-current" />
                  ))}
                </div>
                <p className={`mb-6 italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Fixed Button Layout */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} relative overflow-hidden`}>
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-green-50/30 dark:from-teal-900/10 dark:to-green-900/10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-teal-200/20 dark:bg-teal-600/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-green-200/20 dark:bg-green-600/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-teal-200/20 dark:bg-teal-600/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-green-200/20 dark:bg-green-600/20 rounded-lg rotate-12 animate-bounce"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-green-100 dark:from-teal-800 dark:to-green-800 rounded-full px-4 py-2 mb-4">
                <Sparkles className="text-teal-600 dark:text-teal-400" size={16} />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-teal-200' : 'text-teal-800'}`}>Join 50,000+ Pet Parents</span>
              </div>
            </div>
            
            <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
              Join Our Pack
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Get exclusive access to new collections, styling tips, and special offers for your furry friends. Plus, enjoy 15% off your first order! 🐾
            </p>
            
            {isSubscribed ? (
              <div className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <CheckCircle size={24} className="text-green-500" />
                  <span className="text-lg font-semibold">Successfully subscribed!</span>
                </div>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Welcome to the INFINIPETS family! Check your email for your 15% discount code 🎉
                </p>
              </div>
            ) : (
              <div className="max-w-lg mx-auto">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 items-stretch">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-teal-500/50 transition-all placeholder-gray-500 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white border border-gray-600' 
                        : 'bg-white text-gray-900 border border-gray-300'
                    }`}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubscribing}
                    className="group relative bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 overflow-hidden min-w-[160px]"
                  >
                    {/* Animated Background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    
                    {/* Shimmer Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                    
                    <span className="relative z-10 flex items-center space-x-2">
                      {isSubscribing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Get 15% Off</span>
                        </>
                      )}
                    </span>
                  </button>
                </form>
                
                <div className={`flex items-center justify-center space-x-6 mt-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="flex items-center space-x-2">
                    <Shield size={16} className="text-green-500" />
                    <span>No spam, ever</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart size={16} className="text-teal-500" />
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </div>
            )}
            
            <p className={`text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Join thousands of pet parents who trust INFINIPETS for premium pet fashion 🐾✨
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-900 text-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-coiny text-2xl mb-4 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">INFINIPETS</h3>
              <p className="text-gray-400 mb-4">
                Premium pet fashion crafted with love in Europe. Infinite styles for infinite personalities.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'twitter', 'tiktok'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-600/20 to-green-600/20 hover:from-teal-600 hover:to-green-600 transition-all duration-300 hover:scale-110"
                  >
                    📱
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between ${
            isDarkMode ? 'border-gray-700' : 'border-gray-800'
          }`}>
            <p className="text-gray-400 text-sm">
              © 2024 INFINIPETS. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Truck size={16} className="text-green-500" />
                <span className="text-sm text-gray-400">Free EU Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-teal-500" />
                <span className="text-sm text-gray-400">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
}