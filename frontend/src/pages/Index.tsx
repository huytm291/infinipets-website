import { useState, useEffect } from 'react';
import { ChevronRight, Star, ArrowRight, Truck, Shield, Heart, Recycle, Send, CheckCircle, Play, Sparkles, Award } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ChatBot from '@/components/ChatBot';
import LoadingScreen from '@/components/LoadingScreen';
import NewsletterSection from '@/components/NewsletterSection';
import { supabase } from '@/lib/supabaseClient';
import { toast } from "sonner";

// Định nghĩa các kiểu dữ liệu để làm việc với dữ liệu từ Supabase
interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  sizes: string[];
  tags: string[];
  currency: string;
  isFeatured?: boolean;
  isLimited?: boolean;
  [key: string]: any;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  [key: string]: any;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // States
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [limitedProducts, setLimitedProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Fetch dữ liệu công khai khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          categoriesRes,
          featuredProductsRes,
          limitedProductsRes,
          testimonialsRes
        ] = await Promise.all([
          supabase.from('categories').select('*'),
          supabase.from('products').select('*').eq('is_featured', true),
          supabase.from('products').select('*').eq('is_limited', true),
          supabase.from('testimonials').select('*')
        ]);

        if (categoriesRes.data) setCategories(categoriesRes.data);
        if (featuredProductsRes.data) setFeaturedProducts(featuredProductsRes.data);
        if (limitedProductsRes.data) setLimitedProducts(limitedProductsRes.data);
        if (testimonialsRes.data) setTestimonials(testimonialsRes.data);

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load store data. Please refresh the page.");
      }
    };

    fetchData();
  }, []);

  // Quản lý session người dùng và fetch dữ liệu riêng tư (favorites)
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: favoriteData } = await supabase
          .from('favorites')
          .select('product_id')
          .eq('user_id', session.user.id);
        
        if (favoriteData) {
          setFavorites(favoriteData.map(fav => fav.product_id));
        }
      }
      setIsLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Carousel và dark mode
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Handle favorite với DB
  const handleFavorite = async (productId: string) => {
    if (!user) {
      toast.info("Please log in to save your favorites!");
      return;
    }

    const isFavorited = favorites.includes(productId);

    if (isFavorited) {
      setFavorites(prev => prev.filter(id => id !== productId));
      const { error } = await supabase
        .from('favorites')
        .delete()
        .match({ user_id: user.id, product_id: productId });
      
      if (error) {
        toast.error("Could not remove from favorites.");
        setFavorites(prev => [...prev, productId]);
      } else {
        toast.success("Removed from favorites!");
      }
    } else {
      setFavorites(prev => [...prev, productId]);
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, product_id: productId });

      if (error) {
        toast.error("Could not add to favorites.");
        setFavorites(prev => prev.filter(id => id !== productId));
      } else {
        toast.success("Added to favorites!");
      }
    }
  };

  // Handle newsletter subscription
  const handleNewsletterSubscribe = async (email: string) => {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert({ email: email });

    if (error) {
      if (error.code === '23505') { 
        toast.warning("This email is already subscribed!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      throw error;
    } else {
      toast.success("Successfully subscribed! Welcome to the pack! 🐾");
    }
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => {}} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        favoriteCount={favorites.length}
        cartCount={cartItems.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Hero Section với hình chú chó từ source gốc */}
      <section className={`relative py-20 px-4 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Background image với chú chó */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(/images/background.mp4)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        />
        
        {/* Overlay gradient */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80' 
            : 'bg-gradient-to-br from-white/80 via-gray-50/60 to-white/80'
        }`} />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Luxury Fashion for You & Your Pet
            </h1>
            
            <p className={`text-xl md:text-2xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover exclusive, high-quality fashion that celebrates the bond between you and your beloved companion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="btn-primary text-lg px-8 py-4">
                Explore Collection
              </button>
              <button className={`btn-secondary text-lg px-8 py-4 ${
                isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'
              }`}>
                Watch Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Explore Our Collections
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Curated fashion for every occasion and personality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className={`group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {category.name}
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {category.description}
                  </p>
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
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Featured Collections
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Handpicked favorites loved by pets and their parents
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
            <button className="btn-primary text-lg px-8 py-4">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Limited Edition */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Limited Edition
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Exclusive pieces with unique craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {limitedProducts.map((product) => (
              <div key={product.id} className={`rounded-2xl overflow-hidden shadow-xl hover-lift ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.name}
                  </h3>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      €{product.price}
                    </span>
                    <button className="btn-primary">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              What Our Customers Say
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Stories from our amazing community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`rounded-2xl p-8 shadow-lg hover-lift ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className={`italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section với hiệu ứng lá thư bay lên */}
      <NewsletterSection 
        isDarkMode={isDarkMode}
        onSubscribe={handleNewsletterSubscribe}
      />

      {/* Footer giống như index.html */}
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

      <ChatBot />
    </div>
  );
}