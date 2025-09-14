import React from 'react';
import useCategories from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
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
import { Category } from '@/types/database';

interface CategoryListProps {
  selectedCategoryId?: string;
  onSelectCategory: (id: string | null) => void;
  onAddCategory?: () => void;
  onEditCategory?: (category: Category) => void;
  showActions?: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  selectedCategoryId, 
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  showActions = false
}) => {
  const { categories, loading, deleteCategory } = useCategories();

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-wrap gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        {/* All Categories button */}
        <Button
          variant={!selectedCategoryId ? "default" : "outline"}
          className={`px-4 py-2 rounded-md border transition-colors ${
            !selectedCategoryId 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-white text-primary border-primary hover:bg-primary/10'
          }`}
          onClick={() => onSelectCategory(null)}
        >
          All Categories
        </Button>

        {/* Category buttons */}
        {categories.map((cat) => (
          <div key={cat.id} className="relative group">
            <Button
              variant={selectedCategoryId === cat.id ? "default" : "outline"}
              className={`px-4 py-2 rounded-md border transition-colors ${
                selectedCategoryId === cat.id 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-white text-primary border-primary hover:bg-primary/10'
              }`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.name}
            </Button>

            {/* Admin actions */}
            {showActions && (
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditCategory?.(cat);
                  }}
                >
                  <Edit size={12} />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Category</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{cat.name}"? This action cannot be undone and will affect all products in this category.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        ))}

        {/* Add Category button */}
        {showActions && onAddCategory && (
          <Button
            variant="outline"
            className="px-4 py-2 rounded-md border border-dashed border-primary text-primary hover:bg-primary/10"
            onClick={onAddCategory}
          >
            <Plus size={16} className="mr-2" />
            Add Category
          </Button>
        )}
      </div>

      {/* Category descriptions */}
      {selectedCategoryId && (
        <div className="mt-4">
          {categories
            .filter(cat => cat.id === selectedCategoryId)
            .map(cat => cat.description && (
              <p key={cat.id} className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                {cat.description}
              </p>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default CategoryList;