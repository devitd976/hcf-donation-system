
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { InventoryItemForm } from "@/components/inventory/InventoryItemForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  },
];

export default function EditInventoryItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
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

  const handleUpdateItem = (data: any) => {
    // In a real application, this would send data to a backend API
    console.log("Updated inventory item data:", data);
    
    toast({
      title: "Success",
      description: "Inventory item updated successfully",
    });
    
    setTimeout(() => {
      navigate("/inventory");
    }, 1000);
  };

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
          <h1 className="text-2xl font-bold tracking-tight">Edit Item</h1>
          <p className="text-muted-foreground">
            Update inventory item information
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/inventory")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inventory
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Information</CardTitle>
          <CardDescription>
            Update the form below with the item's details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InventoryItemForm initialData={item} onSubmit={handleUpdateItem} />
        </CardContent>
      </Card>
    </div>
  );
}
