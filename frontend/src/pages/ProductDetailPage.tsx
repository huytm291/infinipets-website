import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { featuredProducts } from '../data/products'; // Dữ liệu tạm, sau này fetch API
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { ChevronLeft, Star, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const product = featuredProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found!</h2>
        <Button onClick={() => navigate('/products')} className="mt-4">
          Back to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to your cart!`, {
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart'),
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
      >
        <ChevronLeft className="mr-2 h-5 w-5" />
        Back
      </Button>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl mb-6 relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImage || product.images[0]}
                src={mainImage || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-3xl select-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                draggable={false}
              />
            </AnimatePresence>
          </div>
          <div className="flex space-x-3">
            {product.images.map((img, index) => {
              const isSelected = mainImage === img || (!mainImage && index === 0);
              return (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                    isSelected ? 'border-teal-500 shadow-lg' : 'border-transparent hover:border-teal-400'
                  }`}
                  aria-label={`Select image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl select-none"
                    draggable={false}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-coiny font-extrabold mb-6 text-gray-900 dark:text-gray-100">
            {product.name}
          </h1>
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="currentColor" strokeWidth={1.5} />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">(125 reviews)</span>
          </div>
          <p className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">€{product.price.toFixed(2)}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">{product.description}</p>

          <div className="flex items-center space-x-5 mb-10">
            <p className="font-semibold text-lg text-gray-900 dark:text-gray-100 select-none">Quantity:</p>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-none rounded-l-full p-2 text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={18} />
              </Button>
              <span className="w-14 text-center font-bold text-lg text-gray-900 dark:text-gray-100 select-none">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-none rounded-r-full p-2 text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full bg-gradient-to-r from-[#14b8a6] to-[#4ade80] text-lg font-bold shadow-lg hover:from-[#0f8f8a] hover:to-[#3ac66a] transition-transform transform hover:scale-105"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}