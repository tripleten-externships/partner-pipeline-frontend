import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { ImportStudentsModal } from "@/components/CsvImportModal";
import { importStudentsFromCsv } from "@/utils/api";

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

// Mock data (11 users)
const mockData: WaitlistUser[] = [
  {
    id: "1",
    name: "Sarah Kim",
    email: "sarah@example.com",
    status: "pending",
    createdAt: "2025-10-12",
  },
  {
    id: "2",
    name: "David Lee",
    email: "david@example.com",
    status: "approved",
    createdAt: "2025-10-11",
  },
  {
    id: "3",
    name: "Anna Wong",
    email: "anna@example.com",
    status: "rejected",
    createdAt: "2025-10-10",
  },
  {
    id: "4",
    name: "John Doe",
    email: "john@example.com",
    status: "pending",
    createdAt: "2025-10-09",
  },
  {
    id: "5",
    name: "Mia Chen",
    email: "mia@example.com",
    status: "approved",
    createdAt: "2025-10-08",
  },
  {
    id: "6",
    name: "Leo Park",
    email: "leo@example.com",
    status: "pending",
    createdAt: "2025-10-07",
  },
  {
    id: "7",
    name: "Sophia Nguyen",
    email: "sophia@example.com",
    status: "approved",
    createdAt: "2025-10-06",
  },
  {
    id: "8",
    name: "Ethan Brown",
    email: "ethan@example.com",
    status: "rejected",
    createdAt: "2025-10-05",
  },
  {
    id: "9",
    name: "Grace Lin",
    email: "grace@example.com",
    status: "approved",
    createdAt: "2025-10-04",
  },
  {
    id: "10",
    name: "Olivia Smith",
    email: "olivia@example.com",
    status: "pending",
    createdAt: "2025-10-03",
  },
  {
    id: "11",
    name: "Liam Johnson",
    email: "liam@example.com",
    status: "pending",
    createdAt: "2025-10-02",
  },
];

export function WaitlistTable({ search, status }: Props) {
  const [users, setUsers] = useState<WaitlistUser[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const usersPerPage = 10;

  useEffect(() => {
    // filter
    let filtered = mockData.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    if (status !== "all") {
      filtered = filtered.filter((u) => u.status === status);
    }

    // pagination logic
    const total = Math.ceil(filtered.length / usersPerPage);
    setTotalPages(total);

    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;
    const paginated = filtered.slice(start, end);

    setUsers(paginated);
  }, [search, status, page]);

  const handleImportStudents = async (file: File) => {
    const result = await importStudentsFromCsv(file);

    // Show success message
    setImportSuccess(result.message);

    // Clear success message after 5 seconds
    setTimeout(() => setImportSuccess(null), 5000);

    // TODO: Refresh the waitlist data from backend
    // For now, we'll keep using mock data until backend is ready
    // When backend is ready, add a refetch function here
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
        <Button onClick={() => setIsImportModalOpen(true)} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Import Students
        </Button>
      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 w-16">
                #
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                Name
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                Email
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                Status
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {(page - 1) * usersPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.status}</td>
                  <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No results found.
                </td>
              </tr>
            )}
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
