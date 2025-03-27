
import { Package, BarChart3, DollarSign, ShoppingCart } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ProductsChart from "@/components/dashboard/ProductsChart";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your product management dashboard.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Products" 
          value="124" 
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard 
          title="Total Sales" 
          value="$12,345" 
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard 
          title="Avg. Order Value" 
          value="$86.35" 
          icon={<ShoppingCart className="h-5 w-5" />}
          trend={{ value: 2, positive: true }}
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.45%" 
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: 1, positive: false }}
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ProductsChart />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Additional content could go here */}
    </div>
  );
}
