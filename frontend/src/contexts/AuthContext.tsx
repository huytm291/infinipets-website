import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

// Định nghĩa kiểu dữ liệu cho giá trị của Context
interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
}

// Tạo Context với giá trị mặc định
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tạo Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy session hiện tại khi ứng dụng khởi động
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Lắng nghe các thay đổi về trạng thái xác thực (đăng nhập, đăng xuất)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Dọn dẹp listener khi component bị unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Hàm đăng xuất
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Tạo custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};