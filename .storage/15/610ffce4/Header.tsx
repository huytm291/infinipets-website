import { useState } from 'react';
import { Search, Heart, ShoppingCart, Menu, X, Moon, Sun, User, Bell } from 'lucide-react';

interface HeaderProps {
  favoriteCount: number;
  cartCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ favoriteCount, cartCount, isDarkMode, onToggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { name: 'Collections', href: '#', hasDropdown: true },
    { name: 'New Arrivals', href: '#' },
    { name: 'Best Sellers', href: '#' },
    { name: 'Limited Edition', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-lg border-b transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">🐾</span>
              </div>
              <h1 className="font-coiny text-xl md:text-2xl text-gradient">INFINIPETS</h1>
            </div>
          </div>

          {/* Desktop Navigation - Enhanced with better animations */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background hover effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                  
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-full"></span>
                  
                  {/* Text content */}
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Bottom border animation */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out rounded-full"></span>
                </a>

                {/* Dropdown indicator with animation */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out translate-y-1 group-hover:translate-y-2 rounded-sm"></div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <Search size={20} />
              </button>
              
              {/* Search dropdown with animation */}
              {isSearchOpen && (
                <div className={`absolute right-0 top-full mt-2 w-80 p-4 rounded-2xl shadow-2xl border animate-in slide-in-from-top-2 fade-in duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <input
                    type="text"
                    placeholder="Search for pet fashion..."
                    className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Favorites */}
            <button className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 ${
              isDarkMode 
                ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}>
              <Heart size={20} />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 ${
              isDarkMode 
                ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}>
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 ${
              isDarkMode 
                ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}>
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            </button>

            {/* User Account */}
            <button className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 ${
              isDarkMode 
                ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}>
              <User size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full transition-all duration-500 hover:scale-110 hover:rotate-180 ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-yellow-400 hover:text-yellow-300' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden border-t animate-in slide-in-from-top-4 fade-in duration-300 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <nav className="py-4 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:translate-x-2 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-500 hover:w-full transition-all duration-300 rounded-full"></span>
                  </span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}