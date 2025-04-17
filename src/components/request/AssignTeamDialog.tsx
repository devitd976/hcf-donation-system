
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Users,
  User
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

type AssignTeamDialogProps = {
  request: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Mock team data
const mockTeams = [
  { 
    id: "team1", 
    name: "Delivery",
    members: [
      { id: "STF001", name: "John Smith", role: "Team Lead" },
      { id: "STF006", name: "Michael Brown", role: "Driver" },
      { id: "STF007", name: "Jessica Williams", role: "Assistant" }
    ]
  },
  { 
    id: "team2", 
    name: "Assessment",
    members: [
      { id: "STF002", name: "Emma Davis", role: "Team Lead" },
      { id: "STF008", name: "David Thompson", role: "Assessor" },
      { id: "STF009", name: "Emily Wilson", role: "Assistant" }
    ]
  },
  { 
    id: "team3", 
    name: "IT",
    members: [
      { id: "STF003", name: "Robert Johnson", role: "Team Lead" },
      { id: "STF010", name: "James Anderson", role: "Technician" }
    ]
  },
  { 
    id: "team4", 
    name: "Kitchen",
    members: [
      { id: "STF004", name: "Olivia Chen", role: "Team Lead" },
      { id: "STF011", name: "Maria Garcia", role: "Assistant" }
    ]
  },
];

export function AssignTeamDialog({ request, open, onOpenChange }: AssignTeamDialogProps) {
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState(request.team || "");
  const [selectedMember, setSelectedMember] = useState(request.assignedTo || "");
  const [loading, setLoading] = useState(false);

  const team = mockTeams.find(t => t.name === selectedTeam);

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Team Assigned",
        description: `Request assigned to ${selectedTeam} team and ${selectedMember || "no specific member"}`,
      });
      
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Team</DialogTitle>
          <DialogDescription>
            Select a team and team member to handle this request
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Team</label>
            <Select
              value={selectedTeam}
              onValueChange={setSelectedTeam}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {mockTeams.map((team) => (
                  <SelectItem key={team.id} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {team && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Team Member</label>
              <Select
                value={selectedMember}
                onValueChange={setSelectedMember}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a team member (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No specific person</SelectItem>
                  {team.members.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {member.name} ({member.role})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {team && (
            <div className="border rounded-md p-3 mt-4">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Team Members
              </h3>
              <div className="space-y-2">
                {team.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit}
            disabled={loading || !selectedTeam}
            className="bg-hwf-purple hover:bg-hwf-purple-dark"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Assigning...
              </>
            ) : (
              <>Assign Team</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
