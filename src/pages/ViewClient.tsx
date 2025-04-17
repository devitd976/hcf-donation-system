
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Pencil, 
  Trash2,
  AlertTriangle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock client data - this would come from an API in a real application
const mockClients = [
  {
    id: "CLT001",
    firstName: "Maria",
    lastName: "Rodriguez",
    countryOfOrigin: "Syria",
    statusInCanada: "recent-arrival",
    phone: "+1 (613) 555-1234",
    languagesSpoken: "Arabic, English",
    housingType: "Apartment",
    numberOfChildren: 2,
    numberOfAdults: 1,
    email: "maria.rodriguez@example.com",
    address: "123 Main St",
    childrenAges: "5, 7",
    hasTransportation: false,
  },
  {
    id: "CLT002",
    firstName: "Omar",
    lastName: "Hassan",
    countryOfOrigin: "Somalia",
    statusInCanada: "refugee",
    phone: "+1 (613) 555-2345",
    languagesSpoken: "Somali, English",
    housingType: "Townhouse",
    numberOfChildren: 3,
    numberOfAdults: 2,
    email: "omar.hassan@example.com",
    address: "456 Oak Ave",
    childrenAges: "2, 5, 10",
    hasTransportation: true,
  },
];

// Helper function to get status badge styles
function getStatusBadge(status: string) {
  switch (status) {
    case "refugee":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Refugee</Badge>;
    case "recent-arrival":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Recent Arrival</Badge>;
    case "low-income":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Low Income</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function ViewClient() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the client by ID
  const client = mockClients.find(client => client.id === id);
  
  const handleDeleteClient = () => {
    // In a real application, this would send a delete request to a backend API
    console.log("Deleting client:", id);
    
    // For now, we're just mocking the successful deletion
    toast({
      title: "Client deleted",
      description: "The client has been successfully removed from the system.",
    });

    // Navigate back to clients list
    navigate("/clients");
  };

  // If client not found, show error message
  if (!client) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/clients")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold">Client Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The client you're looking for does not exist or has been removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Client Details</h1>
          <p className="text-muted-foreground">
            View detailed information about this client
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate("/clients")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
          <Button variant="outline" onClick={() => navigate(`/clients/edit/${id}`)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Delete Client
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {client.firstName} {client.lastName}? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => document.querySelector('[data-state="open"] button[aria-label="Close"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteClient}>
                  Delete Client
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {client.firstName} {client.lastName} - {client.id}
            </span>
            {getStatusBadge(client.statusInCanada)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Contact Information</h3>
                <div className="mt-1 space-y-2">
                  <p><span className="font-medium">Email:</span> {client.email || "Not provided"}</p>
                  <p><span className="font-medium">Phone:</span> {client.phone || "Not provided"}</p>
                  <p><span className="font-medium">Address:</span> {client.address || "Not provided"}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Demographics</h3>
                <div className="mt-1 space-y-2">
                  <p><span className="font-medium">Country of Origin:</span> {client.countryOfOrigin}</p>
                  <p><span className="font-medium">Languages:</span> {client.languagesSpoken}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Household Information</h3>
                <div className="mt-1 space-y-2">
                  <p><span className="font-medium">Housing Type:</span> {client.housingType}</p>
                  <p><span className="font-medium">Transportation:</span> {client.hasTransportation ? "Yes" : "No"}</p>
                  <p><span className="font-medium">Adults:</span> {client.numberOfAdults}</p>
                  <p><span className="font-medium">Children:</span> {client.numberOfChildren}</p>
                  {client.childrenAges && (
                    <p><span className="font-medium">Children's Ages:</span> {client.childrenAges}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
