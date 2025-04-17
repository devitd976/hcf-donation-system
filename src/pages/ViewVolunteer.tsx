
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Calendar, Pencil, UserMinus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

// Helper function to get status badge
function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
    case "pending":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function ViewVolunteer() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // Find the volunteer by ID
  const volunteer = mockVolunteers.find(volunteer => volunteer.id === id);

  const handleDeactivate = () => {
    // In a real application, this would send data to a backend API
    console.log("Deactivating volunteer:", id);
    
    toast({
      title: "Success",
      description: "Volunteer status updated successfully",
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
          <h1 className="text-2xl font-bold tracking-tight">Volunteer Details</h1>
          <p className="text-muted-foreground">
            View volunteer information and history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/volunteers")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Volunteers
          </Button>
          <Button variant="outline" onClick={() => navigate(`/volunteers/edit/${volunteer.id}`)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" onClick={() => navigate("/volunteers/schedule")}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{volunteer.name}</CardTitle>
                <CardDescription>{volunteer.id}</CardDescription>
              </div>
              <div>{getStatusBadge(volunteer.status)}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Contact Information</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-base">{volunteer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-base">{volunteer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-base">{volunteer.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Emergency Contact</p>
                    <p className="text-base">{volunteer.emergencyContact}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Volunteer Information</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="text-base">{volunteer.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="text-base">{volunteer.availability}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Skills</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {volunteer.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Notes</h3>
                <Separator className="my-2" />
                <p className="text-base">{volunteer.notes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-hwf-purple pl-4 py-2">
                  <p className="text-sm text-muted-foreground">April 10, 2024</p>
                  <p className="text-base">Completed delivery route #DR342</p>
                </div>
                <div className="border-l-2 border-hwf-purple pl-4 py-2">
                  <p className="text-sm text-muted-foreground">April 3, 2024</p>
                  <p className="text-base">Updated contact information</p>
                </div>
                <div className="border-l-2 border-hwf-purple pl-4 py-2">
                  <p className="text-sm text-muted-foreground">March 27, 2024</p>
                  <p className="text-base">Added new skill: IT</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleDeactivate}
                >
                  <UserMinus className="h-4 w-4 mr-2" />
                  {volunteer.status === "active" ? "Deactivate Volunteer" : "Activate Volunteer"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
