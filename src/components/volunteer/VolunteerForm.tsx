
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Define the schema for volunteer
const volunteerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Please enter a valid address" }),
  skills: z.array(z.string()).min(1, { message: "Select at least one skill" }),
  availability: z.string().min(1, { message: "Please specify availability" }),
  status: z.enum(["active", "inactive", "pending"]),
  startDate: z.date(),
  emergencyContact: z.string().min(5, { message: "Please provide emergency contact information" }),
  notes: z.string().optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

// List of skills
const skillOptions = [
  { id: "driving", label: "Driving" },
  { id: "lifting", label: "Lifting" },
  { id: "it", label: "IT" },
  { id: "customer-service", label: "Customer Service" },
  { id: "organization", label: "Organization" },
  { id: "inventory", label: "Inventory" },
  { id: "documentation", label: "Documentation" },
  { id: "translation-french", label: "Translation (French)" },
  { id: "translation-spanish", label: "Translation (Spanish)" },
  { id: "translation-arabic", label: "Translation (Arabic)" },
  { id: "admin", label: "Admin" },
  { id: "maintenance", label: "Maintenance" },
];

interface VolunteerFormProps {
  defaultValues?: any;
  onSubmit: (data: VolunteerFormValues) => void;
  isEditing?: boolean;
}

export function VolunteerForm({ defaultValues, onSubmit, isEditing = false }: VolunteerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse the defaultValues for skills and startDate
  let parsedDefaultValues = defaultValues;
  if (defaultValues) {
    const skillsArray = Array.isArray(defaultValues.skills)
      ? defaultValues.skills.map((skill: string) => 
          skillOptions.find(opt => opt.label === skill)?.id || 
          skill.toLowerCase().replace(/\s+/g, "-"))
      : [];

    parsedDefaultValues = {
      ...defaultValues,
      skills: skillsArray,
      startDate: defaultValues.startDate ? new Date(defaultValues.startDate) : new Date(),
    };
  }

  // Create form
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: parsedDefaultValues || {
      name: "",
      email: "",
      phone: "",
      address: "",
      skills: [],
      availability: "",
      status: "active",
      startDate: new Date(),
      emergencyContact: "",
      notes: "",
    },
  });

  const handleFormSubmit = (data: VolunteerFormValues) => {
    setIsSubmitting(true);
    
    // Convert skills IDs back to labels for API
    const formattedData = {
      ...data,
      skills: data.skills.map(skillId => 
        skillOptions.find(opt => opt.id === skillId)?.label || skillId
      ),
    };
    
    // Simulate API delay
    setTimeout(() => {
      onSubmit(formattedData);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium">Personal Information</h3>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (XXX) XXX-XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Name, relationship, phone number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Example: Jane Smith, Sister, +1 (XXX) XXX-XXXX
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Volunteer Information */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium">Volunteer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. Weekends, Mon/Wed/Fri, Evenings" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter when the volunteer is available to help
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Skills</FormLabel>
                    <FormDescription>
                      Select all skills that apply
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skillOptions.map((skill) => (
                      <FormField
                        key={skill.id}
                        control={form.control}
                        name="skills"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={skill.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(skill.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, skill.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== skill.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {skill.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information about the volunteer"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-hwf-purple hover:bg-hwf-purple-dark"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Volunteer" : "Add Volunteer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
