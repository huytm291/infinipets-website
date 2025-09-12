import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { featuredProducts } from '../data/products'; // Dùng dữ liệu tạm, sau này sẽ fetch từ API
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { ChevronLeft, Star, Plus, Minus } from 'lucide-react';

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
        <Button onClick={() => navigate('/products')} className="mt-4">Back to Shop</Button>
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
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden shadow-lg mb-4">
            <img src={mainImage || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setMainImage(img)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${mainImage === img || (!mainImage && index === 0) ? 'border-teal-500' : 'border-transparent'}`}>
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-coiny mb-4">{product.name}</h1>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor"/>)}
            </div>
            <span className="text-sm text-gray-500">(125 reviews)</span>
          </div>
          <p className="text-3xl font-bold mb-6">€{product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{product.description}</p>
          
          <div className="flex items-center space-x-4 mb-8">
            <p className="font-semibold">Quantity:</p>
            <div className="flex items-center border rounded-full">
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus size={16} />
              </Button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setQuantity(q => q + 1)}>
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <Button onClick={handleAddToCart} size="lg" className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-lg font-bold">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

