import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Header from '@/components/Header'; // Assuming Header is in this path

// Placeholder components for the new pages
const LoginPage = () => <div className="pt-20 text-center">Login Page</div>;
const SignupPage = () => <div className="pt-20 text-center">Signup Page</div>;
const ProfilePage = () => <div className="pt-20 text-center">Profile Page</div>;
const ProductsPage = () => <div className="pt-20 text-center">Products Page</div>;
const ProductDetailPage = () => <div className="pt-20 text-center">Product Detail Page</div>;
const CartPage = () => <div className="pt-20 text-center">Cart Page</div>;
const CheckoutPage = () => <div className="pt-20 text-center">Checkout Page</div>;
const OrderHistoryPage = () => <div className="pt-20 text-center">Order History Page</div>;


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;