
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, Plus, ShoppingCart, Tag } from "lucide-react";

type Activity = {
  id: string;
  type: "new_product" | "product_updated" | "order_placed" | "price_changed";
  description: string;
  time: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
};

const activities: Activity[] = [
  {
    id: "1",
    type: "new_product",
    description: 'Added new product "AirPods Pro"',
    time: "2 hours ago",
    user: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
      initials: "JD",
    },
  },
  {
    id: "2",
    type: "order_placed",
    description: "New order #38492 received",
    time: "5 hours ago",
    user: {
      name: "System",
      initials: "SY",
    },
  },
  {
    id: "3",
    type: "product_updated",
    description: 'Updated inventory for "iPhone 15"',
    time: "Yesterday",
    user: {
      name: "Jane Smith",
      initials: "JS",
    },
  },
  {
    id: "4",
    type: "price_changed",
    description: 'Changed price for "MacBook Pro"',
    time: "2 days ago",
    user: {
      name: "Alex Johnson",
      initials: "AJ",
    },
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "new_product":
      return <Plus className="h-4 w-4" />;
    case "product_updated":
      return <Package className="h-4 w-4" />;
    case "order_placed":
      return <ShoppingCart className="h-4 w-4" />;
    case "price_changed":
      return <Tag className="h-4 w-4" />;
  }
};

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "new_product":
      return "bg-green-100 text-green-600";
    case "product_updated":
      return "bg-blue-100 text-blue-600";
    case "order_placed":
      return "bg-purple-100 text-purple-600";
    case "price_changed":
      return "bg-amber-100 text-amber-600";
  }
};

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className={`p-2 rounded-full mr-4 ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="space-y-1">
                <p className="text-sm">{activity.description}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Avatar className="h-5 w-5 mr-1">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback className="text-[10px]">{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <span>{activity.user.name}</span>
                  <span className="mx-1">•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
