import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { useLocation, useNavigate } from "react-router-dom";
import useResturent from "@/store/UseResturent";

// Mock user data - replace with actual authentication
const mockUser = {
  firstName: "John",
  role: "admin", // or "user"
};

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resturent } = useResturent();

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  const handleNavigate = (path: string) => {
    if (path === "/admin/resturent/:id" && resturent?.id) {
      navigate(`/admin/resturent/${resturent.id}`);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar
        userRole={mockUser.role}
        currentPath={location.pathname}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader user={mockUser} onLogout={handleLogout} />

        {/* Content - This acts as the outlet for navigation */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

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