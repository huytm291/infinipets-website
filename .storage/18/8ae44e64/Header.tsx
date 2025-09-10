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
    <header className={`sticky top-0 z-40 transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-900/90 backdrop-blur-xl border-gray-800' 
        : 'bg-white/90 backdrop-blur-xl border-gray-200'
    } border-b shadow-lg`}>
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className={`py-2 text-center text-sm border-b ${
          isDarkMode ? 'border-gray-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20' : 'border-gray-100 bg-gradient-to-r from-purple-50/50 to-blue-50/50'
        }`}>
          <div className="flex items-center justify-center space-x-4">
            <span className="animate-bounce">🐾</span>
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
              Free EU shipping on orders over €50 | Premium pet fashion since 2024
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>✨</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300 hover:scale-110"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-white font-bold text-lg">🐾</span>
              </div>
              <h1 className="font-coiny text-2xl md:text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300">
                INFINIPETS
              </h1>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  } hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 hover:shadow-lg hover:scale-105`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Elegant glow effect */}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-500 blur-sm"></span>
                  
                  {/* Border glow */}
                  <span className="absolute inset-0 rounded-xl border border-transparent group-hover:border-purple-500/30 transition-all duration-300"></span>
                  
                  <span className="relative z-10 group-hover:drop-shadow-sm transition-all duration-300">
                    {item.name}
                  </span>
                  
                  {item.badge && (
                    <span className="relative z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse shadow-md">
                      {item.badge}
                    </span>
                  )}
                  
                  {item.hasDropdown && (
                    <span className="relative z-10 transform group-hover:rotate-180 transition-transform duration-300 text-xs">
                      ▼
                    </span>
                  )}
                </a>

                {/* Enhanced Dropdown Menu */}
                {item.hasDropdown && (
                  <div className={`absolute top-full left-0 mt-3 w-72 rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
                    isDarkMode 
                      ? 'bg-gray-800/95 border-gray-700 backdrop-blur-xl' 
                      : 'bg-white/95 border-gray-200 backdrop-blur-xl'
                  }`}>
                    <div className="p-6">
                      <div className="grid grid-cols-1 gap-3">
                        {['Everyday Wear', 'Special Occasions', 'Cosplay & Gala', 'Limited Edition'].map((category, catIndex) => (
                          <a
                            key={category}
                            href="#"
                            className={`group/item p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md ${
                              isDarkMode 
                                ? 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 text-gray-300 hover:text-white' 
                                : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 text-gray-700 hover:text-gray-900'
                            }`}
                            style={{ animationDelay: `${catIndex * 0.05}s` }}
                          >
                            <div className="font-medium group-hover/item:translate-x-1 transition-transform duration-200">{category}</div>
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
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  isDarkMode 
                    ? 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 text-gray-400 hover:text-white' 
                    : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 text-gray-600 hover:text-gray-900'
                }`}
              >
                <Search size={20} />
              </button>
              
              {isSearchOpen && (
                <div className={`absolute right-0 top-full mt-3 w-80 rounded-2xl shadow-2xl border p-6 animate-in slide-in-from-top-2 duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/95 border-gray-700 backdrop-blur-xl' 
                    : 'bg-white/95 border-gray-200 backdrop-blur-xl'
                }`}>
                  <input
                    type="text"
                    placeholder="Search for pet fashion..."
                    className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 ${
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
            <button className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
              isDarkMode 
                ? 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 text-gray-400 hover:text-white' 
                : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 text-gray-600 hover:text-gray-900'
            }`}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-md">
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping"></span>
              </span>
            </button>

            {/* Favorites */}
            <button className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
              isDarkMode 
                ? 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 text-gray-400 hover:text-white' 
                : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 text-gray-600 hover:text-gray-900'
            }`}>
              <Heart size={20} />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-md">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
              isDarkMode 
                ? 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 text-gray-400 hover:text-white' 
                : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 text-gray-600 hover:text-gray-900'
            }`}>
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <button className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
              isDarkMode 
                ? 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 text-gray-400 hover:text-white' 
                : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 text-gray-600 hover:text-gray-900'
            }`}>
              <User size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-lg hover:rotate-180 ${
                isDarkMode 
                  ? 'hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 text-yellow-400 hover:text-yellow-300' 
                  : 'hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 text-gray-600 hover:text-blue-600'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden border-t py-6 animate-in slide-in-from-top-4 duration-300 ${
            isDarkMode ? 'border-gray-800 bg-gradient-to-b from-gray-800/50 to-gray-900/50' : 'border-gray-200 bg-gradient-to-b from-gray-50/50 to-white/50'
          }`}>
            <nav className="space-y-3">
              {navigationItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md ${
                    isDarkMode 
                      ? 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 text-gray-300 hover:text-white' 
                      : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 text-gray-700 hover:text-gray-900'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
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