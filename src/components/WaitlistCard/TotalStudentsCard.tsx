import React from "react";
import { Users } from "lucide-react";
import { useWaitlistEntries } from "@/utils/api";

const TotalStudentsCard: React.FC = () => {
  const { data, loading, error } = useWaitlistEntries();

  // Calculate total students
  const totalStudents = data?.waitListStudents?.length || 0;

  // Calculate breakdown by status
  const statusBreakdown =
    data?.waitListStudents?.reduce(
      (acc: Record<string, number>, entry: { status: string }) => {
        acc[entry.status] = (acc[entry.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const pendingCount = statusBreakdown.pending || 0;
  const approvedCount = statusBreakdown.approved || 0;
  const rejectedCount = statusBreakdown.rejected || 0;

  return (
    <div className="bg-zinc-1000 rounded-lg min-h-[200px] w-full overflow-hidden border border-zinc-800">
      {loading ? (
        <div className="w-full h-full animate-shimmer rounded-lg min-h-[200px]" />
      ) : error ? (
        <div className="p-4 flex items-center justify-center min-h-[200px]">
          <div className="text-red-400 text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Error loading data</p>
          </div>
        </div>
      ) : (
        <div className="p-4 min-h-[200px] flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-white leading-tight">Total Students</h3>
              <p className="text-xs text-zinc-400 leading-tight">Currently in waitlist</p>
            </div>
          </div>

          {/* Main Count */}
          <div className="mb-3">
            <div className="text-2xl font-bold text-white mb-1">{totalStudents}</div>
            <div className="text-xs text-zinc-400">students waiting</div>
          </div>

          {/* Status Breakdown */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-yellow-400">Pending</span>
              <span className="text-white font-medium">{pendingCount}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-green-400">Approved</span>
              <span className="text-white font-medium">{approvedCount}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-red-400">Rejected</span>
              <span className="text-white font-medium">{rejectedCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalStudentsCard;
