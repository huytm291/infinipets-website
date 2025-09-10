export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  isLimited?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviews: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 'everyday',
    name: 'Everyday Pet Apparel',
    description: 'Comfortable daily wear for your beloved pets',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
    productCount: 24
  },
  {
    id: 'cosplay',
    name: 'Cosplay & Gala Costumes',
    description: 'Transform your pet into their favorite character',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=300&fit=crop',
    productCount: 18
  },
  {
    id: 'limited',
    name: 'Limited Edition Collections',
    description: 'Exclusive themed collections for the discerning pet owner',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    productCount: 12
  },
  {
    id: 'meme',
    name: 'Meme & Trending Outfits',
    description: 'Stay current with the latest pet fashion trends',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    productCount: 15
  },
  {
    id: 'handmade',
    name: 'Handmade & Custom Designs',
    description: 'Artisanal pieces crafted with love and attention to detail',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
    productCount: 20
  },
  {
    id: 'accessories',
    name: 'Accessories & Toys',
    description: 'Complete your pet\'s look with our premium accessories',
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=300&fit=crop',
    productCount: 32
  }
];

export const products: Product[] = [
  // Everyday Pet Apparel
  {
    id: 'ea001',
    name: 'Cozy Knit Sweater',
    price: 34.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop'
    ],
    category: 'everyday',
    description: 'Ultra-soft merino wool blend sweater perfect for chilly European winters. Hand-knitted with love.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Forest Green', 'Burgundy'],
    rating: 4.8,
    reviews: 127,
    tags: ['warm', 'winter', 'comfortable'],
    isFeatured: true
  },
  {
    id: 'ea002',
    name: 'Waterproof Rain Jacket',
    price: 42.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=600&fit=crop'
    ],
    category: 'everyday',
    description: 'Keep your furry friend dry during those unpredictable European showers.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Bright Yellow', 'Ocean Blue', 'Forest Green'],
    rating: 4.6,
    reviews: 89,
    tags: ['waterproof', 'practical', 'outdoor']
  },
  {
    id: 'ea003',
    name: 'Classic Denim Jacket',
    price: 38.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop'
    ],
    category: 'everyday',
    description: 'Timeless denim jacket with vintage-inspired details and comfortable fit.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Classic Blue', 'Black Wash'],
    rating: 4.7,
    reviews: 156,
    tags: ['classic', 'denim', 'versatile']
  },
  {
    id: 'ea004',
    name: 'Striped Cotton T-Shirt',
    price: 24.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop'
    ],
    category: 'everyday',
    description: 'Breathable organic cotton tee with playful stripes.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Navy & White', 'Red & White', 'Green & White'],
    rating: 4.5,
    reviews: 203,
    tags: ['cotton', 'breathable', 'casual']
  },
  {
    id: 'ea005',
    name: 'Checkered Bandana',
    price: 16.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&h=600&fit=crop'
    ],
    category: 'everyday',
    description: 'Classic checkered bandana made from premium cotton.',
    sizes: ['One Size'],
    colors: ['Red Check', 'Blue Check', 'Green Check'],
    rating: 4.9,
    reviews: 312,
    tags: ['bandana', 'classic', 'accessories']
  },

  // Cosplay & Gala Costumes
  {
    id: 'cg001',
    name: 'Superhero Cape Set',
    price: 49.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=600&fit=crop'
    ],
    category: 'cosplay',
    description: 'Transform your pet into a superhero with this complete cape and mask set.',
    sizes: ['S', 'M', 'L'],
    colors: ['Classic Red', 'Midnight Blue', 'Forest Green'],
    rating: 4.8,
    reviews: 94,
    tags: ['superhero', 'cape', 'costume'],
    isFeatured: true
  },
  {
    id: 'cg002',
    name: 'Elegant Tuxedo',
    price: 67.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop'
    ],
    category: 'cosplay',
    description: 'Formal tuxedo perfect for special occasions and photo shoots.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Classic Black', 'Navy Blue'],
    rating: 4.9,
    reviews: 67,
    tags: ['formal', 'tuxedo', 'elegant']
  },
  {
    id: 'cg003',
    name: 'Mystical Wizard Robe',
    price: 54.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop'
    ],
    category: 'cosplay',
    description: 'Enchanting wizard robe with star patterns and mystical details.',
    sizes: ['S', 'M', 'L'],
    colors: ['Midnight Purple', 'Deep Blue', 'Forest Green'],
    rating: 4.7,
    reviews: 82,
    tags: ['wizard', 'mystical', 'fantasy']
  },
  {
    id: 'cg004',
    name: 'Princess Gown',
    price: 72.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop'
    ],
    category: 'cosplay',
    description: 'Luxurious princess gown with tulle layers and sparkly details.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rose Pink', 'Lavender', 'Champagne Gold'],
    rating: 4.8,
    reviews: 115,
    tags: ['princess', 'gown', 'luxury']
  },
  {
    id: 'cg005',
    name: 'Dinosaur Costume',
    price: 45.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop'
    ],
    category: 'cosplay',
    description: 'Adorable dinosaur costume that will make your pet roar with style.',
    sizes: ['S', 'M', 'L'],
    colors: ['Forest Green', 'Royal Blue', 'Sunset Orange'],
    rating: 4.6,
    reviews: 178,
    tags: ['dinosaur', 'fun', 'costume']
  },

  // Limited Edition Collections
  {
    id: 'le001',
    name: 'Forest Explorer Set',
    price: 89.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&h=600&fit=crop'
    ],
    category: 'limited',
    description: 'Complete forest explorer collection with camouflage vest and adventure accessories.',
    sizes: ['S', 'M', 'L'],
    colors: ['Forest Camo', 'Desert Camo'],
    rating: 4.9,
    reviews: 45,
    tags: ['explorer', 'adventure', 'limited'],
    isLimited: true,
    isFeatured: true
  },
  {
    id: 'le002',
    name: 'Space Voyager Suit',
    price: 94.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=600&fit=crop'
    ],
    category: 'limited',
    description: 'Out-of-this-world astronaut suit for the most adventurous pets.',
    sizes: ['S', 'M', 'L'],
    colors: ['Space Silver', 'Galaxy Black'],
    rating: 4.8,
    reviews: 38,
    tags: ['space', 'astronaut', 'limited'],
    isLimited: true
  },

  // Accessories & Toys
  {
    id: 'at001',
    name: 'Personalized Leather Collar',
    price: 28.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop'
    ],
    category: 'accessories',
    description: 'Premium leather collar with custom name engraving.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Classic Brown', 'Black', 'Tan'],
    rating: 4.9,
    reviews: 267,
    tags: ['collar', 'leather', 'personalized'],
    isFeatured: true
  },
  {
    id: 'at002',
    name: 'Reflective Braided Leash',
    price: 32.99,
    currency: 'EUR',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop'
    ],
    category: 'accessories',
    description: 'Safety-first braided leash with reflective elements for evening walks.',
    sizes: ['4ft', '6ft'],
    colors: ['Neon Green', 'Bright Orange', 'Electric Blue'],
    rating: 4.7,
    reviews: 189,
    tags: ['leash', 'safety', 'reflective']
  }
];

export const featuredProducts = products.filter(product => product.isFeatured);
export const limitedProducts = products.filter(product => product.isLimited);