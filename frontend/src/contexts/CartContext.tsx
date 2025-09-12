import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Product } from '@/data/products'; // Giả sử bạn có định nghĩa type Product

// Định nghĩa kiểu cho một sản phẩm trong giỏ hàng
export interface CartItem {
  product: Product;
  quantity: number;
}

// Định nghĩa kiểu cho giá trị của Context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  // Lưu giỏ hàng vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        // Nếu sản phẩm đã có, cập nhật số lượng
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Nếu chưa có, thêm mới vào giỏ hàng
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook để sử dụng CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};