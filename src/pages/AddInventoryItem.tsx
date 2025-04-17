
import React from "react";
import { useNavigate } from "react-router-dom";
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

export default function AddInventoryItem() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddItem = (data: any) => {
    // In a real application, this would send data to a backend API
    console.log("Inventory item data to be saved:", data);
    
    toast({
      title: "Success",
      description: "Inventory item added successfully",
    });
    
    setTimeout(() => {
      navigate("/inventory");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Item</h1>
          <p className="text-muted-foreground">
            Enter item information to add it to the inventory
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
            Fill out the form below with the item's details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InventoryItemForm onSubmit={handleAddItem} />
        </CardContent>
      </Card>
    </div>
  );
}
