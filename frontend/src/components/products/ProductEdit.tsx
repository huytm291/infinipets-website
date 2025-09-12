import React, { useState, useEffect } from 'react';
import { supabase, updateProductImage } from '../../lib/supabaseClient';

interface Category {
  id: string;
  name: string;
}

interface ProductEditProps {
  productId: string;
  onSaveSuccess?: () => void;
}

export default function ProductEdit({ productId, onSaveSuccess }: ProductEditProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Lấy dữ liệu sản phẩm khi component mount
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('name, description, category_id, image_url')
          .eq('id', productId)
          .single();

        if (error) throw error;

        setName(data.name);
        setDescription(data.description);
        setCategoryId(data.category_id);
        setImageUrl(data.image_url);
      } catch (err: any) {
        setError(err.message || 'Failed to load product data');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  // Lấy danh sách categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase.from('categories').select('id, name');
        if (error) throw error;
        setCategories(data);
      } catch (err: any) {
        console.error('Failed to load categories:', err.message);
      }
    }
    fetchCategories();
  }, []);

  // Xử lý chọn file ảnh mới
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      let newImageUrl = imageUrl;

      // Nếu có file ảnh mới, upload và cập nhật URL
      if (selectedFile) {
        newImageUrl = await updateProductImage(productId, selectedFile);
        setImageUrl(newImageUrl);
      }

      // Cập nhật các trường khác của sản phẩm
      const { error } = await supabase
        .from('products')
        .update({
          name,
          description,
          category_id: categoryId,
          image_url: newImageUrl,
        })
        .eq('id', productId);

      if (error) throw error;

      setSuccessMessage('Product updated successfully!');
      onSaveSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Product</h2>

      {loading && <p className="text-blue-600 mb-2">Loading...</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            id="category"
            value={categoryId || ''}
            onChange={e => setCategoryId(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={loading}
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Product Image</label>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Product"
              className="mb-2 w-48 h-48 object-cover rounded-md border border-gray-300 dark:border-gray-600"
            />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-500 to-green-400 text-white py-3 rounded-md hover:shadow-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}