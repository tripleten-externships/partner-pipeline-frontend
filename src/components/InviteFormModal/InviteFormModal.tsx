// InviteFormModal.tsx
// Modal to send users invitations
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type AccessLevel = "admin" | "student";

interface InviteFormModalProps {
  open: boolean;
  onCreate: (Account: { name: string; email: string; role: AccessLevel }) => void;
}

export const InviteFormModal: React.FC<InviteFormModalProps> = ({ open, onCreate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AccessLevel | "">("");
  const [validEmail, setIsValidEmail] = useState<boolean | null>(null); //Flag to set when email field is valid or invalid


  //Validate Email by comparing regex to email input
  const validateEmail = (email: string): boolean => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  //Form is valid only when these conditions are met
  const isValid = name.trim() !== "" && role !== "" && validateEmail(email);

  //Ran anytime email field is being modified
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsValidEmail(validateEmail(event.target.value));
  };

  //When intially open
  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setRole("");
      setIsValidEmail(null);
    }
  }, [open]);

  //When created 
  const handleCreate = () => {
    if (!isValid) return;
    onCreate({ name, email, role: role as AccessLevel });
    setName("");
    setEmail("");
    setRole("");
    setIsValidEmail(null);
  };

  if (!open) return null;

  return (
    <div
      className="
        pointer-events-auto
        max-w-sm sm:max-w-lg
        bg-background-black/50 rounded-lg p-6 shadow-lg
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        z-50
        bg-black/50
        border-5
      "
    >
      <div className="mb-4 text-lg font-semibold">Send Invites</div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
          {validEmail === false && <p className="text-red-500">Please enter a valid email address.</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Account Role
          </label>
          <Select value={role} onValueChange={(val) => setRole(val as AccessLevel)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button onClick={handleCreate} disabled={!isValid}>
            Send Invite
          </Button>
        </div>
      </div>
    </div>
  );
};

