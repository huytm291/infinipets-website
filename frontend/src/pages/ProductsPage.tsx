import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search, Settings } from 'lucide-react';
import CategoryList from '@/components/products/CategoryList';
import ProductList from '@/components/products/ProductList';
import ProductForm from '@/components/products/ProductForm';
import CategoryForm from '@/components/products/CategoryForm';
import useProducts from '@/hooks/useProducts';
import useCategories from '@/hooks/useCategories';
import { Product, Category, ProductInsert, ProductUpdate, CategoryInsert, CategoryUpdate } from '@/types/database';
import { toast } from 'sonner';

const ProductsPage: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { addProduct, updateProduct, deleteProduct } = useProducts();
  const { addCategory, updateCategory } = useCategories();

  // Handle product operations
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleProductSubmit = async (data: ProductInsert | ProductUpdate) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data as ProductUpdate);
      } else {
        await addProduct(data as ProductInsert);
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  // Handle category operations
  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleCategorySubmit = async (data: CategoryInsert | CategoryUpdate) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, data as CategoryUpdate);
      } else {
        await addCategory(data as CategoryInsert);
      }
      setShowCategoryForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  // Handle favorites
  const handleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast.success(
      favorites.includes(productId) 
        ? 'Removed from favorites' 
        : 'Added to favorites'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Products
              </h1>
              <p className="text-gray-600 mt-2">Discover our amazing collection</p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="flex items-center gap-2"
              >
                <Settings size={16} />
                {isAdminMode ? 'Exit Admin' : 'Admin Mode'}
              </Button>
              
              {isAdminMode && (
                <Button onClick={handleAddProduct} className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Product
                </Button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <CategoryList
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onAddCategory={isAdminMode ? handleAddCategory : undefined}
          onEditCategory={isAdminMode ? handleEditCategory : undefined}
          showActions={isAdminMode}
        />

        {/* Products */}
        <ProductList
          categoryId={selectedCategoryId || undefined}
          searchTerm={searchTerm}
          onFavorite={handleFavorite}
          onEditProduct={isAdminMode ? handleEditProduct : undefined}
          onDeleteProduct={isAdminMode ? handleDeleteProduct : undefined}
          favorites={favorites}
          showActions={isAdminMode}
        />

        {/* Product Form Dialog */}
        <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct || undefined}
              onSubmit={handleProductSubmit}
              onCancel={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Category Form Dialog */}
        <Dialog open={showCategoryForm} onOpenChange={setShowCategoryForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              category={editingCategory || undefined}
              onSubmit={handleCategorySubmit}
              onCancel={() => {
                setShowCategoryForm(false);
                setEditingCategory(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductsPage;