
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Edit2, 
  CheckCircle, 
  Users, 
  Calendar, 
  Clock,
  ClipboardCheck,
  ClipboardList,
  User,
  Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AssignTeamDialog } from "@/components/request/AssignTeamDialog";
import { useToast } from "@/hooks/use-toast";

// Mock request data
const mockRequests = [
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
    description: "Client needs furniture delivered to new apartment. Requires two people for heavy lifting.",
    priority: "medium",
    history: [
      { date: "2024-04-05", action: "Request created", user: "Sarah Johnson" },
      { date: "2024-04-10", action: "Assigned to Delivery team", user: "Admin" },
      { date: "2024-04-12", action: "Scheduled for delivery", user: "John Smith" }
    ]
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
    description: "New client intake and needs assessment.",
    priority: "high",
    history: [
      { date: "2024-04-01", action: "Request created", user: "Admin" },
      { date: "2024-04-02", action: "Assigned to Assessment team", user: "Admin" },
      { date: "2024-04-15", action: "Assessment completed", user: "Emma Davis" }
    ]
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

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "low":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>;
    case "medium":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>;
    case "high":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">High</Badge>;
    case "urgent":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>;
    default:
      return <Badge>{priority}</Badge>;
  }
}

export default function ViewRequest() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  useEffect(() => {
    // In a real application, fetch the request from an API
    // For now, we'll use the mock data
    const foundRequest = mockRequests.find(request => request.id === id);
    
    // Simulate API call delay
    setTimeout(() => {
      setRequest(foundRequest || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const markAsCompleted = () => {
    toast({
      title: "Status Updated",
      description: "Request has been marked as completed",
    });
    
    // In a real app, this would update the status in the backend
    // For now, we're just showing the toast notification
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-hwf-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Request Not Found</h1>
            <p className="text-muted-foreground">
              The request you're looking for doesn't exist
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/requests")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Requests
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Request: {request.id}</h1>
          <p className="text-muted-foreground">
            {request.type} for {request.client}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/requests")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/requests/edit/${request.id}`)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                <p className="flex items-center mt-1">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  {request.client} ({request.clientId})
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p className="mt-1">{getStatusBadge(request.status)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Request Type</h3>
                <p className="flex items-center mt-1">
                  <ClipboardList className="h-4 w-4 mr-2 text-muted-foreground" />
                  {request.type}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
                <p className="mt-1">{getPriorityBadge(request.priority)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Team</h3>
                <p className="flex items-center mt-1">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  {request.team || "Not assigned"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                <p className="flex items-center mt-1">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  {request.assignedTo || "Unassigned"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Scheduled Date</h3>
                <p className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {request.date}
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
              <p className="text-sm">{request.description}</p>
            </div>
            
            {request.items && request.items.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Items</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {request.items.map((item, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <Package className="h-4 w-4 mr-2 text-muted-foreground inline mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            
            <Separator />
            
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAssignDialogOpen(true)}
                  className="flex-1"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Assign Team
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => alert("Scheduling functionality would go here")}
                  className="flex-1"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button 
                  onClick={markAsCompleted}
                  className="flex-1 bg-hwf-purple hover:bg-hwf-purple-dark"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {request.history.map((event, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{event.action}</span>
                    <span className="text-muted-foreground">{event.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">By {event.user}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AssignTeamDialog
        request={request}
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
      />
    </div>
  );
}
