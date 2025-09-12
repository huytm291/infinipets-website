export interface Testimonial {
  id: number;
  name: string;
  location?: string;
  text: string;
  rating: number;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah & Luna",
    location: "Berlin, Germany",
    text: "Luna looks absolutely stunning in her Forest Explorer set! The quality is exceptional and the fit is perfect. We get compliments everywhere we go! 🐕✨",
    rating: 5,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Marco & Bella",
    location: "Milan, Italy",
    text: "The handmade sweater is incredibly soft and warm. Bella loves wearing it during our morning walks. INFINIPETS truly understands pet fashion! 🧶❤️",
    rating: 5,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emma & Max",
    location: "Amsterdam, Netherlands",
    text: "Max's superhero cape makes him the star of the dog park! The attention to detail and comfort is amazing. Highly recommend! 🦸‍♂️🐾",
    rating: 5,
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=100&h=100&fit=crop&crop=face"
  }
];