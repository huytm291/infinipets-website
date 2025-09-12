import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/profile'); // Chuyển hướng đến trang cá nhân sau khi đăng nhập thành công
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <p className="mb-4 text-center text-red-500 font-semibold animate-shake">
                {error}
              </p>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-semibold">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#14b8a6] to-[#4ade80] hover:from-[#0f8f8a] hover:to-[#3ac66a] text-white font-semibold shadow-lg transition-transform transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>Signing In...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="font-semibold text-[#14b8a6] dark:text-[#4ade80] hover:underline"
              >
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Animation shake for error */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;