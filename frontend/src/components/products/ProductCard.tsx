import { Heart, ShoppingBag, Calendar, Edit, Trash2 } from 'lucide-react';
import { Product } from '@/types/database';
import { cn } from '@/lib/utils';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ProductCardProps {
  product: Product;
  onFavorite?: (productId: string) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  isFavorited?: boolean;
  showActions?: boolean;
  className?: string;
}

export default function ProductCard({ 
  product, 
  onFavorite, 
  onEdit,
  onDelete,
  isFavorited = false, 
  showActions = false,
  className 
}: ProductCardProps) {
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

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(product.id);
  };

  // Format creation date
  const formattedDate = product.created_at
    ? new Date(product.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  // Handle image URL
  const imageUrl = product.image_url || '/default-product-image.jpg';

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
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
          draggable={false}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        {/* Favorite button */}
        {onFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(product.id);
            }}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            className={cn(
              'p-3 rounded-full bg-white/20 backdrop-blur-md shadow-md transition-colors duration-300 hover:bg-pink-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400',
              isFavorited ? 'text-pink-500' : 'text-white'
            )}
          >
            <Heart size={22} fill={isFavorited ? 'currentColor' : 'none'} strokeWidth={2} />
          </button>
        )}

        {/* Admin actions */}
        {showActions && (
          <>
            <button
              onClick={handleEdit}
              aria-label="Edit product"
              className="p-3 rounded-full bg-white/20 backdrop-blur-md shadow-md transition-colors duration-300 hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            >
              <Edit size={22} strokeWidth={2} />
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Delete product"
                  className="p-3 rounded-full bg-white/20 backdrop-blur-md shadow-md transition-colors duration-300 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 text-white"
                >
                  <Trash2 size={22} strokeWidth={2} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{product.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>

      {/* Stock indicator */}
      {product.stock !== null && product.stock <= 5 && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
            {product.stock === 0 ? 'Out of Stock' : `Only ${product.stock} left`}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 bg-gradient-to-b from-transparent to-black/80 rounded-b-3xl text-white relative z-10">
        <h3 className="font-extrabold text-lg truncate">{product.name}</h3>
        
        {/* Description preview */}
        {product.description && (
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">{product.description}</p>
        )}

        {/* Creation date */}
        {formattedDate && (
          <div className="flex items-center text-sm text-gray-300 mt-1 space-x-1 select-none">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-600'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-300 ml-2">({product.rating.toFixed(1)})</span>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold tracking-wide">€{product.price.toFixed(2)}</p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label="Add to cart"
            className="p-3 rounded-full bg-gradient-to-r from-[#14b8a6] to-[#4ade80] shadow-lg hover:from-[#0f8f8a] hover:to-[#3ac66a] transition-transform transform scale-90 group-hover:scale-100 focus:outline-none focus:ring-4 focus:ring-[#4ade80]/60 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}