
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Edit2, 
  UserPlus, 
  Users, 
  Briefcase,
  ClipboardList,
  CheckCircle,
  Clock,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Mock team data
const mockTeams = [
  {
    id: "TEAM001",
    name: "Delivery Team",
    lead: "John Smith",
    leadId: "VOL001",
    description: "Responsible for delivering and setting up furniture and large items to client homes.",
    members: [
      { id: "VOL001", name: "John Smith", role: "Team Lead", joinDate: "2023-01-15", skills: ["Driving", "Logistics", "Management"] },
      { id: "VOL005", name: "Michael Brown", role: "Driver", joinDate: "2023-02-10", skills: ["Driving", "Heavy Lifting"] },
      { id: "VOL009", name: "Jessica Williams", role: "Assistant", joinDate: "2023-03-22", skills: ["Furniture Assembly", "Customer Service"] },
      { id: "VOL012", name: "David Lee", role: "Driver", joinDate: "2023-05-18", skills: ["Driving", "Navigation", "Furniture Assembly"] },
      { id: "VOL018", name: "Sarah Thompson", role: "Assistant", joinDate: "2023-07-30", skills: ["Inventory", "Documentation"] }
    ],
    activeRequests: [
      { id: "REQ001", client: "Maria Rodriguez", type: "Furniture Delivery", date: "2024-04-20", status: "scheduled" },
      { id: "REQ008", client: "James Wilson", type: "Appliance Delivery", date: "2024-04-22", status: "processing" },
      { id: "REQ012", client: "Emily Johnson", type: "Furniture Pickup", date: "2024-04-24", status: "pending" }
    ],
    completedRequests: [
      { id: "REQ042", client: "Robert Davis", type: "Furniture Delivery", date: "2024-04-10", status: "completed" },
      { id: "REQ039", client: "Lisa Chen", type: "Appliance Delivery", date: "2024-04-08", status: "completed" },
      { id: "REQ035", client: "Mohammed Ali", type: "Furniture Delivery", date: "2024-04-05", status: "completed" }
    ],
    skills: ["Driving", "Heavy Lifting", "Furniture Assembly", "Logistics", "Customer Service"],
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    }
  },
  {
    id: "TEAM002",
    name: "Assessment Team",
    lead: "Emma Davis",
    leadId: "VOL002",
    description: "Conducts initial assessments of client needs and determines required resources.",
    members: [
      { id: "VOL002", name: "Emma Davis", role: "Team Lead", joinDate: "2023-01-10", skills: ["Client Assessment", "Documentation", "Management"] },
      { id: "VOL007", name: "David Thompson", role: "Assessor", joinDate: "2023-03-15", skills: ["Client Assessment", "Need Analysis"] },
      { id: "VOL011", name: "Emily Wilson", role: "Assistant", joinDate: "2023-04-20", skills: ["Documentation", "Communication"] }
    ],
    activeRequests: [
      { id: "REQ010", client: "Sophia Martinez", type: "Initial Assessment", date: "2024-04-21", status: "scheduled" },
      { id: "REQ014", client: "Daniel Brown", type: "Reassessment", date: "2024-04-23", status: "pending" }
    ],
    completedRequests: [
      { id: "REQ002", client: "Omar Hassan", type: "Initial Assessment", date: "2024-04-15", status: "completed" },
      { id: "REQ005", client: "Lisa Patel", type: "Initial Assessment", date: "2024-04-12", status: "completed" },
      { id: "REQ009", client: "Andrew Johnson", type: "Reassessment", date: "2024-04-08", status: "completed" }
    ],
    skills: ["Client Assessment", "Need Analysis", "Documentation", "Communication", "Social Services Knowledge"],
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    }
  }
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

export default function ViewTeam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, fetch the team from an API
    // For now, we'll use the mock data
    const foundTeam = mockTeams.find(team => team.id === id);
    
    // Simulate API call delay
    setTimeout(() => {
      setTeam(foundTeam || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-hwf-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Not Found</h1>
            <p className="text-muted-foreground">
              The team you're looking for doesn't exist
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/teams")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarFallback className="text-xl">
              {team.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{team.name}</h1>
            <p className="text-muted-foreground">
              Team ID: {team.id} • Led by {team.lead}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/teams")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/teams/edit/${team.id}`)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/teams/manage-members/${team.id}`)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Manage Members
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>{team.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Team Lead</h3>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-2">
                    <AvatarFallback>
                      {team.lead.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{team.lead}</div>
                    <div className="text-sm text-muted-foreground">ID: {team.leadId}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Team Size</h3>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{team.members.length} members</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Active Requests</h3>
                <div className="flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{team.activeRequests.length} active</span>
                  <span className="text-sm text-muted-foreground ml-2">({team.completedRequests.length} completed)</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Team Skills</h3>
              <div className="flex flex-wrap gap-2">
                {team.skills.map((skill, index) => (
                  <Badge key={index} className="bg-hwf-soft-purple text-hwf-purple-dark hover:bg-hwf-soft-purple">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Availability</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(team.schedule).map(([day, available]) => (
                  <Badge key={day} variant="outline" className={available ? "bg-green-50" : "bg-gray-100"}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}: {available ? "Available" : "Unavailable"}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="active-requests">
            <Clock className="h-4 w-4 mr-2" />
            Active Requests
          </TabsTrigger>
          <TabsTrigger value="completed-requests">
            <CheckCircle className="h-4 w-4 mr-2" />
            Completed Requests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>All members currently assigned to this team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.members.map((member) => (
                  <div key={member.id} className="flex items-start p-4 border rounded-md hover:bg-gray-50 transition-colors">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.role} • ID: {member.id}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Joined: {member.joinDate}
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {member.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active-requests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Requests</CardTitle>
              <CardDescription>Current assignments for this team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.activeRequests.length > 0 ? (
                  team.activeRequests.map((request) => (
                    <div key={request.id} className="flex items-start p-4 border rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{request.type}</div>
                            <div className="text-sm">
                              Client: {request.client} • ID: {request.id}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(request.status)}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8"
                              onClick={() => navigate(`/requests/view/${request.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          Scheduled: {request.date}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <ClipboardList className="h-12 w-12 mx-auto mb-2 opacity-25" />
                    <p>No active requests for this team</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed-requests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Requests</CardTitle>
              <CardDescription>Recently completed assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.completedRequests.length > 0 ? (
                  team.completedRequests.map((request) => (
                    <div key={request.id} className="flex items-start p-4 border rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{request.type}</div>
                            <div className="text-sm">
                              Client: {request.client} • ID: {request.id}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(request.status)}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8"
                              onClick={() => navigate(`/requests/view/${request.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          Completed: {request.date}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-25" />
                    <p>No completed requests for this team</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
