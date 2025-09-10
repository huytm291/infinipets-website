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

  const navigationItems = [
    { name: 'Collections', href: '#', hasDropdown: true },
    { name: 'New Arrivals', href: '#' },
    { name: 'Best Sellers', href: '#' },
    { name: 'Limited Edition', href: '#', badge: 'Hot' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/95 backdrop-blur-md border-gray-800' 
        : 'bg-white/95 backdrop-blur-md border-gray-200'
    } border-b shadow-lg`}>
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className={`py-2 text-center text-sm border-b ${
          isDarkMode ? 'border-gray-800 bg-gradient-to-r from-teal-900/20 to-green-900/20' : 'border-gray-100 bg-gradient-to-r from-teal-50/50 to-green-50/50'
        }`}>
          <div className="flex items-center justify-center space-x-4">
            <span className="animate-pulse">🐾</span>
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
              Free EU shipping on orders over €50 | Premium pet fashion since 2024
            </span>
            <span className="animate-pulse">✨</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-teal-500/10 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-white font-bold text-lg">∞</span>
              </div>
              <h1 className="font-coiny text-2xl md:text-3xl bg-gradient-to-r from-teal-500 to-green-400 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300 font-black">
                INFINIPETS
              </h1>
            </div>
          </div>

          {/* Navigation - Desktop with New Elegant Effects */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center space-x-2 rounded-lg ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Smooth slide-in background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-green-400/0 group-hover:from-teal-500/10 group-hover:to-green-400/10 rounded-lg transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100"></div>
                  
                  {/* Subtle border glow */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-teal-400/20 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <span className="relative z-10 transition-all duration-200">
                    {item.name}
                  </span>
                  
                  {item.badge && (
                    <span className="relative z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  
                  {item.hasDropdown && (
                    <span className="relative z-10 transform group-hover:rotate-180 transition-transform duration-300 text-xs">
                      ▼
                    </span>
                  )}
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-green-400 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                </a>

                {/* Enhanced Dropdown Menu */}
                {item.hasDropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-72 rounded-xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
                    isDarkMode 
                      ? 'bg-gray-800/95 border-gray-700 backdrop-blur-xl' 
                      : 'bg-white/95 border-gray-200 backdrop-blur-xl'
                  }`}>
                    <div className="p-4">
                      <div className="grid grid-cols-1 gap-2">
                        {['Everyday Wear', 'Special Occasions', 'Cosplay & Gala', 'Limited Edition'].map((category) => (
                          <a
                            key={category}
                            href="#"
                            className={`group/item p-3 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-teal-500/10 hover:to-green-400/10 ${
                              isDarkMode 
                                ? 'text-gray-300 hover:text-white' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`}
                          >
                            <div className="font-medium">{category}</div>
                            <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Premium collection
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-3 rounded-lg transition-all duration-300 hover:bg-teal-500/10 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Search size={18} />
              </button>
              
              {isSearchOpen && (
                <div className={`absolute right-0 top-full mt-2 w-80 rounded-xl shadow-2xl border p-4 animate-in slide-in-from-top-2 duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/95 border-gray-700 backdrop-blur-xl' 
                    : 'bg-white/95 border-gray-200 backdrop-blur-xl'
                }`}>
                  <input
                    type="text"
                    placeholder="Search for pet fashion..."
                    className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50/50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className={`relative p-3 rounded-lg transition-all duration-300 hover:bg-teal-500/10 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}>
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
            </button>

            {/* Favorites */}
            <button className={`relative p-3 rounded-lg transition-all duration-300 hover:bg-teal-500/10 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}>
              <Heart size={18} />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button className={`relative p-3 rounded-lg transition-all duration-300 hover:bg-teal-500/10 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}>
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-green-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <button className={`p-3 rounded-lg transition-all duration-300 hover:bg-teal-500/10 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}>
              <User size={18} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-3 rounded-lg transition-all duration-300 hover:rotate-180 ${
                isDarkMode 
                  ? 'hover:bg-yellow-500/20 text-yellow-400 hover:text-yellow-300' 
                  : 'hover:bg-teal-500/10 text-gray-600 hover:text-teal-600'
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden border-t py-4 animate-in slide-in-from-top-4 duration-300 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-500/10 hover:to-green-400/10 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}