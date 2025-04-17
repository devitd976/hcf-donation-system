
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  ClipboardPlus, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const requests = [
  {
    id: "REQ001",
    client: "Maria Rodriguez",
    clientId: "CLT001",
    type: "Furniture Delivery",
    items: ["Sofa", "Dining Table", "Chairs (4)"],
    team: "Delivery",
    assignedTo: "John Smith",
    status: "scheduled",
    date: "2024-04-20",
  },
  {
    id: "REQ002",
    client: "Omar Hassan",
    clientId: "CLT002",
    type: "Initial Assessment",
    items: [],
    team: "Assessment",
    assignedTo: "Emma Davis",
    status: "completed",
    date: "2024-04-15",
  },
  {
    id: "REQ003",
    client: "Li Wei",
    clientId: "CLT003",
    type: "IT Equipment",
    items: ["Laptop", "Printer"],
    team: "IT",
    assignedTo: null,
    status: "pending",
    date: "2024-04-22",
  },
  {
    id: "REQ004",
    client: "Sarah Johnson",
    clientId: "CLT004",
    type: "Kitchen Supplies",
    items: ["Utensils", "Dishes", "Cookware"],
    team: "Kitchen",
    assignedTo: "Robert Johnson",
    status: "processing",
    date: "2024-04-18",
  },
  {
    id: "REQ005",
    client: "Ahmed Khalil",
    clientId: "CLT005",
    type: "Children's Items",
    items: ["Toys", "Books", "Clothes"],
    team: "Children",
    assignedTo: null,
    status: "pending",
    date: "2024-04-25",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
    case "processing":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>;
    case "scheduled":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Scheduled</Badge>;
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function Requests() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredRequests = requests.filter(request => 
    request.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (request.team && request.team.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const pendingRequests = requests.filter(req => req.status === "pending").length;
  const processingRequests = requests.filter(req => req.status === "processing").length;
  const scheduledRequests = requests.filter(req => req.status === "scheduled").length;
  const completedToday = requests.filter(req => req.status === "completed" && req.date === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Requests</h1>
          <p className="text-muted-foreground">
            Manage team requests and assignments
          </p>
        </div>
        <Button 
          className="bg-hwf-purple hover:bg-hwf-purple-dark"
          onClick={() => navigate("/requests/add")}
        >
          <ClipboardPlus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingRequests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledRequests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search requests..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div>{request.client}</div>
                        <div className="text-xs text-muted-foreground">{request.clientId}</div>
                      </TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{request.team || "—"}</TableCell>
                      <TableCell>
                        {request.assignedTo || (
                          <span className="text-muted-foreground text-sm">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => navigate(`/requests/view/${request.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => navigate(`/requests/assign-team/${request.id}`)}
                          >
                            <Users className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => alert(request.status !== "completed" ? "Marking as complete" : "Marking as incomplete")}
                          >
                            {request.status !== "completed" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
