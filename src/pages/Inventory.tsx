
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
  PackagePlus, 
  Search, 
  Filter, 
  Eye, 
  Pencil, 
  Trash2,
  ShoppingBag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const inventoryItems = [
  {
    id: "INV001",
    name: "Sofa - 3 Seater",
    category: "Furniture",
    condition: "Good",
    status: "available",
    location: "Warehouse A",
    dateAdded: "2023-10-15",
  },
  {
    id: "INV002",
    name: "Dining Table",
    category: "Furniture",
    condition: "Excellent",
    status: "reserved",
    location: "Warehouse B",
    dateAdded: "2023-11-02",
  },
  {
    id: "INV003",
    name: "Microwave",
    category: "Appliances",
    condition: "Good",
    status: "available",
    location: "Warehouse A",
    dateAdded: "2023-11-10",
  },
  {
    id: "INV004",
    name: "Double Bed Frame",
    category: "Furniture",
    condition: "Fair",
    status: "available",
    location: "Warehouse C",
    dateAdded: "2023-12-05",
  },
  {
    id: "INV005",
    name: "Kitchen Utensil Set",
    category: "Kitchenware",
    condition: "New",
    status: "assigned",
    location: "Warehouse A",
    dateAdded: "2024-01-15",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "available":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
    case "reserved":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Reserved</Badge>;
    case "assigned":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Assigned</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">
            Manage donation items and stock levels
          </p>
        </div>
        <Button className="bg-hwf-purple hover:bg-hwf-purple-dark">
          <PackagePlus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">216</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reserved Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Assigned Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
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
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.condition}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ShoppingBag className="h-4 w-4" />
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
