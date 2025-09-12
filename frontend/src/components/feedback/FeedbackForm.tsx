import React, { useState } from 'react';

interface FeedbackFormProps {
  productId: string;
  onAddFeedback: (rating: number, comment: string, email: string) => Promise<boolean>;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ productId, onAddFeedback }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (!email.trim() || !comment.trim()) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const isSuccess = await onAddFeedback(rating, comment, email);
    if (isSuccess) {
      setSuccess(true);
      setRating(5);
      setComment('');
      setEmail('');
    } else {
      setError('Failed to submit feedback. Please try again.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto font-inter">
      {/* Email input with floating label */}
      <div className="relative">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your email"
          className="peer w-full rounded-xl bg-gray-700 bg-opacity-60 text-white px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-900 focus:bg-gray-600 transition duration-300 shadow-md"
        />
        <label
          htmlFor="email"
          className="absolute left-5 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-green-400 peer-focus:text-sm cursor-text select-none pointer-events-none transform-gpu will-change-transform"
        >
          Your Email
        </label>
      </div>

      {/* Rating select with floating label */}
      <div className="relative">
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="peer w-full rounded-xl bg-gray-700 bg-opacity-60 text-white px-5 pt-6 pb-2 appearance-none placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-900 focus:bg-gray-600 transition duration-300 shadow-md"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? 's' : ''}
            </option>
          ))}
        </select>
        <label
          htmlFor="rating"
          className="absolute left-5 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-green-400 peer-focus:text-sm cursor-text select-none pointer-events-none transform-gpu will-change-transform"
        >
          Rating
        </label>
        {/* Custom arrow for select */}
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white">
          ▼
        </div>
      </div>

      {/* Comment textarea with floating label */}
      <div className="relative">
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Write your feedback here..."
          className="peer w-full rounded-xl bg-gray-700 bg-opacity-60 text-white px-5 pt-6 pb-2 placeholder-transparent resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-gray-900 focus:bg-gray-600 transition duration-300 shadow-md"
        />
        <label
          htmlFor="comment"
          className="absolute left-5 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-green-400 peer-focus:text-sm cursor-text select-none pointer-events-none transform-gpu will-change-transform"
        >
          Comment
        </label>
      </div>

      {/* Error and success messages */}
      {error && <p className="text-red-600 font-semibold select-none">{error}</p>}
      {success && <p className="text-green-600 font-semibold select-none">Thank you for your feedback!</p>}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none"
        aria-busy={loading}
      >
        {loading ? (
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
          'Submit Feedback'
        )}
      </button>
    </form>
  );
};

export default FeedbackForm;