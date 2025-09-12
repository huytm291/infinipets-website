export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string; // ISO date string
  coverImage: string;
  tags?: string[];
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Our Product',
    slug: 'getting-started-with-our-product',
    excerpt: 'Learn how to quickly get started with our product and make the most out of its features.',
    content: `
      <p>Welcome to our product! This guide will help you get started quickly and easily.</p>
      <h2>Installation</h2>
      <p>First, install the product by following these steps...</p>
      <h2>Basic Usage</h2>
      <p>Once installed, you can start by...</p>
    `,
    author: 'Jane Doe',
    publishedAt: '2023-08-01T10:00:00Z',
    coverImage: '/images/posts/getting-started.jpg',
    tags: ['Getting Started', 'Tutorial', 'Product'],
  },
  {
    id: '2',
    title: 'Tips and Tricks for Advanced Users',
    slug: 'tips-and-tricks-for-advanced-users',
    excerpt: 'Explore advanced tips and tricks to enhance your productivity and workflow.',
    content: `
      <p>For advanced users, here are some tips to get the most out of our product.</p>
      <ul>
        <li>Customize your settings for better performance.</li>
        <li>Use keyboard shortcuts to speed up your work.</li>
        <li>Integrate with other tools you use daily.</li>
      </ul>
    `,
    author: 'John Smith',
    publishedAt: '2023-08-15T14:30:00Z',
    coverImage: '/images/posts/advanced-tips.jpg',
    tags: ['Advanced', 'Tips', 'Productivity'],
  },
  {
    id: '3',
    title: 'Upcoming Features and Roadmap',
    slug: 'upcoming-features-and-roadmap',
    excerpt: 'Get a sneak peek at the upcoming features and our development roadmap.',
    content: `
      <p>We are excited to share what’s coming next for our product.</p>
      <h2>New Features</h2>
      <p>We plan to introduce...</p>
      <h2>Roadmap</h2>
      <p>Our roadmap includes...</p>
    `,
    author: 'Jane Doe',
    publishedAt: '2023-09-01T09:00:00Z',
    coverImage: '/images/posts/roadmap.jpg',
    tags: ['Roadmap', 'Features', 'Updates'],
  },
];
