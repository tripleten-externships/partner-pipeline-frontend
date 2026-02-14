// InviteFormModal.tsx
// Modal to send users invitations
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useWaitlistEntries, sendUserInvitation } from "@/utils/api";

type AccessLevel = "admin" | "student";

interface WaitlistStudent {
  id: string;
  name: string;
  email: string;
  status: string;
}

interface InviteFormModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  onCreate?: (Account: { name: string; email: string; role: AccessLevel }) => void;
}

export const InviteFormModal: React.FC<InviteFormModalProps> = ({
  open,
  onClose,
  projectId,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AccessLevel | "">("");
  const [validEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [selectedWaitlistStudent, setSelectedWaitlistStudent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { data: waitlistData } = useWaitlistEntries();
  const waitlistStudents: WaitlistStudent[] = waitlistData?.waitListStudents ?? [];

  //Validate Email by comparing regex to email input
  const validateEmail = (email: string): boolean => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  //Form is valid only when these conditions are met
  const isValid =
    name.trim() !== "" && role !== "" && validateEmail(email) && projectId.trim() !== "";

  //Ran anytime email field is being modified
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsValidEmail(validateEmail(event.target.value));
  };

  // Handle waitlist student selection
  const handleWaitlistStudentChange = (studentId: string) => {
    setSelectedWaitlistStudent(studentId);
    if (studentId && studentId !== "manual") {
      const student = waitlistStudents.find((s) => s.id === studentId);
      if (student) {
        setName(student.name);
        setEmail(student.email);
        setIsValidEmail(true);
      }
    } else {
      setName("");
      setEmail("");
      setIsValidEmail(null);
    }
  };

  //When initially open
  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setRole("");
      setIsValidEmail(null);
      setSelectedWaitlistStudent("");
      setError("");
      setIsSubmitting(false);
    }
  }, [open]);

  //When created
  const handleCreate = async () => {
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (!projectId || projectId.trim() === "") {
        setError("Please select a project from the sidebar before sending an invitation.");
        setIsSubmitting(false);
        return;
      }

      // Call the API
      await sendUserInvitation(projectId, {
        name,
        email,
        roleToGrant: role,
      });

      // Call optional onCreate callback
      if (onCreate) {
        onCreate({ name, email, role: role as AccessLevel });
      }

      // Reset and close
      setName("");
      setEmail("");
      setRole("");
      setIsValidEmail(null);
      setSelectedWaitlistStudent("");
      setError("");

      alert(`Success! An invitation has been sent to ${email}.`);

      onClose();
    } catch (err) {
      console.error("Failed to send invitation:", err);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(
        `Unable to send invitation: ${errorMessage}. Please try again or contact support if the problem persists.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Send Invitation</h2>
            <p className="text-sm text-zinc-400 mt-1">Invite a student to join the project</p>
          </div>

          <div className="space-y-4">
            {/* Project Selection Warning */}
            {!projectId && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3 text-sm text-yellow-400">
                Please select a project from the sidebar before sending an invitation.
              </div>
            )}

            {/* Waitlist Student Selection */}
            {waitlistStudents.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Select from Waitlist (Optional)
                </label>
                <Select value={selectedWaitlistStudent} onValueChange={handleWaitlistStudentChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a student from the waitlist or enter manually" />
                  </SelectTrigger>
                  <SelectContent className="z-[60]">
                    <SelectItem value="manual">Enter Manually</SelectItem>
                    {waitlistStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name of Invitee"
                required
                disabled={selectedWaitlistStudent !== "" && selectedWaitlistStudent !== "manual"}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email of Invitee"
                required
                disabled={selectedWaitlistStudent !== "" && selectedWaitlistStudent !== "manual"}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              {validEmail === false && (
                <p className="text-red-400 text-xs mt-1">Please enter a valid email address.</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Account Role</label>
              <Select value={role} onValueChange={(val) => setRole(val as AccessLevel)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role for Invitee" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                onClick={handleCreate}
                disabled={!isValid || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? "Sending..." : "Send Invite"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
