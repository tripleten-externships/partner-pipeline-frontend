//InviteFormModal.tsx
//Used in invite route to send emails
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type AccessLevel = "admin" | "student";

interface InviteFormModalProps {
  open: boolean;
  onCreate: (Account: { name: string; email: string; role: AccessLevel }) =>  void;
}

export const InviteFormModal: React.FC<InviteFormModalProps> = ({ open, onCreate }) => {
  const [name, setName] = useState(" ");
   const [email, setEmail] = useState(" ");
  const [role, setRole] = useState<AccessLevel | "">("");


    const validateEmail = (email: string): boolean => {
      // A common regex pattern for email validation
      // TODO: Perhaps check back end for email validation (duplicate emails)
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    };
      const isValid = name.trim() !== "" && role !== "" && validateEmail(email);

     const [validEmail, setIsValidEmail] = useState<boolean | null>(null);

       const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setIsValidEmail(validateEmail(event.target.value));
      };

  useEffect(() => {
    if (open) { 
      setName("");
      setEmail("");
      setRole("");
    }
  }, [open]); 

    const handleCreate = () => {
    if (!isValid) return;

           onCreate({
      name,
      email,
      role: role as AccessLevel,
    });
  };


  return (
    <Dialog open={open} >
      <DialogContent showCloseButton={false} className="max-w-sm sm:max-w-lg"> 
        <DialogHeader>
          <DialogTitle>Create Account Form</DialogTitle>
        </DialogHeader>

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
            {validEmail === false && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
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
              Create Account
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};