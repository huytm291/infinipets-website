import FeedbackCard from './feedback/FeedbackCard';
import { motion } from 'framer-motion';
 
export interface Testimonial {
  id: number;
  name: string;
  location?: string;
  text: string;
  rating: number;
  image?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section
      aria-label="Customer testimonials"
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <motion.h2
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent select-none"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
          >
            Real feedback from our valued customers who love INFINIPETS.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {testimonials.map((t) => (
            <FeedbackCard key={t.id} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
