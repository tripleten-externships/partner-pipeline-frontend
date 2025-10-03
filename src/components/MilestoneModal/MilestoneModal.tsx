import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";   


// Define allowed statuses
type MilestoneStatus = "To-do" | "In progress" | "In review" | "Complete";

interface MilestoneModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (milestone: { title: string; status: MilestoneStatus; description: string }) => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<MilestoneStatus | "">("");
  const [description, setDescription] = useState("");

  const isValid = title.trim() !== "" && status !== "" && description.trim() !== "";

  useEffect(() => {
    if (!open) { 
      setTitle("");
      setStatus("");
      setDescription("");
    }
  }, [open]);

  const handleCreate = () => {
    if (!isValid) return;
    onCreate({
      title,
      status: status as MilestoneStatus,
      description,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Milestone</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Milestone Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Milestone Name
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter milestone name"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <Select value={status} onValueChange={(val) => setStatus(val as MilestoneStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To-do">To-do</SelectItem>
                <SelectItem value="In progress">In progress</SelectItem>
                <SelectItem value="In review">In review</SelectItem>
                <SelectItem value="Complete">Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!isValid}>
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};





