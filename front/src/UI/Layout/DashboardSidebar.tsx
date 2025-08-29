"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Users,
  ShoppingBasket,
  Store,
} from "lucide-react";
import SidebarToggle from "./SidebarToggle";

interface SidebarProps {
  userRole: string;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function DashboardSidebar({ currentPath, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const adminMenuItems = [
    {
      key: "/",
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      key: "/users",
      icon: Users,
      label: "Users",
      path: "/users",
    },
    {
      key: "/restaurant",
      icon: Store,
      label: "My Restaurant",
      path: "/restaurants",
    },
    {
      key: "/menus",
      icon: Store,
      label: "Menus",
      path: "/menus",
    }, 
    {
      key: "/orders",
      icon: ShoppingBasket,
      label: "Orders",
      path: "/orders",
    },
  ];

  const menuItems = adminMenuItems;

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <SidebarToggle collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Navigation Menu */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <Button
                key={item.key}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-11 px-3",
                  isActive
                    ? "bg-foodpanda-pink text-black hover:bg-foodpanda-pink-dark"
                    : "hover:bg-sidebar-accent text-sidebar-foreground",
                  collapsed && "px-2"
                )}
                onClick={() => onNavigate(item.path)}>
                <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground text-center">
            FoodPanda Dashboard v2.0
          </div>
        </div>
      )}
    </div>
  );
}
