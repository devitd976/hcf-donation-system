
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { VolunteerForm } from "@/components/volunteer/VolunteerForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddVolunteer() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddVolunteer = (data: any) => {
    // In a real application, this would send data to a backend API
    console.log("Volunteer data to be saved:", data);
    
    // For now, we're just mocking the successful addition
    // and returning to the volunteers list
    toast({
      title: "Success",
      description: "Volunteer added successfully",
    });
    
    setTimeout(() => {
      navigate("/volunteers");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Volunteer</h1>
          <p className="text-muted-foreground">
            Enter volunteer information to add them to the system
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/volunteers")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Volunteers
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volunteer Information</CardTitle>
          <CardDescription>
            Fill out the form below with the volunteer's personal information and skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VolunteerForm onSubmit={handleAddVolunteer} />
        </CardContent>
      </Card>
    </div>
  );
}
