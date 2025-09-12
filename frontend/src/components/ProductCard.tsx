import { useState } from 'react';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onFavorite: (productId: string) => void;
  isFavorited: boolean;
}

const ProductCard = ({ product, onFavorite, isFavorited }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(product.id);
    
    // Hiệu ứng heartBeat từ index.html
    const heartButton = e.currentTarget as HTMLElement;
    heartButton.style.animation = 'heartBeat 0.8s ease';
    
    // Create sparkle effect
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
    }));
    
    setSparkles(newSparkles);
    setTimeout(() => {
      setSparkles([]);
      heartButton.style.animation = '';
    }, 800);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <style jsx>{`
        @keyframes heartBeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }
        
        @keyframes sparkleFloat {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          50% {
            opacity: 1;
            transform: translate(var(--x), var(--y)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(calc(var(--x) * 1.5), calc(var(--y) * 1.5)) scale(0);
          }
        }
        
        .sparkle {
          animation: sparkleFloat 0.8s ease-out forwards;
        }
      `}</style>
      
      <div 
        className="group relative bg-white rounded-xl shadow-sm hover-lift card-hover overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center space-x-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={() => setShowQuickView(true)}
              className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
            >
              <Eye size={20} />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
              <ShoppingCart size={20} />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isLimited && (
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                LIMITED
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                FEATURED
              </span>
            )}
          </div>

          {/* Favorite Button với hiệu ứng từ index.html */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-400 transform hover:scale-120 hover:rotate-15 ${
              isFavorited 
                ? 'bg-red-400 text-white shadow-lg' 
                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-400 hover:text-white'
            }`}
            style={{
              boxShadow: isFavorited ? '0 8px 25px rgba(255, 106, 106, 0.6)' : '0 4px 15px rgba(0,0,0,0.1)'
            }}
          >
            <Heart 
              size={18} 
              className={isFavorited ? 'fill-current' : ''} 
            />
          </button>

          {/* Sparkle Effects */}
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute top-3 right-3 pointer-events-none sparkle"
              style={{
                '--x': `${sparkle.x}px`,
                '--y': `${sparkle.y}px`,
              } as React.CSSProperties}
            >
              <div className="text-red-400 text-lg">✨</div>
            </div>
          ))}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews})
            </span>
          </div>

          {/* Price and Sizes */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                €{product.price}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                {product.currency}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {product.sizes.length > 1 
                ? `${product.sizes.length} sizes` 
                : product.sizes[0]
              }
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <button
                  onClick={() => setShowQuickView(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>
                
                <div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold">€{product.price}</span>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Size:</label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className="px-3 py-2 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 btn-primary">
                      Add to Cart
                    </button>
                    <button
                      onClick={handleFavoriteClick}
                      className={`p-3 rounded-lg border transition-colors ${
                        isFavorited 
                          ? 'bg-pink-500 text-white border-pink-500' 
                          : 'border-gray-300 hover:border-pink-500'
                      }`}
                    >
                      <Heart size={20} className={isFavorited ? 'fill-current' : ''} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;