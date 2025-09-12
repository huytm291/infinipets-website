import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { useCart } from '../contexts/CartContext'; // Import hook giỏ hàng
import { toast } from 'sonner'; // Import toast để thông báo
import { useNavigate } from 'react-router-dom'; // Import hook điều hướng

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
    e.stopPropagation(); // Ngăn không cho sự kiện click lan ra thẻ cha
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

  return (
    <div 
      onClick={handleCardClick}
      className={cn('group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer', className)}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="absolute top-3 right-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(product.id);
          }}
          className={cn(
            'p-2 rounded-full bg-white/20 backdrop-blur-sm transition-colors',
            isFavorited ? 'text-red-500' : 'text-white'
          )}
        >
          <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-lg truncate">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-semibold">€{product.price}</p>
          <button 
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-teal-500 hover:bg-teal-400 transition-colors transform group-hover:opacity-100 group-hover:translate-x-0 opacity-0 -translate-x-4 duration-300"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

