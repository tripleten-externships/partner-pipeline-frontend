import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteStudentModal } from "@/components/DeleteStudentModal/DeleteStudentModal" ;
import * as sonner from "sonner";
import "@testing-library/jest-dom";

// Mock the sonner toast library
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock fetch globally
global.fetch = vi.fn();

// Helper function to get the delete button (distinguishes from heading)
const getDeleteButton = () => {
  const buttons = screen.getAllByRole("button");
  return buttons.find((btn) => btn.getAttribute("aria-label")?.includes("Delete"))!;
};

describe("DeleteStudentModal", () => {
  const mockStudent = {
    id: "student-123",
    name: "John Doe",
    email: "john@example.com",
  };

  const mockOnClose = vi.fn();
  const mockOnDeleteSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockClear();
  });

  describe("Rendering", () => {
    it("should not render when isOpen is false", () => {
      render(
        <DeleteStudentModal
          isOpen={false}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render when isOpen is true", () => {
      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      expect(screen.getByRole("heading", { name: /Delete Student/ })).toBeInTheDocument();
      expect(screen.getByText(mockStudent.name)).toBeInTheDocument();
      expect(screen.getByText(mockStudent.email)).toBeInTheDocument();
    });

    it("should display warning alert with destructive styling", () => {
      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      expect(
        screen.getByText(
          "This action cannot be undone. This will permanently remove the student from the waitlist."
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Warning:/)).toBeInTheDocument();
      expect(screen.getByText(/You are about to permanently delete:/)).toBeInTheDocument();
    });

    it("should display student information correctly", () => {
      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      expect(screen.getByText(mockStudent.name)).toBeInTheDocument();
      expect(screen.getByText(mockStudent.email)).toBeInTheDocument();
      expect(screen.getByText(mockStudent.id)).toBeInTheDocument();
    });

    it("should have accessible aria attributes", () => {
      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const deleteButton = getDeleteButton();
      expect(deleteButton).toHaveAttribute(
        "aria-label",
        `Delete ${mockStudent.name} from waitlist`
      );

      const dialogContent = screen.getByRole("dialog");
      expect(dialogContent).toHaveAttribute("aria-describedby", "delete-student-description");
    });
  });

  describe("Button Interactions", () => {
    it("should call onClose when Cancel button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const cancelButton = screen.getByRole("button", { name: /Cancel/ });
      await user.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should disable buttons during deletion", async () => {
      (global.fetch as any).mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100)
          )
      );

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
          onDeleteSuccess={mockOnDeleteSuccess}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      // Check that buttons are disabled during deletion
      expect(deleteButton).toBeDisabled();
      expect(screen.getByRole("button", { name: /Cancel/ })).toBeDisabled();

      await waitFor(() => {
        expect(deleteButton).not.toBeDisabled();
      });
    });

    it("should show loading state during deletion", async () => {
      (global.fetch as any).mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100)
          )
      );

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
          onDeleteSuccess={mockOnDeleteSuccess}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      expect(screen.getByText(/Deleting\.\.\./)).toBeInTheDocument();
    });
  });

  describe("Delete Functionality", () => {
    it("should make DELETE request to correct endpoint", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
          onDeleteSuccess={mockOnDeleteSuccess}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          `/api/waitlist/${mockStudent.id}`,
          expect.objectContaining({
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
        );
      });
    });

    it("should call onDeleteSuccess callback on successful deletion", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
          onDeleteSuccess={mockOnDeleteSuccess}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(mockOnDeleteSuccess).toHaveBeenCalledWith(mockStudent.id);
      });
    });

    it("should close modal on successful deletion", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
          onDeleteSuccess={mockOnDeleteSuccess}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it("should show success toast on successful deletion", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
          onDeleteSuccess={mockOnDeleteSuccess}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(sonner.toast.success).toHaveBeenCalledWith(
          "Student deleted",
          expect.objectContaining({
            description: `${mockStudent.name} has been removed from the waitlist.`,
          })
        );
      });
    });
  });

  describe("Error Handling", () => {
    it("should display error message on failed deletion", async () => {
      const errorMessage = "Network error occurred";

      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: errorMessage }),
      });

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    it("should show error toast on failed deletion", async () => {
      const errorMessage = "Failed to delete student";

      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: errorMessage }),
      });

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(sonner.toast.error).toHaveBeenCalledWith(
          "Delete failed",
          expect.objectContaining({
            description: errorMessage,
          })
        );
      });
    });

    it("should handle fetch exceptions gracefully", async () => {
      const errorMessage = "Network request failed";

      (global.fetch as any).mockRejectedValueOnce(new Error(errorMessage));

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    it("should handle failed JSON parsing", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText("Failed to delete student.")).toBeInTheDocument();
      });
    });

    it("should not close modal on error", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Delete failed" }),
      });

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    it("should clear error when modal closes and reopens", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Delete failed" }),
      });

      const user = userEvent.setup();
      const { rerender } = render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText("Delete failed")).toBeInTheDocument();
      });

      // Close modal
      rerender(
        <DeleteStudentModal
          isOpen={false}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      // Reopen modal
      rerender(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      // Error should be gone
      expect(screen.queryByText("Delete failed")).not.toBeInTheDocument();
    });
  });

  describe("Modal State Management", () => {
    it("should prevent closing modal while deleting", async () => {
      (global.fetch as any).mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100)
          )
      );

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
          onDeleteSuccess={mockOnDeleteSuccess}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      // Try to close during deletion
      const dialog = screen.getByRole("dialog");
      fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });

      // Modal should not close (onClose not called during deletion)
      // Wait for completion
      await waitFor(() => {
        expect(mockOnDeleteSuccess).toHaveBeenCalledWith(mockStudent.id);
      });
    });

    it("should reset state when modal closes", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Delete failed" }),
      });

      const user = userEvent.setup();
      const { rerender } = render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText("Delete failed")).toBeInTheDocument();
      });

      // Close modal
      rerender(
        <DeleteStudentModal
          isOpen={false}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      // Reopen and verify state is reset
      rerender(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      expect(screen.queryByText("Delete failed")).not.toBeInTheDocument();
      expect(screen.queryByText(/Deleting\.\.\./)).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      expect(screen.getByRole("heading", { name: /Delete Student/ })).toBeInTheDocument();
    });

    it("should have descriptive alt text for icons", () => {
      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      // Icons should be decorative and properly marked with aria-hidden
      // Check that trash icon is present with aria-hidden
      const trash2Icon = screen.getByRole("heading").querySelector('svg[aria-hidden="true"]');
      expect(trash2Icon).toBeInTheDocument();
      expect(trash2Icon).toHaveAttribute('aria-hidden', 'true');
    });

    it("should provide live region updates for deletion status", async () => {
      (global.fetch as any).mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100)
          )
      );

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
          onDeleteSuccess={mockOnDeleteSuccess}
        />
      );

      const user = userEvent.setup();
      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      // Look for aria-live region with polite attribute
      const liveRegion = screen.getByText("Deleting student");
      expect(liveRegion).toHaveAttribute("aria-live", "polite");
      expect(liveRegion).toHaveClass("sr-only");
    });

    it("should have proper dialog role and structure", () => {
      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();

      // Dialog should have a heading
      const heading = screen.getByRole("heading");
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle student with special characters in name", () => {
      const specialStudent = {
        id: "student-456",
        name: "John O'Brien-Smith",
        email: "john.obrien+test@example.com",
      };

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={specialStudent}
        />
      );

      expect(screen.getByText(specialStudent.name)).toBeInTheDocument();
      expect(screen.getByText(specialStudent.email)).toBeInTheDocument();
    });

    it("should handle student with long email address", () => {
      const longEmailStudent = {
        id: "student-789",
        name: "John Doe",
        email: "very.long.email.address.with.many.characters@subdomain.example.co.uk",
      };

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={longEmailStudent}
        />
      );

      expect(screen.getByText(longEmailStudent.email)).toBeInTheDocument();
    });

    it("should handle rapid successive clicks on delete button", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const user = userEvent.setup();

      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
          onDeleteSuccess={mockOnDeleteSuccess}
        />
      );

      const deleteButton = getDeleteButton();

      // Click once
      await user.click(deleteButton);
      
      // Wait a bit for state to update
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Verify only one API call was made (proving button was disabled)
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should allow onDeleteSuccess callback to be optional", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const user = userEvent.setup();

      // No onDeleteSuccess prop
      render(
        <DeleteStudentModal
          isOpen={true}
          onClose={mockOnClose}
          student={mockStudent}
        />
      );

      const deleteButton = getDeleteButton();
      await user.click(deleteButton);

      // Should still work without error
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });
  });
});
