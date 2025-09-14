import { useState, useEffect } from 'react'
import { supabase, handleSupabaseError } from '@/lib/supabase'
import { Category, CategoryInsert, CategoryUpdate } from '@/types/database'
import { toast } from 'sonner'

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        handleSupabaseError(error)
      }

      setCategories(data || [])
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  // Add category
  const addCategory = async (category: CategoryInsert): Promise<Category | null> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select()
        .single()

      if (error) {
        handleSupabaseError(error)
      }

      if (data) {
        setCategories(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)))
        toast.success('Category added successfully')
        return data
      }
      return null
    } catch (err: unknown) {
      toast.error('Failed to add category')
      throw err
    }
  }

  // Update category
  const updateCategory = async (id: string, updates: CategoryUpdate): Promise<Category | null> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        handleSupabaseError(error)
      }

      if (data) {
        setCategories(prev => 
          prev.map(cat => cat.id === id ? data : cat)
            .sort((a, b) => a.name.localeCompare(b.name))
        )
        toast.success('Category updated successfully')
        return data
      }
      return null
    } catch (err: unknown) {
      toast.error('Failed to update category')
      throw err
    }
  }

  // Delete category
  const deleteCategory = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) {
        handleSupabaseError(error)
      }

      setCategories(prev => prev.filter(cat => cat.id !== id))
      toast.success('Category deleted successfully')
    } catch (err: unknown) {
      toast.error('Failed to delete category')
      throw err
    }
  }

  // Real-time subscription
  useEffect(() => {
    fetchCategories()

    const subscription = supabase
      .channel('categories_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'categories' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setCategories(prev => [...prev, payload.new as Category]
              .sort((a, b) => a.name.localeCompare(b.name)))
          } else if (payload.eventType === 'UPDATE') {
            setCategories(prev => 
              prev.map(cat => cat.id === payload.new.id ? payload.new as Category : cat)
                .sort((a, b) => a.name.localeCompare(b.name))
            )
          } else if (payload.eventType === 'DELETE') {
            setCategories(prev => prev.filter(cat => cat.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    refetch: fetchCategories,
  }
}