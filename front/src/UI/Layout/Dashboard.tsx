import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
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
