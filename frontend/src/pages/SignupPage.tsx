import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      setSuccess('Please check your email to verify your account.');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border border-gray-700 rounded-3xl bg-gray-800 bg-opacity-90 backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              Create an Account
            </CardTitle>
            <CardDescription className="text-gray-300">
              Join our community of pet lovers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <p className="mb-4 text-center text-pink-400 font-semibold animate-shake">
                {error}
              </p>
            )}
            {success && (
              <p className="mb-4 text-center text-green-400 font-semibold">
                {success}
              </p>
            )}
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="peer bg-gray-700 bg-opacity-60 text-white placeholder-transparent rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-gray-600 transition duration-300 shadow-md"
                />
                <Label
                  htmlFor="email"
                  className="absolute left-5 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-pink-500 peer-focus:text-sm cursor-text select-none"
                >
                  Email
                </Label>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="current-password"
                  className="peer bg-gray-700 bg-opacity-60 text-white placeholder-transparent rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-gray-600 transition duration-300 shadow-md"
                />
                <Label
                  htmlFor="password"
                  className="absolute left-5 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-pink-500 peer-focus:text-sm cursor-text select-none"
                >
                  Mật khẩu
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Password must be at least 6 characters long.
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold text-lg shadow-lg hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-semibold text-pink-500 hover:underline"
              >
                Log in
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

export default SignupPage;