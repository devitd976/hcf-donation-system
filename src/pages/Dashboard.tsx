
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, UserCircle, ClipboardList } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const mockChartData = [
  { name: "Jan", donations: 15, clients: 10 },
  { name: "Feb", donations: 20, clients: 12 },
  { name: "Mar", donations: 30, clients: 18 },
  { name: "Apr", donations: 25, clients: 15 },
  { name: "May", donations: 40, clients: 25 },
  { name: "Jun", donations: 35, clients: 22 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of HWF donation management system</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value="126"
          icon={UserCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Active Volunteers"
          value="47"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Inventory Items"
          value="328"
          icon={Package}
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard
          title="Pending Requests"
          value="18"
          icon={ClipboardList}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Donations vs Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="donations" fill="#9b87f5" name="Donations" />
                  <Bar dataKey="clients" fill="#7E69AB" name="New Clients" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <RecentActivity />
      </div>
    </div>
  );
}
