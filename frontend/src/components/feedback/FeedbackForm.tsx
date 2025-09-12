import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isValid = name.trim() && text.trim() && rating > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error('Please fill in all required fields and provide a rating.');
      return;
    }
    setSubmitting(true);

    // Giả lập gửi dữ liệu lên backend (Supabase hoặc API)
    try {
      // await api.post('/feedbacks', { name, location, rating, text });
      await new Promise((r) => setTimeout(r, 1500)); // giả lập delay

      toast.success('Thank you for your feedback!');
      setName('');
      setLocation('');
      setRating(5);
      setText('');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h3 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none">
        Leave Your Feedback
      </h3>

      <div className="mb-4">
        <Label htmlFor="name" className="font-semibold text-gray-800 dark:text-gray-200">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
          disabled={submitting}
          className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="location" className="font-semibold text-gray-800 dark:text-gray-200">
          Location
        </Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, Country (optional)"
          disabled={submitting}
          className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="rating" className="font-semibold text-gray-800 dark:text-gray-200">
          Rating <span className="text-red-500">*</span>
        </Label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={submitting}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80] text-gray-900 dark:text-gray-100"
          required
        >
          {[5,4,3,2,1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <Label htmlFor="text" className="font-semibold text-gray-800 dark:text-gray-200">
          Feedback <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your feedback here..."
          rows={5}
          required
          disabled={submitting}
          className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
        />
      </div>

      <Button
        type="submit"
        disabled={!isValid || submitting}
        className="w-full bg-gradient-to-r from-[#14b8a6] to-[#4ade80] font-bold text-lg shadow-lg hover:from-[#0f8f8a] hover:to-[#3ac66a] transition-transform transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </motion.form>
  );
}