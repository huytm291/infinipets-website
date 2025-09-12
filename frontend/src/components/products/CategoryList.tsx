import React from 'react';
import useCategories from '@/hooks/useCategories';

interface CategoryListProps {
  selectedCategoryId?: string;
  onSelectCategory: (id: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategoryId, onSelectCategory }) => {
  const { categories, loading } = useCategories();

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <button
        className={`px-4 py-2 rounded-md border ${
          !selectedCategoryId ? 'bg-primary text-white' : 'bg-white text-primary border-primary'
        } transition-colors`}
        onClick={() => onSelectCategory(null)}
      >
        All Categories
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`px-4 py-2 rounded-md border ${
            selectedCategoryId === cat.id ? 'bg-primary text-white' : 'bg-white text-primary border-primary'
          } transition-colors`}
          onClick={() => onSelectCategory(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;