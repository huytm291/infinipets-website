import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { categories } from '@/data/products';
import AuthModal from './AuthModal';

interface HeaderProps {
  favoriteCount: number;
  cartCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header = ({ favoriteCount, cartCount, isDarkMode, onToggleDarkMode }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentCurrency, setCurrentCurrency] = useState('EUR');
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies = ['EUR', 'GBP', 'CHF', 'USD'];
  const languages = ['EN', 'DE', 'FR', 'IT', 'ES'];

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'frosted-glass shadow-lg' : 'bg-white/95 dark:bg-gray-900/95'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="font-coiny text-2xl lg:text-3xl text-gradient">
                INFINIPETS
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="font-medium hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300">
                Home
              </a>
              <div 
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <a href="#" className="font-medium hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300">
                  Shop
                </a>
                {/* Mega Menu */}
                <div className={`mega-menu ${showMegaMenu ? 'show' : ''} bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}>
                  <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-3 gap-8">
                      {categories.map((category) => (
                        <div key={category.id} className="group cursor-pointer">
                          <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                            <img 
                              src={category.image} 
                              alt={category.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors text-gray-900 dark:text-white">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            {category.description}
                          </p>
                          <span className="text-xs text-blue-600 font-medium">
                            {category.productCount} products
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className="font-medium hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300">
                Collections
              </a>
              <a href="#" className="font-medium hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300">
                About
              </a>
              <a href="#" className="font-medium hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300">
                Contact
              </a>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for pet fashion..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Language & Currency */}
              <div className="hidden lg:flex items-center space-x-2">
                <select 
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="text-sm border-none bg-transparent focus:outline-none cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <span className="text-gray-300">|</span>
                <select 
                  value={currentCurrency}
                  onChange={(e) => setCurrentCurrency(e.target.value)}
                  className="text-sm border-none bg-transparent focus:outline-none cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Favorites */}
              <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                <Heart size={20} />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              <div className="relative group">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                  <User size={20} />
                </button>
                {/* User Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button
                      onClick={() => openAuthModal('login')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => openAuthModal('register')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Create Account
                    </button>
                    <hr className="my-2 border-gray-200 dark:border-gray-600" />
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      My Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Order History
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <a href="#" className="font-medium py-2 text-gray-700 dark:text-gray-300">Home</a>
                <a href="#" className="font-medium py-2 text-gray-700 dark:text-gray-300">Shop</a>
                <a href="#" className="font-medium py-2 text-gray-700 dark:text-gray-300">Collections</a>
                <a href="#" className="font-medium py-2 text-gray-700 dark:text-gray-300">About</a>
                <a href="#" className="font-medium py-2 text-gray-700 dark:text-gray-300">Contact</a>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-4">
                    <select 
                      value={currentLanguage}
                      onChange={(e) => setCurrentLanguage(e.target.value)}
                      className="text-sm border border-gray-200 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                    <select 
                      value={currentCurrency}
                      onChange={(e) => setCurrentCurrency(e.target.value)}
                      className="text-sm border border-gray-200 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {currencies.map(curr => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openAuthModal('login')}
                      className="text-sm px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => openAuthModal('register')}
                      className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 lg:h-20" />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;