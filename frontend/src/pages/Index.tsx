import { useState, useEffect } from 'react';
import { ChevronRight, Star, ArrowRight, Truck, Shield, Heart, Recycle, Send, CheckCircle, Play, Sparkles, Award, Mail } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ChatBot from '@/components/ChatBot';
import LoadingScreen from '@/components/LoadingScreen';
import { categories, featuredProducts, limitedProducts } from '@/data/products';

// Component hiệu ứng nhiều lá thư bay lên với sparkles
const EnhancedFlyingEnvelope = ({ isVisible, onAnimationEnd }: { isVisible: boolean; onAnimationEnd: () => void }) => {
  if (!isVisible) return null;

  // Tạo nhiều lá thư với hiệu ứng đa dạng
  const envelopes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.15,
    startX: 20 + (i * 5) % 60, // Phân bố rộng hơn
    startY: 45 + (i % 3) * 5, // Vị trí Y khác nhau
    rotation: (i * 30) % 360,
    scale: 0.6 + (i % 4) * 0.2,
    type: i % 3, // 3 loại hiệu ứng khác nhau
  }));

  // Tạo sparkles xung quanh
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    startX: 10 + (i * 4) % 80,
    startY: 30 + (i % 5) * 8,
    scale: 0.3 + (i % 3) * 0.2,
  }));

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50"
      onAnimationEnd={onAnimationEnd}
    >
      {/* Sparkles effect */}
      {sparkles.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="flying-sparkle"
          style={{
            left: `${sparkle.startX}%`,
            top: `${sparkle.startY}%`,
            animationDelay: `${sparkle.delay}s`,
            '--scale': sparkle.scale,
          } as React.CSSProperties}
        >
          <Sparkles size={12} className="text-yellow-400" />
        </div>
      ))}

      {/* Flying envelopes */}
      {envelopes.map((envelope) => (
        <div
          key={`envelope-${envelope.id}`}
          className={`flying-envelope-enhanced type-${envelope.type}`}
          style={{
            left: `${envelope.startX}%`,
            top: `${envelope.startY}%`,
            animationDelay: `${envelope.delay}s`,
            '--rotation': `${envelope.rotation}deg`,
            '--scale': envelope.scale,
          } as React.CSSProperties}
        >
          <Mail size={20} className="text-teal-500" />
        </div>
      ))}
      
      <style jsx>{`
        .flying-sparkle {
          position: absolute;
          animation: sparkleFloat 2s ease-out forwards;
          opacity: 0;
        }
        
        .flying-envelope-enhanced {
          position: absolute;
          animation: flyUpEnhanced 3.5s ease-out forwards;
          opacity: 0;
        }
        
        .flying-envelope-enhanced.type-0 {
          animation: flyUpStraight 3s ease-out forwards;
        }
        
        .flying-envelope-enhanced.type-1 {
          animation: flyUpCurved 3.2s ease-out forwards;
        }
        
        .flying-envelope-enhanced.type-2 {
          animation: flyUpSpiral 3.8s ease-out forwards;
        }
        
        @keyframes sparkleFloat {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            transform: scale(var(--scale)) rotate(180deg);
            opacity: 1;
          }
          80% {
            transform: scale(calc(var(--scale) * 1.5)) rotate(360deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) rotate(540deg);
            opacity: 0;
          }
        }
        
        @keyframes flyUpStraight {
          0% {
            transform: translate(-50%, -50%) scale(var(--scale)) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -150vh) scale(calc(var(--scale) * 0.3)) rotate(var(--rotation));
            opacity: 0;
          }
        }
        
        @keyframes flyUpCurved {
          0% {
            transform: translate(-50%, -50%) scale(var(--scale)) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          30% {
            transform: translate(-30%, -70vh) scale(calc(var(--scale) * 1.2)) rotate(calc(var(--rotation) * 0.3));
          }
          60% {
            transform: translate(-70%, -100vh) scale(calc(var(--scale) * 0.9)) rotate(calc(var(--rotation) * 0.7));
          }
          100% {
            transform: translate(-50%, -150vh) scale(calc(var(--scale) * 0.3)) rotate(var(--rotation));
            opacity: 0;
          }
        }
        
        @keyframes flyUpSpiral {
          0% {
            transform: translate(-50%, -50%) scale(var(--scale)) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          25% {
            transform: translate(-30%, -60vh) scale(calc(var(--scale) * 1.1)) rotate(90deg);
          }
          50% {
            transform: translate(-70%, -80vh) scale(calc(var(--scale) * 1.3)) rotate(180deg);
          }
          75% {
            transform: translate(-30%, -110vh) scale(calc(var(--scale) * 0.8)) rotate(270deg);
          }
          100% {
            transform: translate(-50%, -150vh) scale(calc(var(--scale) * 0.2)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showFlyingEnvelope, setShowFlyingEnvelope] = useState(false);

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
    
    // Hiển thị hiệu ứng nhiều lá thư bay lên
    setShowFlyingEnvelope(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      setEmail('');
    }, 2000);
  };

  const handleAnimationEnd = () => {
    setShowFlyingEnvelope(false);
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

      {/* Hero Section với background đẹp và nội dung đơn giản */}
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

        {/* Main Hero Content - Đơn giản như yêu cầu */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Luxury Fashion for You & Your Pet
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover exclusive, high-quality fashion that celebrates the bond between you and your beloved companion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <span>Explore Collection</span>
              <span className="ml-2">🐕</span>
            </button>
            <button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
              <Play className="mr-2" size={16} />
              <span>Watch Story</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for premium pet fashion..." 
                className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
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

      {/* Newsletter Section với hiệu ứng lá thư bay lên */}
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
      <footer className={`py-16 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-900 border-gray-800'} border-t text-white relative overflow-hidden`}>
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-teal-900/10 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-teal-400">
                INFINIPETS
              </h3>
              <p className="text-gray-400 mb-6">
                Luxury fashion for the modern pet parent, celebrating the unique bond between humans and their companions.
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-teal-400">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {['Home', 'Shop', 'Categories', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-teal-400">
                Customer Service
              </h4>
              <ul className="space-y-2">
                {['Size Guide', 'Shipping & Returns', 'Care Instructions', 'FAQ'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-teal-400">
                Contact Information
              </h4>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  123 Fashion Avenue, London, UK
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +44 20 7123 4567
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  hello@infinipets.com
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Mon-Fri: 9AM-6PM GMT
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 INFINIPETS. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Flying Envelope Effect với nhiều lá thư và sparkles */}
      <EnhancedFlyingEnvelope 
        isVisible={showFlyingEnvelope} 
        onAnimationEnd={handleAnimationEnd}
      />

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
}