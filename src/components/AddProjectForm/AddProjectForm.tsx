import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema, ProjectFormValues, AddProjectFormProps } from "@/utils/types";
import { Loader2 } from "lucide-react";

const AddProjectForm: React.FC<AddProjectFormProps> = ({
  isLoading,
  onProjectSubmit,
  onSubmit,
}) => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      subtitle: "",
      description: "",
      status: "Active",
    },
  });

  function handleSubmit(values: ProjectFormValues) {
    onSubmit(values);
    form.reset(); // Optional: reset after submit
  }

  return (
    <div className="space-y-6 p-3">
      {" "}
      {/* match EditProjectForm outer container */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 py-2">
          {" "}
          {/* space-y-3 to match */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                {" "}
                {/* add spacing for each field */}
                <FormLabel>Project Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Project Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input placeholder="Optional Subtitle" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Optional description..." {...field} rows={4} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Project Image (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onProjectSubmit)}
              disabled={isLoading}
              variant="default"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" /> Saving...
                </span>
              ) : (
                "Add Project"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProjectForm;
