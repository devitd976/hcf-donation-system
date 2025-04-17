
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
import { 
  UserPlus, 
  Search, 
  Filter,
  Eye,
  Pencil,
  Flag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const clients = [
  {
    id: "CLT001",
    name: "Maria Rodriguez",
    country: "Syria",
    status: "recent-arrival",
    phone: "+1 (613) 555-1234",
    language: "Arabic, English",
    housing: "Apartment",
    children: 2,
  },
  {
    id: "CLT002",
    name: "Omar Hassan",
    country: "Somalia",
    status: "refugee",
    phone: "+1 (613) 555-2345",
    language: "Somali, English",
    housing: "Townhouse",
    children: 3,
  },
  {
    id: "CLT003",
    name: "Li Wei",
    country: "China",
    status: "low-income",
    phone: "+1 (613) 555-3456",
    language: "Mandarin",
    housing: "Apartment",
    children: 1,
  },
  {
    id: "CLT004",
    name: "Sarah Johnson",
    country: "Canada",
    status: "low-income",
    phone: "+1 (613) 555-4567",
    language: "English, French",
    housing: "House",
    children: 2,
  },
  {
    id: "CLT005",
    name: "Ahmed Khalil",
    country: "Afghanistan",
    status: "refugee",
    phone: "+1 (613) 555-5678",
    language: "Pashto, English",
    housing: "Apartment",
    children: 4,
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

export default function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage client information and requests
          </p>
        </div>
        <Button className="bg-hwf-purple hover:bg-hwf-purple-dark">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients..."
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
                  <TableHead>Origin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Housing</TableHead>
                  <TableHead>Children</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.country}</TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell>{client.housing}</TableCell>
                    <TableCell>{client.children}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Flag className="h-4 w-4" />
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
