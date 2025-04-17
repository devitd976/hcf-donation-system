
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

// Mock volunteer data - this would come from an API in a real application
const mockVolunteers = [
  {
    id: "VOL001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (613) 555-8765",
    skills: ["Driving", "Lifting", "IT"],
    availability: "Weekends",
    status: "active",
    address: "123 Main St, Ottawa, ON",
    startDate: "2023-01-15",
    emergencyContact: "Jane Smith, +1 (613) 555-1234",
    notes: "Prefers delivery routes in the downtown area."
  },
  {
    id: "VOL002",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (613) 555-9876",
    skills: ["Customer Service", "Organization"],
    availability: "Mon, Wed, Fri",
    status: "active",
    address: "456 Oak Ave, Ottawa, ON",
    startDate: "2023-03-22",
    emergencyContact: "Mike Davis, +1 (613) 555-5678",
    notes: "Excellent at organizing donation items."
  },
  {
    id: "VOL003",
    name: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+1 (613) 555-2345",
    skills: ["Driving", "Inventory", "Documentation"],
    availability: "Tue, Thu",
    status: "inactive",
    address: "789 Pine St, Ottawa, ON",
    startDate: "2022-11-10",
    emergencyContact: "Sarah Brown, +1 (613) 555-3456",
    notes: "Currently on leave until June 2024."
  }
];

export default function EditVolunteer() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the volunteer by ID
  const volunteer = mockVolunteers.find(volunteer => volunteer.id === id);

  const handleUpdateVolunteer = (data: any) => {
    // In a real application, this would send data to a backend API
    console.log("Volunteer data to be updated:", { id, ...data });
    
    // For now, we're just mocking the successful update
    toast({
      title: "Success",
      description: "Volunteer information updated successfully",
    });
    
    setTimeout(() => {
      navigate("/volunteers");
    }, 1000);
  };

  // If volunteer not found, show error message
  if (!volunteer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/volunteers")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Volunteers
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold">Volunteer Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The volunteer you're looking for does not exist or has been removed.
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
          <h1 className="text-2xl font-bold tracking-tight">Edit Volunteer</h1>
          <p className="text-muted-foreground">
            Update volunteer information
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/volunteers")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Volunteers
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volunteer Information - {volunteer.name}</CardTitle>
          <CardDescription>
            Make changes to the volunteer's information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VolunteerForm 
            defaultValues={volunteer} 
            onSubmit={handleUpdateVolunteer} 
            isEditing={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
