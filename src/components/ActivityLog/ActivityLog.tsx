import React from "react";
import { useActivityLogs } from "@/utils/api";

type Props = {
  selectedProjectId?: string;
};

const mapStatus = (s?: string) => {
  switch (s) {
    case "not_started":
      return "Not started";
    case "in_progress":
      return "In progress";
    case "completed":
      return "Completed";
    case "blocked":
      return "Blocked";
    default:
      return s ?? "—";
  }
};

/** Minimal shape returned by GraphQL for activity logs that we care about */
type ActivityRaw = {
  id: string;
  milestone?: { milestoneName?: string } | null;
  oldStatus?: string | null;
  newStatus?: string | null;
  updatedBy?: { name?: string } | null;
  timestamp?: string | null;
  // optionally avatar or other fields could be added later
};

type ActivityUI = {
  id: string;
  milestoneName: string;
  oldStatus: string;
  newStatus: string;
  updatedBy: string;
  timestampISO: string;
  avatarUrl?: string;
};

const ActivityLog: React.FC<Props> = ({ selectedProjectId }) => {
  const { data, loading, error } = useActivityLogs(selectedProjectId);

  // normalize safely with explicit type for incoming data
  const activities: ActivityUI[] = (data?.activityLogs ?? []).map((a: ActivityRaw) => ({
    id: a.id,
    milestoneName: a.milestone?.milestoneName ?? "Milestone",
    oldStatus: mapStatus(a.oldStatus ?? undefined),
    newStatus: mapStatus(a.newStatus ?? undefined),
    updatedBy: a.updatedBy?.name ?? "Someone",
    timestampISO: a.timestamp ?? new Date().toISOString(),
    avatarUrl: undefined,
  }));

  return (
    <section className="relative pl-0 pr-0 pt-4 pb-4 bg-zinc-950 rounded-md shadow">
      <h2 className="ml-2 text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Activity Log
      </h2>

      {loading && <p className="ml-2 text-sm text-gray-400">Loading…</p>}

      {!loading && error && (
        <p className="ml-2 text-sm text-red-400">Couldn’t load activity. Check console for details.</p>
      )}

      {!loading && !error && activities.length === 0 && (
        <p className="ml-2 text-sm text-gray-400">No activity yet for this project.</p>
      )}

      {!loading && !error && activities.length > 0 && (
        <>
          <div className="absolute top-4 bottom-4 left-5 w-px bg-gray-200 dark:bg-gray-700" />
          <ol className="relative space-y-4">
            {activities.map((activity) => {
              const initials = activity.updatedBy?.[0]?.toUpperCase?.() ?? "?";
              const ts = new Date(activity.timestampISO).toLocaleString();

              return (
                <li key={activity.id} className="ms-0 relative">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-900 overflow-hidden">
                        {activity.avatarUrl ? (
                          <img src={activity.avatarUrl} alt={activity.updatedBy} className="w-10 h-10 object-cover" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-800 dark:text-blue-300">
                            {initials}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-4 p-4 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600 flex-1">
                      <div className="flex justify-between">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                          <strong>{activity.updatedBy}</strong> updated{" "}
                          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                            {activity.milestoneName}
                          </a>{" "}
                          from <span>{activity.oldStatus}</span> to <span>{activity.newStatus}</span>
                        </div>
                        <time className="text-xs text-gray-400">{ts}</time>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </section>
  );
};

export default ActivityLog;
