
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ClientForm } from "@/components/client/ClientForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
  },
];

export default function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Find the client by ID
  const client = mockClients.find(client => client.id === id);

  const handleUpdateClient = (data: any) => {
    // In a real application, this would send data to a backend API
    console.log("Client data to be updated:", { id, ...data });
    
    // For now, we're just mocking the successful update
    // and returning to the clients list
    setTimeout(() => {
      navigate("/clients");
    }, 1000);
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
          <h1 className="text-2xl font-bold tracking-tight">Edit Client</h1>
          <p className="text-muted-foreground">
            Update client information
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/clients")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Information - {client.firstName} {client.lastName}</CardTitle>
          <CardDescription>
            Make changes to the client's information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientForm 
            defaultValues={client} 
            onSubmit={handleUpdateClient} 
            isEditing={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
