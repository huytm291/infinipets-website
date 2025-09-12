import { Heart, ShoppingBag, Calendar } from 'lucide-react';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onFavorite: (productId: string) => void;
  isFavorited: boolean;
  className?: string;
}

export default function ProductCard({ product, onFavorite, isFavorited, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} has been added to your cart!`, {
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart'),
      },
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Format ngày tạo sản phẩm (nếu có)
  const formattedDate = product.created_at
    ? new Date(product.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900',
        className
      )}
    >
      {/* Image container */}
      <div className="aspect-square overflow-hidden rounded-t-3xl relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
          draggable={false}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorite(product.id);
        }}
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        className={cn(
          'absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-md shadow-md transition-colors duration-300 hover:bg-pink-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 z-20',
          isFavorited ? 'text-pink-500' : 'text-white'
        )}
      >
        <Heart size={22} fill={isFavorited ? 'currentColor' : 'none'} strokeWidth={2} />
      </button>

      {/* Content */}
      <div className="p-5 bg-gradient-to-b from-transparent to-black/80 rounded-b-3xl text-white relative z-10">
        <h3 className="font-extrabold text-lg truncate">{product.name}</h3>

        {/* Ngày tạo sản phẩm */}
        {formattedDate && (
          <div className="flex items-center text-sm text-gray-300 mt-1 space-x-1 select-none">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold tracking-wide">€{product.price.toFixed(2)}</p>

          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="p-3 rounded-full bg-gradient-to-r from-[#14b8a6] to-[#4ade80] shadow-lg hover:from-[#0f8f8a] hover:to-[#3ac66a] transition-transform transform scale-90 group-hover:scale-100 focus:outline-none focus:ring-4 focus:ring-[#4ade80]/60"
          >
            <ShoppingBag size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}