import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/data/products"; // Sau này sẽ fetch từ Supabase

export default function ProductsPage() {

  const handleFavorite = (productId: string) => {
    console.log(`Toggled favorite for product: ${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
          Our Collection
        </h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Explore our full range of luxury fashion for you and your pet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onFavorite={handleFavorite}
            isFavorited={false} // Sẽ cập nhật sau
          />
        ))}
        {/* Bạn có thể nhân đôi danh sách để hiển thị nhiều sản phẩm hơn */}
        {featuredProducts.map((product) => (
          <ProductCard
            key={`${product.id}-clone`}
            product={{...product, id: `${product.id}-clone`}}
            onFavorite={handleFavorite}
            isFavorited={false}
          />
        ))}
      </div>
    </div>
  );
}