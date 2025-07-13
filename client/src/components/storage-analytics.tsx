import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Images, Network, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { StorageAnalytics } from "@shared/schema";

export default function StorageAnalytics() {
  const { data: analytics, isLoading } = useQuery<StorageAnalytics>({
    queryKey: ["/api/analytics"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="mt-4">
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Storage",
      value: analytics?.totalStorage || "0 GB",
      icon: Database,
      color: "text-google-blue",
      change: "12% from last month",
      trend: "up",
    },
    {
      title: "Total Images",
      value: analytics?.totalImages?.toLocaleString() || "0",
      icon: Images,
      color: "text-aws-orange",
      change: "8% from last month",
      trend: "up",
    },
    {
      title: "CDN Bandwidth",
      value: analytics?.bandwidth || "0 GB",
      icon: Network,
      color: "text-cloud-info",
      change: "3% from last month",
      trend: "down",
    },
    {
      title: "Monthly Cost",
      value: analytics?.monthlyCost || "$0.00",
      icon: DollarSign,
      color: "text-cloud-success",
      change: "5% from last month",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
            </div>
            <div className="mt-4">
              <div className={`flex items-center text-sm ${
                metric.trend === "up" ? "text-cloud-success" : "text-cloud-warning"
              }`}>
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

