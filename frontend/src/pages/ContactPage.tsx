import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    try {
      // Gửi dữ liệu lên backend hoặc API
      await new Promise((r) => setTimeout(r, 1500));
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-coiny text-5xl mb-12 text-center bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none"
        >
          Contact Us
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <div className="mb-6">
            <Label htmlFor="name" className="font-semibold text-gray-800 dark:text-gray-200">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              disabled={submitting}
              required
              className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="email" className="font-semibold text-gray-800 dark:text-gray-200">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={submitting}
              required
              className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
            />
          </div>

          <div className="mb-8">
            <Label htmlFor="message" className="font-semibold text-gray-800 dark:text-gray-200">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={5}
              disabled={submitting}
              required
              className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
            />
          </div>

          <Button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full bg-gradient-to-r from-[#14b8a6] to-[#4ade80] font-bold text-lg shadow-lg hover:from-[#0f8f8a] hover:to-[#3ac66a] transition-transform transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </Button>
        </motion.form>
      </div>
    </main>
  );
}