
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ShoppingBag,
  BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StockControlDialog } from "@/components/inventory/StockControlDialog";

const inventoryItems = [
  {
    id: "INV001",
    name: "Sofa - 3 Seater",
    category: "Furniture",
    condition: "Good",
    status: "available",
    location: "Warehouse A",
    dateAdded: "2023-10-15",
    quantity: 1,
  },
  {
    id: "INV002",
    name: "Dining Table",
    category: "Furniture",
    condition: "Excellent",
    status: "reserved",
    location: "Warehouse B",
    dateAdded: "2023-11-02",
    quantity: 1,
  },
  {
    id: "INV003",
    name: "Microwave",
    category: "Appliances",
    condition: "Good",
    status: "available",
    location: "Warehouse A",
    dateAdded: "2023-11-10",
    quantity: 2,
  },
  {
    id: "INV004",
    name: "Double Bed Frame",
    category: "Furniture",
    condition: "Fair",
    status: "available",
    location: "Warehouse C",
    dateAdded: "2023-12-05",
    quantity: 1,
  },
  {
    id: "INV005",
    name: "Kitchen Utensil Set",
    category: "Kitchenware",
    condition: "New",
    status: "assigned",
    location: "Warehouse A",
    dateAdded: "2024-01-15",
    quantity: 4,
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);

  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableItems = inventoryItems.filter(item => item.status === "available").length;
  const reservedItems = inventoryItems.filter(item => item.status === "reserved").length;
  const assignedItems = inventoryItems.filter(item => item.status === "assigned").length;
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);

  const openStockControl = (item) => {
    setSelectedItem(item);
    setIsStockDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">
            Manage donation items and stock levels
          </p>
        </div>
        <Button 
          className="bg-hwf-purple hover:bg-hwf-purple-dark"
          onClick={() => navigate("/inventory/add")}
        >
          <PackagePlus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reserved Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservedItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Assigned Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedItems}</div>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => navigate(`/inventory/view/${item.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => navigate(`/inventory/edit/${item.id}`)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => openStockControl(item)}
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedItem && (
        <StockControlDialog
          item={selectedItem}
          open={isStockDialogOpen}
          onOpenChange={setIsStockDialogOpen}
        />
      )}
    </div>
  );
}
