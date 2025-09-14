import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Database, Zap, Shield } from 'lucide-react';

export default function IndexPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Database className="h-8 w-8 text-blue-500" />,
      title: "Supabase Integration",
      description: "Real-time database synchronization with PostgreSQL"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-green-500" />,
      title: "Product Management",
      description: "Complete CRUD operations for products and categories"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Real-time Updates",
      description: "Live updates across all connected clients"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Secure & Scalable",
      description: "Built with security and performance in mind"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Products & Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced product management system with real-time Supabase integration, 
            beautiful UI, and powerful admin features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              View Products
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/products')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              Admin Panel
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gray-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Database Schema Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Schema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Categories Table</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• id (UUID, Primary Key)</li>
                <li>• name (Text, Required)</li>
                <li>• description (Text, Optional)</li>
                <li>• image_url (Text, Optional)</li>
                <li>• created_at, updated_at (Timestamps)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Products Table</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• id (UUID, Primary Key)</li>
                <li>• name (Text, Required)</li>
                <li>• description (Text, Optional)</li>
                <li>• price (Numeric, Required)</li>
                <li>• category_id (UUID, Foreign Key)</li>
                <li>• image_url, stock, rating (Optional)</li>
                <li>• created_at, updated_at (Timestamps)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}