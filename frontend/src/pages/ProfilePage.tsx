// frontend/src/pages/ProfilePage.tsx

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/'); // Về trang chủ sau khi đăng xuất
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user) {
    navigate('/login');
    return null; // Hoặc hiển thị thông báo yêu cầu đăng nhập
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">My Profile</CardTitle>
          <CardDescription>View and manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="font-medium">Email Address</label>
            <p className="text-lg p-3 bg-gray-100 dark:bg-gray-800 rounded-md">{user.email}</p>
          </div>
           <div className="space-y-2">
            <label className="font-medium">User ID</label>
            <p className="text-sm p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-500">{user.id}</p>
          </div>
          <Button onClick={handleSignOut} variant="destructive" className="w-full">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}