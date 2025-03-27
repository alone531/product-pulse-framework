
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export default function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-all", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-semibold">{value}</h3>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span 
                  className={cn(
                    "text-xs font-medium rounded-full px-1.5 py-0.5",
                    trend.positive 
                      ? "text-green-600 bg-green-50" 
                      : "text-red-600 bg-red-50"
                  )}
                >
                  {trend.positive ? "+" : "-"}{Math.abs(trend.value)}%
                </span>
                <span className="ml-1.5 text-xs text-muted-foreground">vs. last month</span>
              </div>
            )}
          </div>
          
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
