// frontend/src/pages/CartPage.tsx

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-coiny text-4xl text-center mb-8">Your Shopping Cart</h1>
      
      {cartCount === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.product.id} className="flex items-center p-4">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-grow ml-4">
                  <h3 className="font-bold text-lg">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">€{item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                   <Input 
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                      className="w-20 text-center"
                      min="1"
                   />
                   <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 className="h-5 w-5 text-red-500" />
                   </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-green-500">
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}