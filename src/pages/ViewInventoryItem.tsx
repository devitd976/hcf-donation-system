
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Edit2, 
  Trash2, 
  Tag, 
  MapPin, 
  Calendar, 
  ShoppingBag,
  PackageCheck,
  Truck,
  ClipboardList 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock inventory item data
const mockInventoryItems = [
  {
    id: "INV001",
    name: "Sofa - 3 Seater",
    category: "Furniture",
    condition: "Good",
    status: "available",
    quantity: 1,
    location: "Warehouse A",
    dateAdded: "2023-10-15",
    description: "Comfortable three-seater sofa in good condition.",
    history: [
      { date: "2023-10-15", action: "Added to inventory", user: "Jane Smith" },
      { date: "2023-11-12", action: "Moved to Warehouse A", user: "John Doe" }
    ]
  },
  {
    id: "INV002",
    name: "Dining Table",
    category: "Furniture",
    condition: "Excellent",
    status: "reserved",
    quantity: 1,
    location: "Warehouse B",
    dateAdded: "2023-11-02",
    description: "Wooden dining table that can seat 6 people.",
    history: [
      { date: "2023-11-02", action: "Added to inventory", user: "Jane Smith" },
      { date: "2024-01-15", action: "Reserved for Client CLT003", user: "Emma Davis" }
    ]
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

export default function ViewInventoryItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, fetch the item from an API
    // For now, we'll use the mock data
    const foundItem = mockInventoryItems.find(item => item.id === id);
    
    // Simulate API call delay
    setTimeout(() => {
      setItem(foundItem || null);
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

  if (!item) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Item Not Found</h1>
            <p className="text-muted-foreground">
              The inventory item you're looking for doesn't exist
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/inventory")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inventory
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{item.name}</h1>
          <p className="text-muted-foreground">
            Item ID: {item.id}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/inventory")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/inventory/edit/${item.id}`)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <p className="flex items-center mt-1">
                  <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                  {item.category}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p className="mt-1">{getStatusBadge(item.status)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Condition</h3>
                <p className="flex items-center mt-1">
                  <PackageCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                  {item.condition}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
                <p className="flex items-center mt-1">
                  <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
                  {item.quantity}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {item.location}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date Added</h3>
                <p className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {item.dateAdded}
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1">{item.description}</p>
            </div>

            <div className="pt-4">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => alert('Item marked as reserved')}
                  className="w-full sm:w-auto mr-2"
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Mark as Reserved
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => alert('Item assigned to request')}
                  className="w-full sm:w-auto mr-2"
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Assign to Request
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    alert('Item would be deleted');
                    navigate('/inventory');
                  }}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Item History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {item.history.map((event, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{event.action}</span>
                    <span className="text-muted-foreground">{event.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">By {event.user}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
