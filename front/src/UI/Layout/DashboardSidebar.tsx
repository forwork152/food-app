import { NavLink } from "react-router-dom";
import { Home, Users, ShoppingBasket, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useResturent from "@/store/UseResturent";

export function DashboardSidebar() {
  const { resturent } = useResturent();

  const adminMenuItems = [
    { key: "/", icon: Home, label: "Home", path: "/admin" },
    { key: "/admin/users", icon: Users, label: "Users", path: "/admin/users" },
    {
      key: `/admin/resturent/${resturent?._id}`,
      icon: Store,
      label: "My Restaurant",
      path: `/admin/resturent/${resturent?._id}`,
    },
    { key: "/admin/menus", icon: Store, label: "Menus", path: "/admin/menus" },
    {
      key: "/admin/orders",
      icon: ShoppingBasket,
      label: "Orders",
      path: "/admin/orders",
    },
  ];

  return (
    <div className="w-64 border-r bg-sidebar">
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.key} to={item.path}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start h-11 px-3">
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                )}
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
