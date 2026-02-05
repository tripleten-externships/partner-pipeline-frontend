import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Mail, Edit, Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import ImportStudentsModal from "@/components/CsvImportModal/CsvImportModal";
import { importStudentsFromCsv, useWaitlistEntries } from "@/utils/api";
import { mockWaitlistEntries } from "@/mocks/waitlist.mock";

import StudentStatusModal, {
  type Student,
} from "@/components/StudentStatusModal/StudentStatusModal";

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

// Helper: map the raw status string to a user-friendly label
function getStatusBadge(statusRaw: string | null | undefined) {
  if (!statusRaw) {
    return { label: "unknown", className: "bg-zinc-100 text-zinc-700" };
  }
  const status = statusRaw.toLowerCase().trim();

  switch (status) {
    case "approved":
      return { label: "accepted", className: "bg-green-100 text-green-800" };
    case "pending":
      return { label: "pending", className: "bg-yellow-100 text-yellow-800" };
    case "rejected":
      return { label: "declined", className: "bg-red-100 text-red-800" };
    case "waiting":
      return { label: "waiting", className: "bg-blue-100 text-blue-800" };
    case "urgent":
      return { label: "urgent", className: "bg-orange-100 text-orange-800" };
    default:
      return { label: status, className: "bg-zinc-100 text-zinc-700" };
  }
}

export function WaitlistTable({ search, status }: Props) {
  const [entries, setEntries] = useState<WaitlistUser[]>([]);

  // Pagination state:
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;

  // CSV import modal state:
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Hook that fetches waitlist entries
  const { data, loading, error, refetch } = useWaitlistEntries();

  useEffect(() => {
    if (!data?.waitlistEntries) return;

    const sourceEntries = USE_MOCK_DATA ? mockWaitlistEntries : (data?.waitlistEntries ?? []);
    let filtered: WaitlistUser[] = sourceEntries;

    // search filter
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (user: WaitlistUser) =>
          user.name?.toLowerCase().includes(q) || user.email?.toLowerCase().includes(q)
      );
    }

    // status filter
    if (status !== "all") {
      filtered = filtered.filter(
        (u: WaitlistUser) => u.status?.toLowerCase() === status.toLowerCase()
      );
    }

    // pagination
    const total = Math.ceil(filtered.length / usersPerPage);
    setTotalPages(total);

    const safePage = Math.min(page, total);
    const start = (safePage - 1) * usersPerPage;
    const end = start + usersPerPage;
    const paginated = filtered.slice(start, end);

    setPage(safePage);
    setEntries(paginated);
  }, [data, search, status, page]);

  // CSV import handler
  const handleImportStudents = async (file: File) => {
    const result = await importStudentsFromCsv(file);
    setImportSuccess(result.message);
    setTimeout(() => setImportSuccess(null), 5000);
    await refetch();
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  function toStudent(entry: WaitlistUser): Student {
    return {
      id: entry.id,
      email: entry.email,

      // status in your table is like waiting/pending/approved/rejected/urgent
      // we cast to Student["status"] to match the modal type
      status: (entry.status?.toLowerCase() as Student["status"]) || "waiting",

      // These fields are NOT in WaitlistUser yet, so we use placeholders for now.
      // Later you will replace them with real fields from backend.
      program: "SE",
      invitesSent: 0,
      completionDate: "",
      lastContactDate: "",

      // Your waitlist uses createdAt; modal expects dateAdded
      dateAdded: entry.createdAt,

      voucherIssued: "",
      profileUrl: "",
      notes: "",
    };
  }

  function openEdit(entry: WaitlistUser) {
    setSelectedStudent(toStudent(entry));
    setIsEditOpen(true);
  }

  return (
    <div className="space-y-4">
      {/* Header with Import Button */}
      <div className="flex justify-between items-center">
        <div>
          {importSuccess && (
            <div className="text-sm text-green-600 dark:text-green-400">✓ {importSuccess}</div>
          )}
        </div>

        <Button onClick={() => setIsImportModalOpen(true)} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Import Students
        </Button>
      </div>

      {/* Table */}
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

            {!loading && error && (
              <tr>
                <td colSpan={11} className="px-4 py-6 text-center text-sm text-red-500">
                  Error loading waitlist: {error.message}
                </td>
              </tr>
            )}

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

                    <td className="px-4 py-3 align-top">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusBadge.className}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>

                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400">—</td>
                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400">—</td>

                    <td className="px-4 py-3 align-top text-zinc-700 dark:text-zinc-200">
                      {formatDate(entry.createdAt)}
                    </td>

                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400">—</td>
                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400 text-center">
                      —
                    </td>
                    <td className="px-4 py-3 align-top text-zinc-500 dark:text-zinc-400">—</td>

                    <td className="px-4 py-3 align-top text-center">
                      <button
                        type="button"
                        className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                        aria-label="Open profile on Hub"
                      >
                        ↗
                      </button>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <input
                        type="text"
                        className="w-full rounded-lg border border-zinc-200 px-2 py-1 text-xs text-zinc-700 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
                        placeholder="Add notes..."
                      />
                    </td>

                    {/* Actions. Simple emoji placeholders for now */}
                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-1">
                        <IconButton
                          Icon={Mail}
                          ariaLabel="Send email to student"
                          title="Send email"
                        >
                          ✉️
                        </button>
                        <button
                          type="button"
                          className="hover:text-zinc-800 dark:hover:text-zinc-100"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button type="button" className="hover:text-red-600" title="Delete">
                          🗑️
                        </button>
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

      {/* Only show it when we actually selected a student */}
      {selectedStudent && (
        <StudentStatusModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          student={selectedStudent}
        />
      )}

      {/* Import Modal */}
      <ImportStudentsModal
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportStudents}
      />
    </div>
  );
}
