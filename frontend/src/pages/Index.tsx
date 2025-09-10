import { useState, useEffect } from 'react';
import { ChevronRight, Star, ArrowRight, Truck, Shield, Heart, Recycle, Send, CheckCircle, Play, Sparkles, Award } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ChatBot from '@/components/ChatBot';
import LoadingScreen from '@/components/LoadingScreen';
import { supabase } from '@/lib/supabaseClient'; // Đã có sẵn
import { toast } from "sonner"; // ADDED: Thư viện hiển thị thông báo

// ADDED: Định nghĩa các kiểu dữ liệu để làm việc với dữ liệu từ Supabase
interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  isFavorited?: boolean; // Sẽ được thêm vào sau khi fetch
  // Thêm các trường khác nếu cần thiết từ bảng products
  [key: string]: any;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  // Thêm các trường khác nếu cần thiết từ bảng categories
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
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // --- UPDATED STATES ---
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [limitedProducts, setLimitedProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);


  // ADDED: useEffect để fetch tất cả dữ liệu công khai khi component được mount
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

  // ADDED: useEffect để quản lý session người dùng và fetch dữ liệu riêng tư (favorites)
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
      // Đánh dấu đã load xong sau khi có session (hoặc không)
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

  // UPDATED: Giữ nguyên logic UI cho carousel và dark mode
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

  // UPDATED: handleFavorite để tương tác với DB
  const handleFavorite = async (productId: string) => {
    if (!user) {
      toast.info("Please log in to save your favorites!");
      // Tùy chọn: mở modal đăng nhập ở đây
      return;
    }

    const isFavorited = favorites.includes(productId);

    if (isFavorited) {
      // Remove from favorites
      setFavorites(prev => prev.filter(id => id !== productId)); // Cập nhật UI ngay lập tức
      const { error } = await supabase
        .from('favorites')
        .delete()
        .match({ user_id: user.id, product_id: productId });
      
      if (error) {
        toast.error("Could not remove from favorites.");
        setFavorites(prev => [...prev, productId]); // Hoàn tác nếu có lỗi
      } else {
        toast.success("Removed from favorites!");
      }
    } else {
      // Add to favorites
      setFavorites(prev => [...prev, productId]); // Cập nhật UI ngay lập tức
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, product_id: productId });

      if (error) {
        toast.error("Could not add to favorites.");
        setFavorites(prev => prev.filter(id => id !== productId)); // Hoàn tác nếu có lỗi
      } else {
        toast.success("Added to favorites!");
      }
    }
  };

  // UPDATED: handleSubscribe để tương tác với DB
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert({ email: email });

    setIsSubscribing(false);

    if (error) {
      // Lỗi email đã tồn tại
      if (error.code === '23505') { 
        toast.warning("This email is already subscribed!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      setIsSubscribed(true);
      setEmail('');
      toast.success("Successfully subscribed! Welcome to the pack! 🐾");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  // --- Render Logic ---
  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => {}} />; // Đã bỏ onLoadedComplete vì state được quản lý ở useEffect
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        favoriteCount={favorites.length}
        cartCount={cartItems.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Hero Section và các phần khác không thay đổi */}
      {/* ... */}

      {/* Categories Section - UPDATED để dùng dữ liệu từ state */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          {/* ... Tiêu đề section */}
          <div className="masonry-grid">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="masonry-item group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* ... Nội dung thẻ category */}
                <img src={category.image} alt={category.name} /* ... */ />
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                {/* <span>{category.productCount} items</span> // Lưu ý: Cần tính toán số lượng sản phẩm nếu cần */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - UPDATED để dùng dữ liệu từ state */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          {/* ... Tiêu đề section */}
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
          {/* ... Nút View All */}
        </div>
      </section>

      {/* Limited Edition - UPDATED để dùng dữ liệu từ state */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          {/* ... Tiêu đề section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {limitedProducts.map((product) => (
              <div key={product.id} className={`rounded-2xl overflow-hidden shadow-xl hover-lift ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                {/* ... Nội dung thẻ sản phẩm limited */}
                <img src={product.images[0]} alt={product.name} /* ... */ />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span>€{product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Craft Section - không thay đổi */}
      {/* ... */}
      
      {/* Customer Testimonials - UPDATED để dùng dữ liệu từ state */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          {/* ... Tiêu đề section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`rounded-2xl p-8 shadow-lg hover-lift ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                {/* ... Nội dung testimonial */}
                <p>"{testimonial.text}"</p>
                <h4>{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter and Footer - không thay đổi cấu trúc, chỉ thay đổi logic submit */}
      {/* ... */}

      <ChatBot />
    </div>
  );
}