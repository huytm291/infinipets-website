import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, Sun, Moon, ChevronDown } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Đảm bảo đường dẫn đúng

interface HeaderProps {
  favoriteCount: number;
  cartCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ favoriteCount, cartCount, isDarkMode, onToggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth(); // Lấy thông tin người dùng và hàm signOut

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'CATEGORIES', href: '/categories' }, // Giả định có trang categories
    { name: 'SHOP', href: '/products' },
    { name: 'BLOG', href: '/blog' }, // Giả định có trang blog
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' }, // Giả định có trang contact
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Hàm xử lý click vào nav link
  const handleNavLinkClick = (href: string) => {
    navigate(href);
    setIsMenuOpen(false); // Đóng menu mobile sau khi click
  };

  // Hàm xử lý hiệu ứng hover cho nav link (tái tạo hiệu ứng liquid fill)
  const NavLinkEffect = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return (
      <a
        href={href}
        onClick={(e) => { e.preventDefault(); handleNavLinkClick(href); }}
        className="relative block px-4 py-2 font-semibold rounded-lg overflow-hidden transition-all duration-500 ease-in-out group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-sky-600 to-teal-500 transform scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100 z-0"></span>
        <span className={`relative z-10 transition-colors duration-500 ease-in-out ${isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-white'}`}>
          {children}
        </span>
      </a>
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-in-out ${isScrolled ? (isDarkMode ? 'bg-gray-900/90 backdrop-blur-lg shadow-xl border-b border-gray-700' : 'bg-white/90 backdrop-blur-lg shadow-xl border-b border-gray-200') : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-2xl font-bold font-coiny bg-gradient-to-r from-sky-600 to-teal-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 hover:rotate-1">
            {/* Bạn có thể thêm logo image ở đây nếu muốn, tương tự như index.html */}
            {/* <img src="/logo2.png" alt="INFINIQUE Logo" className="h-8 w-auto" /> */}
            INFINIPETS
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              <NavLinkEffect key={link.name} href={link.href}>
                {link.name}
              </NavLinkEffect>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                className={`appearance-none bg-transparent border-2 rounded-full py-1 px-3 text-sm font-medium cursor-pointer transition-all duration-300 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:border-teal-500' : 'border-gray-300 text-gray-700 hover:border-teal-500'}`}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
                <option value="vi">VI</option>
              </select>
              <ChevronDown size={16} className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Search Icon */}
            <button className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Search size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>

            {/* Dark Mode Toggle */}
            <button onClick={onToggleDarkMode} className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
            </button>

            {/* User Dropdown / Login Button */}
            {user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <button className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                      <User size={20} className={isDarkMode ? 'text-teal-400' : 'text-teal-600'} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`w-48 ${isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border-gray-200'}`}>
                  <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className={`cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Profile</DropdownMenuItem>
                  <DropdownMenuItem className={`cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Orders</DropdownMenuItem>
                  <DropdownMenuItem className={`cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Settings</DropdownMenuItem>
                   <DropdownMenuSeparator className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} />
                  <DropdownMenuItem onClick={handleSignOut} className={`cursor-pointer text-red-500 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'}`}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
               <button
                onClick={() => navigate('/login')}
                className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <User size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
              </button>
            )}

            {/* Wishlist Icon */}
            <a href="/favorites" className={`relative p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Heart size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
              {favoriteCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </a>

            {/* Shopping Cart Icon */}
            <a href="/cart" className={`relative p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <ShoppingCart size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <Menu size={24} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden absolute top-full left-0 right-0 shadow-lg overflow-hidden z-50 ${isDarkMode ? 'bg-gray-800/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'}`}
          >
            <div className="flex flex-col space-y-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavLinkClick(link.href)}
                  className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-200 hover:bg-gray-700/70' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}