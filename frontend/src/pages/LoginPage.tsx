import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Giả lập submit
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Login successful!');
    }, 1500);
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

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <svg
              className="animate-spin h-6 w-6 mx-auto text-white"
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