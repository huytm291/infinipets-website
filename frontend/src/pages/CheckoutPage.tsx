import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Trong một ứng dụng thật, đây là nơi bạn sẽ xử lý thanh toán và lưu đơn hàng
    console.log("Placing order...");

    toast.success("Your order has been placed successfully!", {
        description: "Thank you for shopping with INFINIPETS.",
    });

    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    // Nếu giỏ hàng trống, chuyển hướng về trang sản phẩm
    navigate('/products');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-coiny text-4xl text-center mb-10">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-12">
        {/* Shipping Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter your shipping address.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Postal Code</Label>
                <Input id="zip" required />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm">
                    <p>{item.product.name} <span className="text-gray-500">x{item.quantity}</span></p>
                    <p>€{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-base font-bold" size="lg">
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

