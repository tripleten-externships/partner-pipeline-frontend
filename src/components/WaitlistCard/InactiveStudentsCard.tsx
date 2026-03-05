import React from "react";
import { AlertTriangle, Users, Clock } from "lucide-react";
import DashCard from "@/components/DashCard/DashCard";
import { useStudents } from "@/utils/api";
interface Student {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  reminder_count: number;
  isActive: boolean;
  lastLoginDate: string;
  createdAt: string;
}
export const InactiveStudentsCard: React.FC = () => {
  const { data, loading, error } = useStudents();

  // Calculate inactive students metrics
  const calculateMetrics = () => {
    if (!data?.users)
      return {
        totalInactive: 0,
        unresponsive: 0,
        longInactive: 0,
      };

    const students: Student[] = data.users;

    // Students with "Unresponsive" status (reminder_count > 2)
    const unresponsive = students.filter(
      (student: Student) => student.status === "Unresponsive"
    ).length;

    // Students who haven't logged in for 30+ days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const longInactive = students.filter((student: Student) => {
      if (!student.lastLoginDate) return true; // Never logged in
      const lastLogin = new Date(student.lastLoginDate);
      return lastLogin < thirtyDaysAgo;
    }).length;

    // Students marked as inactive OR unresponsive
    const totalInactive = students.filter(
      (student: Student) => !student.isActive || student.status === "Unresponsive"
    ).length;

    return { totalInactive, unresponsive, longInactive };
  };

  const { totalInactive, unresponsive, longInactive } = calculateMetrics();

  if (loading) {
    return (
      <DashCard>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Inactive Students
            </h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Loading...</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Calculating metrics</p>
          </div>
        </div>
      </DashCard>
    );
  }

  if (error) {
    return (
      <DashCard>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Inactive Students
            </h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">Error</p>
            <p className="text-xs text-red-500 dark:text-red-500 mt-1">Failed to load data</p>
          </div>
        </div>
      </DashCard>
    );
  }

  return (
    <DashCard>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Inactive Students
          </h3>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalInactive}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-red-500" />
              <span className="text-xs text-zinc-500 dark:text-zinc-500">
                {unresponsive} Unresponsive
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-orange-500" />
              <span className="text-xs text-zinc-500 dark:text-zinc-500">
                {longInactive} 30+ days
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashCard>
  );
};
