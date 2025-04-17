
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ClientForm } from "@/components/client/ClientForm";

export default function AddClient() {
  const navigate = useNavigate();

  const handleAddClient = (data: any) => {
    // In a real application, this would send data to a backend API
    console.log("Client data to be saved:", data);
    
    // For now, we're just mocking the successful addition
    // and returning to the clients list
    setTimeout(() => {
      navigate("/clients");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add New Client</h1>
        <p className="text-muted-foreground">
          Enter client information to add them to the system
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription>
            Fill out the form below with the client's personal information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientForm onSubmit={handleAddClient} />
        </CardContent>
      </Card>
    </div>
  );
}
