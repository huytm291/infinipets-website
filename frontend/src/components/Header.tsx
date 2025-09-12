import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, Sun, Moon } from 'lucide-react';
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
} from "@/components/ui/dropdown-menu"


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
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? (isDarkMode ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-white/80 backdrop-blur-sm shadow-lg') : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold font-coiny bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent">
            INFINIPETS
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className={`p-3 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Search size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            <button onClick={onToggleDarkMode} className={`p-3 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600" />}
            </button>

            {user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <button className="p-3 rounded-full transition-all duration-300 hover:bg-teal-500/10">
                      <User size={18} className="text-teal-500" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-4">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                   <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
               <button 
                onClick={() => navigate('/login')}
                className="p-3 rounded-full transition-all duration-300 hover:bg-teal-500/10 text-gray-400 hover:text-teal-500"
              >
                <User size={18} />
              </button>
            )}


            <a href="/favorites" className="relative p-3 rounded-full transition-all duration-300 hover:bg-teal-500/10 text-gray-400 hover:text-teal-500">
              <Heart size={18} />
              {favoriteCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </a>
            <a href="/cart" className="relative p-3 rounded-full transition-all duration-300 hover:bg-teal-500/10 text-gray-400 hover:text-teal-500">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`md:hidden absolute top-full left-4 right-4 rounded-b-2xl shadow-xl overflow-hidden ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'}`}
          >
            <div className="flex flex-col space-y-2 p-3">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-4 text-center rounded-lg font-medium transition-colors ${isDarkMode ? 'text-gray-200 hover:bg-gray-700/60' : 'text-gray-700 hover:bg-gray-100'}`}
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

