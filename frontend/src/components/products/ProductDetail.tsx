import React from 'react';
import useFeedbacks from '@/hooks/useFeedbacks';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import FeedbackCard from '@/components/feedback/FeedbackCard';
import { Product } from '@/hooks/useProducts';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { feedbacks, loading, addFeedback } = useFeedbacks(product.id);

  const handleAddFeedback = async (rating: number, comment: string, email: string) => {
    return await addFeedback({ product_id: product.id, rating, comment, user_email: email });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {product.image_url && (
          <img src={product.image_url} alt={product.name} className="w-full md:w-1/3 rounded" />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-primary font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Customer Feedback</h2>
        <FeedbackForm productId={product.id} onAddFeedback={handleAddFeedback} />
        {loading ? (
          <p>Loading feedbacks...</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedbacks yet.</p>
        ) : (
          feedbacks.map((fb) => <FeedbackCard key={fb.id} feedback={fb} />)
        )}
      </section>
    </div>
  );
};

export default ProductDetail;