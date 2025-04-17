
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { RequestForm } from "@/components/request/RequestForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
    priority: "medium"
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
    priority: "high"
  },
];

export default function EditRequest() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleUpdateRequest = (data: any) => {
    // In a real application, this would send data to a backend API
    console.log("Updated request data:", data);
    
    toast({
      title: "Success",
      description: "Request updated successfully",
    });
    
    setTimeout(() => {
      navigate("/requests");
    }, 1000);
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
          <h1 className="text-2xl font-bold tracking-tight">Edit Request</h1>
          <p className="text-muted-foreground">
            Update request information for {request.id}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/requests")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Requests
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Information</CardTitle>
          <CardDescription>
            Update the form below with the request details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RequestForm initialData={request} onSubmit={handleUpdateRequest} />
        </CardContent>
      </Card>
    </div>
  );
}
