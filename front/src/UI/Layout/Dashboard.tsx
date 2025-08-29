import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import AllUsers from "../admin/Data/AllUsers";
import AllRestaurant from "../admin/Data/AllRestaurents";
// Mock user data - replace with actual authentication
const mockUser = {
  firstName: "John",
  role: "admin", // or "user"
};

export default function Dashboard() {
  const [currentPath, setCurrentPath] = useState("/");

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    // Implement navigation logic
    console.log("Navigating to:", path);
  };

  const renderContent = () => {
    switch (currentPath) {
      case "/":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-balance">
                Welcome back, {mockUser.firstName}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's your FoodPanda dashboard overview.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold text-lg">Total Orders</h3>
                <p className="text-3xl font-bold text-foodpanda-pink mt-2">
                  1,234
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold text-lg">Active Restaurants</h3>
                <p className="text-3xl font-bold text-foodpanda-pink mt-2">
                  56
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold text-lg">Revenue</h3>
                <p className="text-3xl font-bold text-foodpanda-pink mt-2">
                  $12,345
                </p>
              </div>
            </div>
          </div>
        );
      case "/users":
        return (
          <div>
            <h1 className="text-3xl font-bold text-balance">
              Users Management
            </h1>
            <AllUsers />
          </div>
        );
      case "/restaurants":
        return (
          <div>
            <h1 className="text-3xl font-bold text-balance">Restaurants</h1>
            <AllRestaurant />
          </div>
        );
      case "/products":
        return (
          <div>
            <h1 className="text-3xl font-bold text-balance">Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage food items and menu.
            </p>
            <div className="mt-6 bg-card p-6 rounded-lg border">
              <p>Products content will be displayed here...</p>
            </div>
          </div>
        );
      case "/orders":
        return (
          <div>
            <h1 className="text-3xl font-bold text-balance">Orders</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage all orders.
            </p>
            <div className="mt-6 bg-card p-6 rounded-lg border">
              <p>Orders content will be displayed here...</p>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold text-balance">Page Not Found</h1>
            <p className="text-muted-foreground mt-1">
              The requested page could not be found.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar
        userRole={mockUser.role}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader user={mockUser} onLogout={handleLogout} />

        {/* Content - This acts as the outlet for navigation */}
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-4 bg-card">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 FoodPanda Dashboard. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
