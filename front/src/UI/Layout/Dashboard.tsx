import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { Outlet } from "react-router-dom";

const mockUser = {
  firstName: "John",
  role: "admin",
  restaurantId: "123", // ✅ this should come from backend
};

export default function Dashboard() {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={mockUser} onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* ✅ renders child routes */}
        </main>

        <footer className="border-t border-border px-6 py-4 bg-card">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 FoodPanda Dashboard. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
