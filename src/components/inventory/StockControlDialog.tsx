
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  History,
  Truck,
  BarChart2
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type StockControlDialogProps = {
  item: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function StockControlDialog({ item, open, onOpenChange }: StockControlDialogProps) {
  const { toast } = useToast();
  const [action, setAction] = useState("add");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("donation");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      
      const actionText = action === "add" ? "added to" : "removed from";
      
      toast({
        title: "Stock Updated",
        description: `${quantity} ${item.name} ${actionText} inventory`,
      });
      
      onOpenChange(false);
    }, 1000);
  };

  const mockTransactionHistory = [
    { date: "2024-04-10", type: "add", quantity: 2, reason: "donation", by: "Jane Smith" },
    { date: "2024-03-15", type: "remove", quantity: 1, reason: "assigned", by: "John Doe" },
  ];
  
  const stockLevels = [
    { month: "Jan", stock: 3 },
    { month: "Feb", stock: 5 },
    { month: "Mar", stock: 4 },
    { month: "Apr", stock: item.quantity },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Stock Control: {item.name}</DialogTitle>
          <DialogDescription>
            Update inventory quantities and view stock history
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="update">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="update">Update Stock</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="update" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Action</label>
                  <Select
                    value={action}
                    onValueChange={setAction}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                          Add Stock
                        </div>
                      </SelectItem>
                      <SelectItem value="remove">
                        <div className="flex items-center">
                          <ArrowDownRight className="h-4 w-4 mr-2 text-red-500" />
                          Remove Stock
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>
                <Select
                  value={reason}
                  onValueChange={setReason}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {action === "add" ? (
                      <>
                        <SelectItem value="donation">Donation Received</SelectItem>
                        <SelectItem value="purchase">New Purchase</SelectItem>
                        <SelectItem value="return">Returned Item</SelectItem>
                        <SelectItem value="correction">Inventory Correction</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="assigned">Assigned to Client</SelectItem>
                        <SelectItem value="damaged">Damaged/Disposed</SelectItem>
                        <SelectItem value="lost">Lost/Missing</SelectItem>
                        <SelectItem value="correction">Inventory Correction</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Current Stock</h3>
                <div className="flex items-center gap-2 border p-2 rounded-md">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <span className="text-lg font-semibold">{item.quantity}</span>
                  </div>
                  <div className="text-sm">
                    <div>Location: {item.location}</div>
                    <div>Status: {item.status}</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="border rounded-md divide-y">
                {mockTransactionHistory.map((transaction, index) => (
                  <div key={index} className="p-3 flex items-start">
                    <div className={`mr-3 mt-1 ${transaction.type === 'add' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type === 'add' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {transaction.type === 'add' ? 'Added' : 'Removed'} {transaction.quantity}
                        </span>
                        <span className="text-sm text-muted-foreground">{transaction.date}</span>
                      </div>
                      <div className="text-sm">Reason: {transaction.reason}</div>
                      <div className="text-xs text-muted-foreground">By: {transaction.by}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {mockTransactionHistory.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No transaction history available</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Stock Level Trend</h3>
              <div className="h-32 border rounded-md p-2">
                <div className="h-full flex items-end justify-around">
                  {stockLevels.map((level, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-hwf-purple w-8" 
                        style={{ height: `${(level.stock / 5) * 100}%`, minHeight: '10%' }}
                      ></div>
                      <div className="text-xs mt-1">{level.month}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="border rounded-md p-3 text-center">
                  <div className="text-sm text-muted-foreground">Avg. Monthly Usage</div>
                  <div className="text-lg font-semibold">1.5 units</div>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <div className="text-sm text-muted-foreground">Recommended Stock</div>
                  <div className="text-lg font-semibold">3 units</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {/* Only show update button on the update tab */}
          <Tabs.Content value="update">
            <Button 
              type="button" 
              onClick={handleSubmit}
              disabled={loading || quantity < 1}
              className="bg-hwf-purple hover:bg-hwf-purple-dark"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>Update Stock</>
              )}
            </Button>
          </Tabs.Content>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
