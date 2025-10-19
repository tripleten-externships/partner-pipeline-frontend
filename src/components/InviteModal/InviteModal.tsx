import React, { useState } from "react";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, projectId }) => {
  const [name, setName] = useState("");
  const [cohort, setCohort] = useState<number | "">("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      if (!projectId || projectId.trim() === "") {
        setError(
          "No project selected. Please select a project first or wait for projects to load."
        );
        return;
      }

      console.log("Sending invitation for project:", projectId);

      //TODO - Not Actual Id, DONT forget
      const tempStudentId = `cm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 8)}`;

      const response = await fetch(`/api/projects/${projectId}/invitation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: tempStudentId, // TODO: Replace with real database user ID, Currently The team has no real users
          roleToGrant: role,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          maxUses: 1,
          notes: `TEST INVITATION - Name: ${name}, Cohort: ${cohort}, Role: ${role} (Generated test ID for demo)`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Invitation sent successfully:", result);

      onClose();
      setName("");
      setCohort("");
      setRole("student");
    } catch (err) {
      console.error("Failed to send invitation:", err);
      setError("Failed to send invitation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isFormValid = () => {
    return name.trim() !== "" && cohort !== "" && name !== "" && role !== "";
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center">
      <div className="bg-neutral-800 border border-neutral-50 p-4 rounded-lg max-w-md max-h-md w-full text-white relative">
        <h2 className="text-xl font-semibold mb-8">Invite Team Member</h2>
        <button
          className="absolute right-0.5 top-0.5 w-12 h-12 rounded-full flex items-center justify-center text-3xl text-white hover:text-amber-400 hover:scale-115 transition-all duration-300 ease-in-out"
          onClick={onClose}
        >
          <span style={{ lineHeight: 1, transform: "translateY(-1px)" }}>×</span>
        </button>

        <form onSubmit={handleSubmit}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-8 p-2 bg-neutral-800 border border-gray-300 text-white rounded hover:bg-neutral-500"
          >
            <option value="student" className="bg-neutral-800 text-white hover:bg-neutral-500">
              Student
            </option>
            <option value="alumni" className="bg-neutral-800 text-white hover:bg-neutral-500">
              Alumni
            </option>
            <option value="admin" className="bg-neutral-800 text-white hover:bg-neutral-500">
              Admin
            </option>
          </select>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="w-full mb-8 p-2 border border-gray-300 rounded hover:bg-neutral-500"
            required
          />
          <input
            type="number"
            value={cohort}
            onChange={(e) => setCohort(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Enter Cohort Number"
            className="w-full mb-4 p-2 border border-gray-300 rounded hover:bg-neutral-500"
            min="1"
            required
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex gap-2 mt-2 mb-2">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 disabled:opacity-50 inline-flex items-center justify-center"
            >
              {isSubmitting && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              )}
              {isSubmitting ? "Sending..." : "Send Invitation"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default InviteModal;
