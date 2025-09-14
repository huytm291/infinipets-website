import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined in environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: Error | unknown) => {
  console.error('Supabase Error:', error)
  if (error && typeof error === 'object' && 'message' in error) {
    throw new Error((error as Error).message)
  }
  throw new Error('An unexpected error occurred')
}

// Upload image to Supabase Storage
export const uploadImage = async (
  bucket: string,
  file: File,
  path?: string
): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const fileName = path || `${Date.now()}-${Math.random()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    handleSupabaseError(error)
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return publicUrl
}

// Delete image from Supabase Storage
export const deleteImage = async (bucket: string, path: string) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    handleSupabaseError(error)
  }
}

// Get image URL from path
export const getImageUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}