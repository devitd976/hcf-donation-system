
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, Filter, Eye, Pencil, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const volunteers = [
  {
    id: "VOL001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (613) 555-8765",
    skills: ["Driving", "Lifting", "IT"],
    availability: "Weekends",
    status: "active",
  },
  {
    id: "VOL002",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (613) 555-9876",
    skills: ["Customer Service", "Organization"],
    availability: "Mon, Wed, Fri",
    status: "active",
  },
  {
    id: "VOL003",
    name: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+1 (613) 555-2345",
    skills: ["Driving", "Inventory", "Documentation"],
    availability: "Tue, Thu",
    status: "inactive",
  },
  {
    id: "VOL004",
    name: "Sophia Wilson",
    email: "sophia.wilson@email.com",
    phone: "+1 (613) 555-3456",
    skills: ["Translation (French)", "Admin"],
    availability: "Flexible",
    status: "active",
  },
  {
    id: "VOL005",
    name: "Robert Johnson",
    email: "robert.johnson@email.com",
    phone: "+1 (613) 555-4567",
    skills: ["Maintenance", "Lifting", "Driving"],
    availability: "Weekends",
    status: "pending",
  },
];

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

export default function Volunteers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Volunteers</h1>
          <p className="text-muted-foreground">
            Manage volunteer information and assignments
          </p>
        </div>
        <Button className="bg-hwf-purple hover:bg-hwf-purple-dark">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Volunteer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volunteer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search volunteers..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell className="font-medium">{volunteer.id}</TableCell>
                    <TableCell>{volunteer.name}</TableCell>
                    <TableCell>
                      <div>{volunteer.email}</div>
                      <div className="text-xs text-muted-foreground">{volunteer.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {volunteer.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{volunteer.availability}</TableCell>
                    <TableCell>{getStatusBadge(volunteer.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
