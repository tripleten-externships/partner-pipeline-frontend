import React, { useEffect, useState } from "react";
import { getActivityLog, ActivityLogEntry } from "../../utils/api";

interface Props {
  projectId: string;
}


const ActivityLog: React.FC<Props> = ({ projectId }) => {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // TODO: Remove hardcoded project ID once data linking is fixed replace with prop/active selection when ready 
        // Using the actual project ID from the database
        const testProjectId = "9125a47c-f35c-4426-bda8-0b9858515ce9";
        const logs = await getActivityLog(testProjectId);
        // Sort by timestamp (most recent first)
        const sortedLogs = logs.sort((a: ActivityLogEntry, b: ActivityLogEntry) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setLogs(sortedLogs);
        setError(null);
      } catch (err) {
        console.error("API call failed:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch activity logs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, [projectId]);

  // Format timestamp with date and military time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US', { hour12: false })}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!logs.length) {
    return <div>No activity log entries found for this project.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="relative pl-0 pr-0 pt-4 pb-4 bg-zinc-950 rounded-md shadow">
      {/* Vertical line */}
      <div className="absolute top-4 bottom-4 left-5 w-px bg-gray-200 dark:bg-gray-700"></div>

      <ol className="relative space-y-4">
        {logs.map((activity, index) => (
          <li key={`${activity.milestone.id}-${index}`} className="ms-0 relative">
            <div className="flex items-start">
              {/* Circle icon */}
              <div className="flex items-center justify-center">
                {/* Outer circle (anchor) */}
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-900 group overflow-hidden"
                >
                  {/* Inner circle */}
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-800 dark:text-blue-300 transition-all duration-300 group-hover:w-10 group-hover:h-10">
                    {activity.updatedBy?.name ? activity.updatedBy.name[0].toUpperCase() : "?"}
                  </div>
                </a>
              </div>

              {/* Card content */}
              <div className="ml-4 p-4 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600 flex-1 transform transition-transform duration-200 hover:-translate-y-1">
                <div className="flex justify-between">
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                    <strong>{activity.updatedBy?.name || 'Unknown User'}</strong> updated{" "}
                    {/* TODO: Update href with real route when milestone routes are available */}
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {activity.milestone?.milestoneName || 'Unknown Milestone'}
                    </a>{" "}
                    from <span>{activity.oldStatus}</span> to <span>{activity.newStatus}</span>
                  </div>
                  <time className="text-xs text-gray-400">{formatTimestamp(activity.timestamp)}</time>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ActivityLog;
