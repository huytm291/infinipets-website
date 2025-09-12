import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LfXtccrAAAAANX6qR1fs4WsrXD0VCrf_MMy4hpR'; // 
const RECAPTCHA_VERIFY_FUNCTION_URL = 'https://qrhtnntsdfsgzfkhohzp.supabase.co/functions/v1/verify-recaptcha';

const SignupPage = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const token = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();

      if (!token) {
        setError('reCAPTCHA verification failed. Please try again.');
        setLoading(false);
        return;
      }

      const verifyResponse = await fetch(RECAPTCHA_VERIFY_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!verifyResponse.ok) {
        setError('Failed to verify reCAPTCHA. Please try again.');
        setLoading(false);
        return;
      }

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        setError('reCAPTCHA verification failed. Please try again.');
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      setSuccess('Please check your email to verify your account.');

      // TODO: Lưu thêm username, phone nếu cần qua API hoặc Supabase function

      // Optionally navigate or reset form here
      // navigate('/login');

    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
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
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent select-none">
              Create an Account
            </CardTitle>
            <CardDescription className="text-gray-300 select-none">
              Join our community of pet lovers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <motion.p
                key="error"
                className="mb-4 text-center text-red-400 font-semibold select-none"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {error}
              </motion.p>
            )}
            {success && (
              <motion.p
                key="success"
                className="mb-4 text-center text-green-400 font-semibold select-none"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {success}
              </motion.p>
            )}
            <form onSubmit={handleSignup} className="space-y-6" noValidate>
              {/* Username */}
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="peer bg-gray-700 bg-opacity-60 text-white placeholder-transparent rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-900 focus:bg-gray-600 transition duration-300 shadow-md"
                />
                <Label
                  htmlFor="username"
                  className="absolute left-5 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-sm cursor-text select-none pointer-events-none transform-gpu will-change-transform"
                >
                  Username
                </Label>
              </div>

              {/* Email */}
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="peer bg-gray-700 bg-opacity-60 text-white placeholder-transparent rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-900 focus:bg-gray-600 transition duration-300 shadow-md"
                />
                <Label
                  htmlFor="email"
                  className="absolute left-5 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-sm cursor-text select-none pointer-events-none transform-gpu will-change-transform"
                >
                  Email
                </Label>
              </div>

              {/* Phone (optional) */}
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className="peer bg-gray-700 bg-opacity-60 text-white placeholder-transparent rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-900 focus:bg-gray-600 transition duration-300 shadow-md"
                />
                <Label
                  htmlFor="phone"
                  className="absolute left-5 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-sm cursor-text select-none pointer-events-none transform-gpu will-change-transform"
                >
                  Phone (optional)
                </Label>
              </div>

              {/* Password */}
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="peer bg-gray-700 bg-opacity-60 text-white placeholder-transparent rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-900 focus:bg-gray-600 transition duration-300 shadow-md"
                />
                <Label
                  htmlFor="password"
                  className="absolute left-5 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-sm cursor-text select-none pointer-events-none transform-gpu will-change-transform"
                >
                  Password
                </Label>
                <p className="text-xs text-gray-400 mt-1 select-none">
                  Password must be at least 6 characters long.
                </p>
              </div>

              {/* reCAPTCHA */}
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                size="invisible"
                ref={recaptchaRef}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 select-none"
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
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
            <p className="mt-6 text-center text-sm text-gray-400 select-none">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-semibold text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
              >
                Log in
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>

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