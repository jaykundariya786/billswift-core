import { useState, useEffect } from "react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Package,
  FileText
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// Mock data
const salesData = [
  { name: "Jan", sales: 4000, orders: 24 },
  { name: "Feb", sales: 3000, orders: 18 },
  { name: "Mar", sales: 5000, orders: 32 },
  { name: "Apr", sales: 7000, orders: 45 },
  { name: "May", sales: 6000, orders: 38 },
  { name: "Jun", sales: 8000, orders: 52 },
];

const productData = [
  { name: "Electronics", value: 40, color: "hsl(231, 48%, 48%)" },
  { name: "Clothing", value: 30, color: "hsl(142, 76%, 36%)" },
  { name: "Books", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Others", value: 10, color: "hsl(0, 84%, 60%)" },
];

const recentOrders = [
  { id: "#INV-001", customer: "John Doe", amount: "$150.00", status: "Paid" },
  { id: "#INV-002", customer: "Sarah Wilson", amount: "$89.50", status: "Pending" },
  { id: "#INV-003", customer: "Mike Johnson", amount: "$320.00", status: "Paid" },
  { id: "#INV-004", customer: "Emma Davis", amount: "$75.25", status: "Overdue" },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenue: 25680,
    orders: 156,
    customers: 89,
    products: 234
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your business.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          change={{ value: 12.5, isPositive: true }}
          icon={DollarSign}
          color="success"
        />
        <StatsCard
          title="Total Orders"
          value={stats.orders}
          change={{ value: 8.2, isPositive: true }}
          icon={ShoppingCart}
          color="default"
        />
        <StatsCard
          title="Customers"
          value={stats.customers}
          change={{ value: 3.1, isPositive: true }}
          icon={Users}
          color="warning"
        />
        <StatsCard
          title="Products"
          value={stats.products}
          change={{ value: -2.4, isPositive: false }}
          icon={Package}
          color="error"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(231, 48%, 48%)" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(231, 48%, 48%)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Product Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {productData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="font-medium">{order.id}</div>
                  <div className="text-muted-foreground">{order.customer}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-semibold">{order.amount}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "Paid" 
                      ? "bg-success/10 text-success" 
                      : order.status === "Pending"
                      ? "bg-warning/10 text-warning"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}