import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  color?: "default" | "success" | "warning" | "error";
}

export function StatsCard({ title, value, change, icon: Icon, color = "default" }: StatsCardProps) {
  const colorClasses = {
    default: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10", 
    error: "text-destructive bg-destructive/10"
  };

  return (
    <Card className="hover-lift cursor-pointer transition-all duration-300 hover:shadow-custom-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                <span className={`text-xs font-medium ${
                  change.isPositive ? "text-success" : "text-destructive"
                }`}>
                  {change.isPositive ? "+" : ""}{change.value}%
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}