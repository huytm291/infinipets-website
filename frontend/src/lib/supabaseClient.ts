import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined in the .env.local file")
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Gọi Edge Function OpenAI chatbot
 * @param prompt Chuỗi câu hỏi hoặc yêu cầu gửi đến OpenAI
 * @returns Kết quả trả về từ Edge Function
 */
export async function callOpenAIFunction(prompt: string) {
  const res = await fetch(`https://${supabaseUrl.replace('https://', '')}.functions.supabase.co/openai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to call OpenAI function: ${errorText}`)
  }

  return await res.json()
}

/**
 * Verify token reCAPTCHA qua Edge Function
 * @param token Token reCAPTCHA lấy từ frontend
 * @returns Kết quả verify từ Edge Function
 */
export async function verifyRecaptcha(token: string) {
  const res = await fetch(`https://${supabaseUrl.replace('https://', '')}.functions.supabase.co/recaptcha-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to verify reCAPTCHA: ${errorText}`)
  }

  return await res.json()
}

/**
 * Upload ảnh sản phẩm lên Supabase Storage và cập nhật URL ảnh trong bảng 'products'
 * @param productId ID sản phẩm cần cập nhật
 * @param file File ảnh (từ input file)
 * @returns URL public của ảnh mới hoặc lỗi
 */
export async function updateProductImage(productId: string, file: File) {
  // Tạo tên file duy nhất, ví dụ: productId-timestamp.ext
  const ext = file.name.split('.').pop()
  const fileName = `${productId}-${Date.now()}.${ext}`

  // Upload file vào bucket 'product-images' (bạn tạo bucket này trong Supabase Storage)
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: true })

  if (uploadError) {
    throw new Error(`Upload image failed: ${uploadError.message}`)
  }

  // Lấy URL public của ảnh
  const { publicURL, error: urlError } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  if (urlError) {
    throw new Error(`Get public URL failed: ${urlError.message}`)
  }

  // Cập nhật URL ảnh trong bảng 'products'
  const { error: updateError } = await supabase
    .from('products')
    .update({ image_url: publicURL })
    .eq('id', productId)

  if (updateError) {
    throw new Error(`Update product image URL failed: ${updateError.message}`)
  }

  return publicURL
}