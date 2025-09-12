// /data/products.ts

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;          // URL ảnh đại diện danh mục
  productCount: number;   // Số lượng sản phẩm trong danh mục
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  imageUrl: string;       // URL ảnh sản phẩm
  stock: number;          // Số lượng tồn kho
  rating?: number;        // Đánh giá (1-5)
  createdAt: string;      // Ngày tạo (ISO string)
  updatedAt?: string;     // Ngày cập nhật (ISO string)
}

// Danh sách categories mẫu
export const categories: Category[] = [
  {
    id: 'cat1',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices.',
    image: '/images/categories/electronics.jpg',
    productCount: 12,
  },
  {
    id: 'cat2',
    name: 'Books',
    description: 'Wide range of books from all genres.',
    image: '/images/categories/books.jpg',
    productCount: 8,
  },
  {
    id: 'cat3',
    name: 'Clothing',
    description: 'Fashionable and comfortable clothing.',
    image: '/images/categories/clothing.jpg',
    productCount: 15,
  },
  // Thêm danh mục khác nếu cần
];

// Danh sách sản phẩm mẫu
export const products: Product[] = [
  {
    id: 'prod1',
    name: 'Wireless Headphones',
    description: 'High quality wireless headphones with noise cancellation.',
    categoryId: 'cat1',
    price: 99.99,
    imageUrl: '/images/products/wireless-headphones.jpg',
    stock: 25,
    rating: 4.5,
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-03-01T12:00:00Z',
  },
  {
    id: 'prod2',
    name: 'Smartphone XYZ',
    description: 'Latest smartphone with advanced features and great camera.',
    categoryId: 'cat1',
    price: 699.99,
    imageUrl: '/images/products/smartphone-xyz.jpg',
    stock: 10,
    rating: 4.7,
    createdAt: '2023-02-10T09:30:00Z',
  },
  {
    id: 'prod3',
    name: 'Modern JavaScript Book',
    description: 'Comprehensive guide to modern JavaScript programming.',
    categoryId: 'cat2',
    price: 29.99,
    imageUrl: '/images/products/js-book.jpg',
    stock: 50,
    rating: 4.9,
    createdAt: '2022-12-05T08:00:00Z',
  },
  {
    id: 'prod4',
    name: 'Men\'s Casual Shirt',
    description: 'Comfortable and stylish casual shirt for men.',
    categoryId: 'cat3',
    price: 39.99,
    imageUrl: '/images/products/mens-casual-shirt.jpg',
    stock: 40,
    rating: 4.2,
    createdAt: '2023-01-20T11:15:00Z',
  },
  {
    id: 'prod5',
    name: 'Women\'s Running Shoes',
    description: 'Lightweight and durable running shoes for women.',
    categoryId: 'cat3',
    price: 59.99,
    imageUrl: '/images/products/womens-running-shoes.jpg',
    stock: 30,
    rating: 4.6,
    createdAt: '2023-02-25T14:45:00Z',
  },
  // Thêm sản phẩm khác nếu cần
];