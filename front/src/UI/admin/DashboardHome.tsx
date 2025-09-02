"use client";

import { useEffect, useState } from "react";
import {
  Store,
  ChefHat,
  ShoppingBag,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Clock,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useResturent from "@/store/UseResturent";

export default function FoodPandaDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const { getResturent } = useResturent();

  useEffect(() => {
    const fetchData = async () => {
      await getResturent();
    };
    fetchData();
  }, []);

  // Mock data for the dashboard
  const dashboardStats = {
    restaurants: 10,
    menus: 32,
    weeklyOrders: 5,
    totalRevenue: 45280,
    activeUsers: 1247,
    avgRating: 4.6,
  };

  const recentOrders = [
    {
      id: 1,
      restaurant: "KFC - Peshawar",
      items: 3,
      amount: 850,
      status: "delivered",
      time: "2 min ago",
    },
    {
      id: 2,
      restaurant: "Pizza Palace",
      items: 2,
      amount: 650,
      status: "preparing",
      time: "5 min ago",
    },
    {
      id: 3,
      restaurant: "Burger Hub",
      items: 1,
      amount: 320,
      status: "delivered",
      time: "12 min ago",
    },
    {
      id: 4,
      restaurant: "Sushi Express",
      items: 4,
      amount: 1200,
      status: "on-way",
      time: "18 min ago",
    },
  ];

  const topRestaurants = [
    { name: "KFC - Peshawar", orders: 45, revenue: 12500, rating: 4.8 },
    { name: "Pizza Hub", orders: 38, revenue: 9800, rating: 4.7 },
    { name: "Burger Hub", orders: 32, revenue: 8200, rating: 4.5 },
    { name: "Cheziuse Express", orders: 28, revenue: 11200, rating: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-pink-600 to-teal-600 dark:from-red-700 dark:via-pink-700 dark:to-teal-700 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Store className="w-10 h-10" />
                Food Panda Dashboard
              </h1>
              <p className="text-emerald-100 dark:text-emerald-200 text-lg">
                Monitor your food delivery empire
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant={selectedPeriod === "week" ? "secondary" : "outline"}
                onClick={() => setSelectedPeriod("week")}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20">
                This Week
              </Button>
              <Button
                variant={selectedPeriod === "month" ? "secondary" : "outline"}
                onClick={() => setSelectedPeriod("month")}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20">
                This Month
              </Button>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Store className="w-8 h-8 text-emerald-100 dark:text-emerald-200" />
                <ArrowUpRight className="w-5 h-5 text-emerald-200 dark:text-emerald-300" />
              </div>
              <p className="text-3xl font-bold mb-1">
                {dashboardStats.restaurants}
              </p>
              <p className="text-emerald-100 dark:text-emerald-200 text-sm">
                Active Restaurants
              </p>
            </div>

            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <ChefHat className="w-8 h-8 text-emerald-100 dark:text-emerald-200" />
                <ArrowUpRight className="w-5 h-5 text-emerald-200 dark:text-emerald-300" />
              </div>
              <p className="text-3xl font-bold mb-1">{dashboardStats.menus}+</p>
              <p className="text-emerald-100 dark:text-emerald-200 text-sm">
                Total Menu Items
              </p>
            </div>

            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="w-8 h-8 text-emerald-100 dark:text-emerald-200" />
                <TrendingUp className="w-5 h-5 text-emerald-200 dark:text-emerald-300" />
              </div>
              <p className="text-3xl font-bold mb-1">
                {dashboardStats.weeklyOrders}
              </p>
              <p className="text-emerald-100 dark:text-emerald-200 text-sm">
                Orders This Week
              </p>
            </div>

            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-emerald-100 dark:text-emerald-200" />
                <ArrowUpRight className="w-5 h-5 text-emerald-200 dark:text-emerald-300" />
              </div>
              <p className="text-3xl font-bold mb-1">
                ₹{dashboardStats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-emerald-100 dark:text-emerald-200 text-sm">
                Total Revenue
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:shadow-gray-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {dashboardStats.activeUsers.toLocaleString()}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                  +12%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-emerald-600 dark:bg-emerald-500 h-2 rounded-full"
                  style={{ width: "75%" }}></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                75% of monthly target
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:shadow-gray-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {dashboardStats.avgRating}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.floor(dashboardStats.avgRating)
                          ? "text-yellow-400 fill-current dark:text-yellow-300"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full"
                  style={{ width: "92%" }}></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Excellent customer satisfaction
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:shadow-gray-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Platform Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  98.5%
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                  Uptime
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-emerald-600 dark:bg-emerald-500 h-2 rounded-full"
                  style={{ width: "98.5%" }}></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders & Top Restaurants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card className="border-0 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100">
                        {order.restaurant}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.items} items • {order.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      ₹{order.amount}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : order.status === "preparing"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Restaurants */}
          <Card className="border-0 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Top Performing Restaurants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topRestaurants.map((restaurant, index) => (
                <div
                  key={restaurant.name}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-600 dark:bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100">
                        {restaurant.name}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{restaurant.orders} orders</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current dark:text-yellow-300" />
                          <span>{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      ₹{restaurant.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Revenue
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
