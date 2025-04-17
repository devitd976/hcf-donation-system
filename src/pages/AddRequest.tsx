
import React from "react";
import { useNavigate } from "react-router-dom";
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

export default function AddRequest() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddRequest = (data: any) => {
    // In a real application, this would send data to a backend API
    console.log("Request data to be saved:", data);
    
    toast({
      title: "Success",
      description: "Request added successfully",
    });
    
    setTimeout(() => {
      navigate("/requests");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Request</h1>
          <p className="text-muted-foreground">
            Enter request information to create a new service request
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
            Fill out the form below with the request details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RequestForm onSubmit={handleAddRequest} />
        </CardContent>
      </Card>
    </div>
  );
}
