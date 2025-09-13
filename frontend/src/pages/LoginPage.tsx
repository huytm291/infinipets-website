import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { supabase } from '@/lib/supabaseClient';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const RECAPTCHA_VERIFY_FUNCTION_URL = 'https://qrhtnntsdfsgzfkhohzp.supabase.co/functions/v1/verify-recaptcha';

export default function LoginPage() {
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      // Validation cơ bản
      if (!email.trim()) {
        setError('Email is required.');
        setIsSubmitting(false);
        return;
      }
      if (!password) {
        setError('Password is required.');
        setIsSubmitting(false);
        return;
      }

      // Xác thực reCAPTCHA
      if (!RECAPTCHA_SITE_KEY) {
        setError('reCAPTCHA site key is not configured.');
        setIsSubmitting(false);
        return;
      }

      const token = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();

      if (!token) {
        setError('reCAPTCHA verification failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const verifyResponse = await fetch(RECAPTCHA_VERIFY_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!verifyResponse.ok) {
        setError('Failed to verify reCAPTCHA. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        setError('reCAPTCHA verification failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Thực hiện đăng nhập
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setIsSubmitting(false);
        return;
      }

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-10 space-y-8 animate-fade-slide-up"
        style={{ fontFamily: "'Inter', sans-serif" }}
        noValidate
      >
        <h2 className="text-4xl font-extrabold text-white text-center mb-6 tracking-tight select-none">
          Login
        </h2>

        {/* Error/Success Messages */}
        {error && (
          <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-300 rounded-lg text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-500 bg-opacity-20 border border-green-400 text-green-300 rounded-lg text-sm text-center">
            {success}
          </div>
        )}

        {/* Email input with floating label */}
        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="peer w-full rounded-xl bg-gray-700 bg-opacity-60 text-white px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-900 focus:bg-gray-600 transition duration-300 shadow-md"
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className={`
              absolute left-5 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:top-2 peer-focus:text-green-400 peer-focus:text-sm
              cursor-text select-none
              pointer-events-none
              transform-gpu
              will-change-transform
            `}
          >
            Email
          </label>
          {/* Underline animation */}
          <span className="absolute left-5 right-5 bottom-1 h-0.5 bg-green-400 scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100" />
        </div>

        {/* Password input with floating label */}
        <div className="relative">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="peer w-full rounded-xl bg-gray-700 bg-opacity-60 text-white px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-900 focus:bg-gray-600 transition duration-300 shadow-md"
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className={`
              absolute left-5 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:top-2 peer-focus:text-green-400 peer-focus:text-sm
              cursor-text select-none
              pointer-events-none
              transform-gpu
              will-change-transform
            `}
          >
            Password
          </label>
          {/* Underline animation */}
          <span className="absolute left-5 right-5 bottom-1 h-0.5 bg-green-400 scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100" />
        </div>

        {/* reCAPTCHA - Invisible */}
        {RECAPTCHA_SITE_KEY && (
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            size="invisible"
            ref={recaptchaRef}
          />
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none flex items-center justify-center space-x-2"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-6 w-6 text-white"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span>Signing In...</span>
            </>
          ) : (
            'Login'
          )}
        </button>

        {/* Sign up link */}
        <p className="text-center text-gray-300 select-none">
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            className="font-semibold text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          >
            Sign up now
          </a>
        </p>
      </form>

      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}