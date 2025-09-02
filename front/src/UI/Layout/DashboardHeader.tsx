"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserStore } from "@/store/UserStroe";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  const { user, logout } = UserStore();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      {/* Left Section - Search */}
      <div className="flex items-center justify-center w-1/2 py-4 px-6 bg-white shadow-sm rounded-2xl dark:bg-gray-900 dark:shadow-md">
        <div className="relative flex-2 text-start">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent truncate dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            Mrs. {user?.fullname}
          </h1>
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
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full p-0">
              <Avatar className="w-8 h-8 rounded-full bg-gray-200">
                <AvatarFallback className="text-sm font-medium text-gray-600">
                  {user?.fullname?.charAt(0).toUpperCase() ?? "A"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">
                {user?.fullname}
              </p>
              <p className="text-xs leading-none text-muted-foreground capitalize">
                {user?.isAdmin ? "Admin" : "User"}
              </p>
            </div>
            <DropdownMenuSeparator />
            <Link to={"/profile"}>
              <DropdownMenuItem className="cursor-pointer">
                Profile Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
