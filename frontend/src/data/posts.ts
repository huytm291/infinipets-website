export interface Post {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  slug: string;
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Luxury Pet Fashion',
    excerpt:
      'Discover the latest trends and tips to keep your pet stylish and comfortable with our ultimate guide to luxury pet fashion.',
    coverImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2024-05-01T10:00:00Z',
    slug: 'ultimate-guide-luxury-pet-fashion',
  },
  {
    id: '2',
    title: 'How to Choose the Perfect Outfit for Your Pet',
    excerpt:
      'Choosing the right outfit for your pet can be tricky. Learn how to pick styles that suit your pet’s personality and needs.',
    coverImage: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2024-04-15T12:00:00Z',
    slug: 'choose-perfect-outfit-pet',
  },
  {
    id: '3',
    title: 'Sustainable Pet Fashion: Eco-Friendly Choices',
    excerpt:
      'Explore sustainable and eco-friendly pet fashion options that help protect the planet while keeping your pet trendy.',
    coverImage: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2024-03-20T09:30:00Z',
    slug: 'sustainable-pet-fashion',
  },
];