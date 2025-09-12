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

      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-teal-50 via-white to-green-50'
      }`}>
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
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

      {/* Footer */}
      <footer className={`py-16 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                INFINIPETS
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Luxury fashion for the modern pet parent, celebrating the unique bond between humans and their companions.
              </p>
            </div>
            
            <div>
              <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h4>
              <ul className="space-y-2">
                {['Home', 'Shop', 'Categories', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className={`hover:text-teal-500 transition-colors ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Customer Service
              </h4>
              <ul className="space-y-2">
                {['Size Guide', 'Shipping & Returns', 'Care Instructions', 'FAQ'].map((link) => (
                  <li key={link}>
                    <a href="#" className={`hover:text-teal-500 transition-colors ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                  <a key={social} href="#" className={`hover:text-teal-500 transition-colors ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className={`border-t mt-12 pt-8 text-center ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            <p>&copy; 2024 INFINIPETS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}