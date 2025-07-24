import React, {forwardRef} from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { EditProjectFormProps, ProjectStatus } from '@/utils/types';

const EditProjectForm = forwardRef<HTMLDivElement, EditProjectFormProps>(
  (
    {
      formData,
      isLoading,
      onChange,
      onCancel,
      onSubmit,
    },
    ref
  ) => {
    

  return (
    <div ref={ref} className="space-y-6 p-3">
      <div className="space-y-3">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => onChange('status', value as ProjectStatus)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Paused">Paused</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-6">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" /> Saving...
            </span>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
});

EditProjectForm.displayName = 'EditProjectForm';

export default EditProjectForm;


