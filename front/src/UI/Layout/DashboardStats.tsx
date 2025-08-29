"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Star } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Orders",
      value: "234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-foodpanda-pink",
    },
    {
      title: "Total Customers",
      value: "1,234",
      change: "+5.1%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "-0.2%",
      trend: "down",
      icon: Star,
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-balance">{stat.value}</div>
              <div className="flex items-center space-x-1 mt-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    stat.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
