"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  user: {
    firstName: string;
    role: string;
  };
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      {/* Left Section - Search */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, restaurants..."
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-foodpanda-pink"
          />
        </div>
      </div>

      {/* Right Section - Notifications & User */}
      <div className="flex items-center space-x-4">
        {/* Status Badge */}
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 hover:bg-green-100">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
          Online
        </Badge>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-foodpanda-pink hover:bg-foodpanda-pink-dark">
            3
          </Badge>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-foodpanda-pink/20">
                <AvatarFallback className="bg-foodpanda-pink text-white font-semibold">
                  {user.firstName.charAt(0).toUpperCase()} || A
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">
                {user.firstName}
              </p>
              <p className="text-xs leading-none text-muted-foreground capitalize">
                {user.role}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={onLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
