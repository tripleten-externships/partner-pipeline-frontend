import React from 'react';

type Props = Record<string, never>;

const dummyActivities = [
  {
    id: 1,
    milestone: "Pricing page",
    oldStatus: "In Progress",
    newStatus: "Finished",
    user: "Jese Leos",
    timestamp: "1 day ago",
  },
  {
    id: 2,
    milestone: "Flowbite Pro",
    oldStatus: "Commented",
    newStatus: "Reviewed",
    user: "Thomas Lean",
    timestamp: "2 hours ago",
  },
  {
    id: 3,
    milestone: "Funny Group",
    oldStatus: "Unassigned",
    newStatus: "Assigned",
    user: "Bonnie",
    timestamp: "just now",
  },
];


const ActivityLog: React.FC<Props> = () => {
  return (
    <section className="p-4 bg-white rounded-md shadow">
  <h2 className="text-xl font-semibold mb-4">Activity Log</h2>

  <ol className="relative border-s border-gray-200 dark:border-gray-700">
    {dummyActivities.map((activity) => (
      <li key={activity.id} className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <svg
            className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </span>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600">
          <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
            {activity.timestamp}
          </time>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
            <strong>{activity.user}</strong> updated{" "}
            <strong>{activity.milestone}</strong> from{" "}
            <em>{activity.oldStatus}</em> to <em>{activity.newStatus}</em>
          </div>
        </div>
      </li>
    ))}
  </ol>
</section>

  );
};

export default ActivityLog;
