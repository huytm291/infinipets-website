import { useState, useEffect } from 'react'
import { supabase, handleSupabaseError } from '@/lib/supabase'
import { Product, ProductInsert, ProductUpdate } from '@/types/database'
import { toast } from 'sonner'

export default function useProducts(categoryId?: string, searchTerm?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      }

      const { data, error } = await query

      if (error) {
        handleSupabaseError(error)
      }

      setProducts(data || [])
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  // Add product
  const addProduct = async (product: ProductInsert): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single()

      if (error) {
        handleSupabaseError(error)
      }

      if (data) {
        setProducts(prev => [data, ...prev])
        toast.success('Product added successfully')
        return data
      }
      return null
    } catch (err: unknown) {
      toast.error('Failed to add product')
      throw err
    }
  }

  // Update product
  const updateProduct = async (id: string, updates: ProductUpdate): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        handleSupabaseError(error)
      }

      if (data) {
        setProducts(prev => prev.map(product => product.id === id ? data : product))
        toast.success('Product updated successfully')
        return data
      }
      return null
    } catch (err: unknown) {
      toast.error('Failed to update product')
      throw err
    }
  }

  // Delete product
  const deleteProduct = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) {
        handleSupabaseError(error)
      }

      setProducts(prev => prev.filter(product => product.id !== id))
      toast.success('Product deleted successfully')
    } catch (err: unknown) {
      toast.error('Failed to delete product')
      throw err
    }
  }

  // Get single product
  const getProduct = async (id: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        handleSupabaseError(error)
      }

      return data
    } catch (err: unknown) {
      toast.error('Failed to load product')
      return null
    }
  }

  // Real-time subscription
  useEffect(() => {
    fetchProducts()

    const subscription = supabase
      .channel('products_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setProducts(prev => [payload.new as Product, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setProducts(prev => 
              prev.map(product => product.id === payload.new.id ? payload.new as Product : product)
            )
          } else if (payload.eventType === 'DELETE') {
            setProducts(prev => prev.filter(product => product.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [categoryId, searchTerm])

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    refetch: fetchProducts,
  }
}

// Export the Product type for compatibility
export type { Product }