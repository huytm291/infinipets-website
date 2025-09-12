import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';


import AppLayout from '@/layouts/AppLayout';

import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProfilePage from '@/pages/ProfilePage';
import CartPage from '@/pages/CartPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFound from '@/pages/NotFound';

// (Tùy chọn) Component giữ chỗ cho các trang sẽ phát triển trong tương lai
const ProductDetailPage = () => <div className="pt-24 text-center">Trang Chi Tiết Sản Phẩm</div>;
const CheckoutPage = () => <div className="pt-24 text-center">Trang Thanh Toán</div>;
const CollectionsPage = () => <div className="pt-24 text-center">Trang Bộ Sưu Tập</div>;
const AboutPage = () => <div className="pt-24 text-center">Trang Giới Thiệu</div>;
const FavoritesPage = () => <div className="pt-24 text-center">Trang Yêu Thích</div>;


const queryClient = new QueryClient();

const App = () => (
  // 4. Bọc toàn bộ ứng dụng trong các providers cần thiết
  // Thứ tự rất quan trọng: các context của bạn nên nằm trong các thư viện provider
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Toaster richColors />
            {/* 5. Định nghĩa cấu trúc Routes */}
            <Routes>
              {/* Nhóm các Route sử dụng AppLayout chung (có Header & Footer) */}
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Route>
              
              {/* Các Route không sử dụng Layout chung */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Route cho trang 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

