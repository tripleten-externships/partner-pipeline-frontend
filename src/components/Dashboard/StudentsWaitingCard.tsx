import { useWaitlistEntries } from "@/utils/api";
import React from "react";
import DashCard from "../DashCard/DashCard";

const StudentsWaitingCard: React.FC = () => {
  const { data, loading, error } = useWaitlistEntries();

  if (loading) {
  return (
    <DashCard>
      <div className="p-4">
        <p className="text-zinc-300 text-sm">Students Waiting</p>
        <h2 className="text-3xl font-bold text-zinc-400">Loading...</h2>
        <p className="text-xs text-zinc-500 mt-1">Fetching waitlist entries</p>
      </div>
    </DashCard>
  );
}

if (error) {
  return (
    <DashCard>
      <div className="p-4">
        <p className="text-zinc-300 text-sm">Students Waiting</p>
        <h2 className="text-3xl font-bold text-red-400">Error</h2>
        <p className="text-xs text-zinc-400 mt-1">
          {error.message || "Failed to load waitlist entries"}
          </p>
      </div>
    </DashCard>
  );
}

const count = data?.waitlistEntries?.length ?? 0;

  return (
    <DashCard>
      <div className="p-4">
        <p className="text-zinc-300 text-sm">Students Waiting</p>
        <h2 className="text-3xl font-bold text-white">{count}</h2>
        <p className="text-xs text-zinc-400 mt-1">Total students on the waitlist</p>
      </div>
    </DashCard>
  );
}

export default StudentsWaitingCard;