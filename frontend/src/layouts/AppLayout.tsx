import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // Import component Footer vừa tạo
import { useCart } from '@/contexts/CartContext'; // Import hook giỏ hàng
// import { useAuth } from '@/contexts/AuthContext'; // Sẽ dùng sau để hiển thị thông tin user

const AppLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { cartCount } = useCart(); // Lấy số lượng sản phẩm từ CartContext
  // const { user } = useAuth(); // Sẽ dùng sau này

  useEffect(() => {
    // Logic chuyển đổi dark/light mode
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // TODO: Tích hợp logic cho mục yêu thích (favorites) sau
  const favoriteCount = 0; 

  return (
    <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 transition-colors duration-300">
            <Header
                favoriteCount={favoriteCount}
                cartCount={cartCount}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
            />
            <main className="pt-20"> {/* Thêm padding-top để nội dung không bị Header che mất */}
                <Outlet /> {/* Đây là nơi nội dung của các trang con sẽ hiển thị */}
            </main>
            <Footer />
        </div>
    </div>
  );
};

export default AppLayout;