import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Menu, X, Moon, Sun, User, Search } from 'lucide-react';

interface HeaderProps {
  favoriteCount: number;
  cartCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ favoriteCount, cartCount, isDarkMode, onToggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Thêm hiệu ứng khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigationItems = [
    { name: 'HOME', href: '#home' },
    { name: 'CATEGORIES', href: '#categories' },
    { name: 'SHOP', href: '#shop' },
    { name: 'BLOG', href: '#blog' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="logo font-coiny">
            {/* Bạn có thể thêm logo image nếu muốn */}
            {/* <img src="logo.png" alt="INFINIPETS Logo" className="site-logo" /> */}
            INFINIPETS
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-menu">
              {navigationItems.map((item) => (
                <li key={item.name} className="nav-item">
                  <a href={item.href} className="nav-link">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            {/* Nút Dark/Light mode được giữ lại */}
            <button
              onClick={onToggleDarkMode}
              className="nav-icon mode-toggle-button"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="icon-wrapper">
              <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="nav-icon"
                  title="Account"
              >
                  <User size={20}/>
              </button>
              {isUserDropdownOpen && (
                <div className="user-dropdown show">
                  {/* Thêm các link cho profile, logout, etc. ở đây */}
                  <a href="#" className="dropdown-item">Profile</a>
                  <a href="#" className="dropdown-item">Logout</a>
                </div>
              )}
            </div>
            <div className="icon-wrapper">
                <i className="nav-icon"><ShoppingCart size={20}/></i>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
            <div className="icon-wrapper">
               <i className="nav-icon"><Heart size={20}/></i>
              {favoriteCount > 0 && <span className="wishlist-count">{favoriteCount}</span>}
            </div>
            <div className="hamburger-menu" onClick={() => setIsMenuOpen(true)}>
                <Menu size={24} />
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <button onClick={() => setIsMenuOpen(false)} className="close-mobile-nav">
            <X size={30} />
        </button>
        <nav>
          <ul className="nav-menu">
            {navigationItems.map((item) => (
              <li key={item.name} className="nav-item">
                <a href={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}