import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Mail, Edit, Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import ImportStudentsModal from "@/components/CsvImportModal/CsvImportModal";
import { importStudentsFromCsv, useWaitlistEntries } from "@/utils/api";
import { mockWaitlistEntries } from "@/mocks/waitlist.mock";

interface WaitlistUser {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

interface Props {
  search: string;
  status: string;
  sendInviteButton?: React.ReactNode;
}

// FLIP TO FALSE WHEN READY TO USE REAL DATA
const USE_MOCK_DATA = true;

// Helper: format ISO date string to more readable format
const formatDate = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper: map the raw status string to a user-friendly label, use Tailwind classes for a colored "badge"
function getStatusBadge(statusRaw: string | null | undefined) {
  if (!statusRaw) {
    return { label: "unknown", className: "bg-zinc-100 text-zinc-700" };
  }
  const status = statusRaw.toLowerCase().trim();

  switch (status) {
    case "approved":
      return {
        label: "accepted",
        className: "bg-green-100 text-green-800",
      };
    case "pending":
      return {
        label: "pending",
        className: "bg-yellow-100 text-yellow-800",
      };
    case "rejected":
      return {
        label: "declined",
        className: "bg-red-100 text-red-800",
      };
    case "waiting":
      return {
        label: "waiting",
        className: "bg-blue-100 text-blue-800",
      };
    case "urgent":
      return {
        label: "urgent",
        className: "bg-orange-100 text-orange-800",
      };
    default:
      return {
        label: status,
        className: "bg-zinc-100 text-zinc-700",
      };
  }
}

// Main WaitlistTable Component:

// Compared to the old version, the "data flow" is the same:
// we still use "useWaitlistEntries()" to talk to GraphQL
// we still support search and status filters
// we still paginate locally
// we still support CSV import

// What I changed: table layout and the cells, which now match the StatusTimeline design

export function WaitlistTable({ search, status, sendInviteButton }: Props) {
  // This state holds only the filtered and paginated subset of
  // waitlist entries that we want to show on the current page:
  const [entries, setEntries] = useState<WaitlistUser[]>([]);

  // Client-side pagination state:
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;

  // CSV import modal UI state:
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  // Hook that fetches data from the backend GraphQL API.
  // Someone before me already implemented this in utils/api
  const { data, loading, error, refetch } = useWaitlistEntries();

  useEffect(() => {
    if (!data?.waitListStudents) return;

    // Full list returned by GraphQL
    // let filtered: WaitlistUser[] = data.waitListStudents;

    // mock data toggle
    const sourceEntries = USE_MOCK_DATA ? mockWaitlistEntries : (data?.waitListStudents ?? []);

    let filtered: WaitlistUser[] = sourceEntries;

    // Text search filter
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (user: WaitlistUser) =>
          user.name?.toLowerCase().includes(q) || user.email?.toLowerCase().includes(q)
      );
    }

    // Status filter ("all" means no filter)
    if (status !== "all") {
      filtered = filtered.filter(
        (u: WaitlistUser) => u.status?.toLowerCase() === status.toLowerCase()
      );
    }

    // Pagination logic
    const total = Math.ceil(filtered.length / usersPerPage);
    setTotalPages(total);

    // If the current page is now out of range, clamp it back into a valid range.
    const safePage = Math.min(page, total);
    const start = (safePage - 1) * usersPerPage;
    const end = start + usersPerPage;
    const paginated = filtered.slice(start, end);

    setPage(safePage);
    setEntries(paginated);
  }, [data, search, status, page]);

  // This is called when the user uploads a CSV file
  const handleImportStudents = async (file: File) => {
    const result = await importStudentsFromCsv(file);

    // Show success message above the table
    setImportSuccess(result.message);

    // Clear success message after 5 seconds
    setTimeout(() => setImportSuccess(null), 5000);

    // Refetch the waitlist data to show new entries
    await refetch();
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* Header with Import Button */}
      <div className="flex justify-between items-center">
        <div>
          {importSuccess && (
            <div className="text-sm text-green-600 dark:text-green-400">✓ {importSuccess}</div>
          )}
        </div>
        <div className="flex items-center">
          {sendInviteButton}
          <Button onClick={() => setIsImportModalOpen(true)} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import Students
          </Button>
        </div>
      </div>

      {/* Table */}

      {/* This is now the StatusTimeline layout */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-700">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Completion Date</th>
              <th className="px-4 py-3">Date Added</th>
              <th className="px-4 py-3">Last Contact Date</th>
              <th className="px-4 py-3">Invitations Sent</th>
              <th className="px-4 py-3">Voucher Issued</th>
              <th className="px-4 py-3">Profile on Hub</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Loading state – single row spanning all columns */}
            {loading && (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400"
                >
                  Loading waitlist entries…
                </td>
              </tr>
            )}

            {/* Error state – also inside the table body for consistent layout */}
            {!loading && error && (
              <tr>
                <td colSpan={11} className="px-4 py-6 text-center text-sm text-red-500">
                  Error loading waitlist: {error.message}
                </td>
              </tr>
            )}

            {/* Empty state – no entries after filters/pagination */}
            {!loading && !error && entries.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400"
                >
                  No students on the waitlist yet.
                </td>
              </tr>
            )}

            {/* Actual data rows */}
            {!loading &&
              !error &&
              entries.length > 0 &&
              entries.map((entry) => {
                const statusBadge = getStatusBadge(entry.status);

                return (
                  <tr
                    key={entry.id}
                    className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    {/* Name + email */}
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">
                          {entry.name || "Unnamed student"}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {entry.email || "No email"}
                        </span>
                      </div>
                    </td>

                    {/* Status pill */}
                    <td className="px-4 py-3 align-top">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusBadge.className}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>

                    {/* Program. Not in WaitlistEntry schema yet. Placeholder */}
                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400">—</td>

                    {/* Completion Date. Placeholder */}
                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400">—</td>

                    {/* Date Added. createdAt */}
                    <td className="px-4 py-3 align-top text-zinc-700 dark:text-zinc-200">
                      {formatDate(entry.createdAt)}
                    </td>

                    {/* Last Contact Date. Placeholder */}
                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400">—</td>

                    {/* Invitations Sent. Placeholder (could later map from another field) */}
                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400 text-center">
                      —
                    </td>

                    {/* Voucher Issued. Placeholder */}
                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400">—</td>

                    {/* Profile on Hub. Placeholder external-link icon */}
                    <td className="px-4 py-3 align-top text-center">
                      <button
                        type="button"
                        className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                        aria-label="Open profile on Hub"
                      >
                        ↗
                      </button>
                    </td>

                    {/* Notes. Simple uncontrolled text input for now */}
                    <td className="px-4 py-3 align-top">
                      <input
                        type="text"
                        className="w-full rounded-lg border border-zinc-200 px-2 py-1 text-xs text-zinc-700 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
                        placeholder="Add notes..."
                        // TODO: wire this up to actual notes storage later
                      />
                    </td>

                    {/* Actions with accessible icon buttons */}
                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-1">
                        <IconButton
                          Icon={Mail}
                          ariaLabel="Send email to student"
                          title="Send email"
                          onClick={() => {
                            /* TODO: Implement email functionality */
                          }}
                        />
                        <IconButton
                          Icon={Edit}
                          ariaLabel="Edit student information"
                          title="Edit"
                          onClick={() => {
                            /* TODO: Implement edit functionality */
                          }}
                        />
                        <IconButton
                          Icon={Trash2}
                          ariaLabel="Delete student from waitlist"
                          title="Delete"
                          variant="danger"
                          onClick={() => {
                            /* TODO: Implement delete functionality */
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Page {page} of {totalPages}
        </p>

        <div className="space-x-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-3 py-1 rounded border ${
              page === 1
                ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            }`}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded border ${
              page === totalPages
                ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Import Modal */}
      <ImportStudentsModal
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportStudents}
      />
    </div>
  );
}
