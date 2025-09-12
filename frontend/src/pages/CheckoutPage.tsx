import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/products');
    }
  }, [cartItems, navigate]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý thanh toán và lưu đơn hàng ở đây (nếu có)
    console.log("Placing order...");

    toast.success("Your order has been placed successfully!", {
      description: "Thank you for shopping with INFINIPETS.",
    });

    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return null; // Đang redirect nên không render gì
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-12 max-w-7xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="font-coiny text-4xl text-center mb-12 text-gray-900 dark:text-gray-100">
        Checkout
      </h1>
      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-12">
        {/* Shipping Information */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-extrabold text-[#14b8a6] dark:text-[#4ade80]">
                Shipping Information
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Enter your shipping address.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name" className="text-gray-800 dark:text-gray-200 font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address" className="text-gray-800 dark:text-gray-200 font-semibold">
                  Address
                </Label>
                <Input
                  id="address"
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-800 dark:text-gray-200 font-semibold">
                  City
                </Label>
                <Input
                  id="city"
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip" className="text-gray-800 dark:text-gray-200 font-semibold">
                  Postal Code
                </Label>
                <Input
                  id="zip"
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-[#14b8a6] dark:focus:border-[#4ade80] focus:ring-1 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-extrabold text-[#14b8a6] dark:text-[#4ade80]">
                Your Order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                {cartItems.map(item => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center text-sm text-gray-900 dark:text-gray-100"
                  >
                    <p className="truncate max-w-[70%]">
                      {item.product.name} <span className="text-gray-500 dark:text-gray-400">x{item.quantity}</span>
                    </p>
                    <p className="font-semibold">€{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-xl border-t border-gray-300 dark:border-gray-700 pt-5 text-gray-900 dark:text-gray-100">
                <span>Total</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#14b8a6] to-[#4ade80] text-base font-bold shadow-lg hover:from-[#0f8f8a] hover:to-[#3ac66a] transition-transform transform hover:scale-105"
                size="lg"
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </motion.div>
  );
}
