import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: string;
    name: string;
    email: string;
  };
  onDeleteSuccess?: (deletedId: string) => void;
}

/**
 * Accessible Delete Student Confirmation Modal
 *
 * Features:
 * - Radix-managed focus trap + Escape handling
 * - Screen reader friendly
 * - Prevents accidental close during delete
 * - Destructive UX best practices
 * - Toast feedback
 * - Error handling
 * - Loading states
 */
export function DeleteStudentModal({
  isOpen,
  onClose,
  student,
  onDeleteSuccess,
}: DeleteStudentModalProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Reset modal state on close
  React.useEffect(() => {
    if (!isOpen) {
      setError(null);
      setIsDeleting(false);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/waitlist/${student.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      // Safe JSON parsing
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete student.");
      }

      toast.success("Student deleted", {
        description: `${student.name} has been removed from the waitlist.`,
      });

      onDeleteSuccess?.(student.id);
      onClose();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred.";

      setError(message);

      toast.error("Delete failed", {
        description: message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isDeleting) {
      onClose();
    }
  };

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        aria-describedby="delete-student-description"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" aria-hidden="true" />
            Delete Student
          </DialogTitle>

          <DialogDescription id="delete-student-description">
            This action cannot be undone. This will permanently remove the
            student from the waitlist.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> You are about to permanently delete:
            </AlertDescription>
          </Alert>

          <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4">
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">Name</dt>
                <dd className="font-semibold">{student.name}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Email</dt>
                <dd className="font-mono text-sm">{student.email}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">ID</dt>
                <dd className="font-mono text-xs text-muted-foreground">
                  {student.id}
                </dd>
              </div>
            </dl>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Screen reader live status */}
          <div aria-live="polite" className="sr-only">
            {isDeleting ? "Deleting student" : ""}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            autoFocus
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="gap-2"
            aria-label={`Delete ${student.name} from waitlist`}
          >
            {isDeleting ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  aria-hidden="true"
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete Student
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
