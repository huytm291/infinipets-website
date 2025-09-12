import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/'); // Về trang chủ sau khi đăng xuất
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-700 dark:text-gray-300">Loading...</div>;
  }

  if (!user) {
    return null; // Đang redirect nên không render gì
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-[#14b8a6] to-[#4ade80] bg-clip-text text-transparent">
              My Profile
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              View and manage your account details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-1">
              <label className="font-semibold text-gray-800 dark:text-gray-200">Email Address</label>
              <p className="text-lg p-4 bg-gray-100 dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 transition-colors hover:bg-[#14b8a6]/10 dark:hover:bg-[#4ade80]/20 select-text break-words">
                {user.email}
              </p>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-800 dark:text-gray-200">User  ID</label>
              <p className="text-sm p-3 bg-gray-100 dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 text-gray-500 select-text break-words">
                {user.id}
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="w-full bg-gradient-to-r from-[#e02424] to-[#9b1c1c] hover:from-[#b91c1c] hover:to-[#7f1d1d] shadow-lg transition-transform transform hover:scale-105"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}