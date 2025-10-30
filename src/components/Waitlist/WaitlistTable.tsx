import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { ImportStudentsModal } from "@/components/CsvImportModal";
import { importStudentsFromCsv, useWaitlistEntries } from "@/utils/api";

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



export function WaitlistTable({ search, status }: Props) {
  const [users, setUsers] = useState<WaitlistUser[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const usersPerPage = 10;
  // Fetch real data from GraphQL
  const { data, loading, error, refetch } = useWaitlistEntries();

  useEffect(() => {
    if (!data?.waitlistEntries) return;

    // Filter based on search and status
    let filtered = data.waitlistEntries.filter(
      (user: WaitlistUser) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    if (status !== "all") {
      filtered = filtered.filter((u: WaitlistUser) => u.status === status);
    }

    // Pagination logic
    const total = Math.ceil(filtered.length / usersPerPage);
    setTotalPages(total);

    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;
    const paginated = filtered.slice(start, end);

    setUsers(paginated);
  }, [data, search, status, page]);

  const handleImportStudents = async (file: File) => {
    const result = await importStudentsFromCsv(file);

    // Show success message
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

  if (loading) {
    return <div className="text-center py-6">Loading waitlist...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-600">Error loading waitlist: {error.message}</div>
    );
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
