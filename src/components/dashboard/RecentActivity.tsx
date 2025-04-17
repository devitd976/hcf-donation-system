
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ActivityStatus = "completed" | "pending" | "processing";

interface Activity {
  id: string;
  description: string;
  time: string;
  status: ActivityStatus;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    description: "New client request submitted",
    time: "10 min ago",
    status: "pending",
  },
  {
    id: "2",
    description: "Furniture delivery scheduled",
    time: "1 hour ago",
    status: "processing",
  },
  {
    id: "3",
    description: "Volunteer onboarding completed",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: "4",
    description: "Inventory update - Added 5 chairs",
    time: "3 hours ago",
    status: "completed",
  },
  {
    id: "5",
    description: "Team request fulfilled - IT Equipment",
    time: "Yesterday",
    status: "completed",
  },
];

function getStatusStyles(status: ActivityStatus) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    default:
      return "";
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockActivities.map((activity) => (
            <li key={activity.id} className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              <Badge className={cn("font-normal", getStatusStyles(activity.status))}>
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
