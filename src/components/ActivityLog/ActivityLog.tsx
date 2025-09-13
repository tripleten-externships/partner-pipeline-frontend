import React from "react";

type Props = Record<string, never>;

// TODO: Replace manual ordering with timestamp-based sorting when real data is available
const dummyActivities = [
  {
    id: 3,
    milestone: "Funny Group",
    oldStatus: "Unassigned",
    newStatus: "Assigned",
    user: "Bonnie",
    timestamp: "just now",
    img: "https://i.pravatar.cc/40",
  },
  {
    id: 2,
    milestone: "Flowbite Pro",
    oldStatus: "Commented",
    newStatus: "Reviewed",
    user: "Thomas Lean",
    timestamp: "2 hours ago",
    img: "",
  },
  {
    id: 1,
    milestone: "Pricing page",
    oldStatus: "In Progress",
    newStatus: "Finished",
    user: "Jese Leos",
    timestamp: "1 day ago",
    img: "",
  },
  {
    id: 5,
    milestone: "Enrollemnt",
    oldStatus: "Closed",
    newStatus: "Open",
    user: "Thomas Leos",
    timestamp: "1 week ago",
    img: "https://i.pravatar.cc/250",
  },
  {
    id: 4,
    milestone: "Thermostat",
    oldStatus: "Warm",
    newStatus: "Cool",
    user: "Jese Lean",
    timestamp: "2 months ago",
    img: "",
  },
];

const ActivityLog: React.FC<Props> = () => {
  return (
    <section className="relative px-2 sm:px-4 pt-4 pb-4 bg-zinc-950 rounded-md shadow">
      {/* Vertical line */}
      <div className="absolute top-4 bottom-4 left-3 sm:left-5 w-px bg-gray-200 dark:bg-gray-700"></div>

      <ol className="relative space-y-3 space-y-4">
        {dummyActivities.map((activity) => (
          <li key={activity.id} className="ms-0 relative">
            <div className="flex items-start">
              {/* Circle icon */}
              <div className="flex items-center justify-center flex-shrink-0">
                {/* Outer circle (anchor) */}
                <a
                  href="#"
                  className="flex items-center justify-center w-8 h:8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-gray-900 group overflow-hidden"
                >
                  {/* Inner circle */}
                  {activity.img ? (
                    <img
                      src={activity.img}
                      alt={activity.user}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover transition-all duration-300 group-hover:w-8 group-hover:h-8 sm:group-hover:w-10 sm:group-hover:h-10"
                    />
                  ) : (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-800 dark:text-blue-300 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:w-10 group-hover:h-10">
                      {activity.user ? activity.user[0].toUpperCase() : "?"}
                    </div>
                  )}
                </a>
              </div>

              {/* Card content */}
              <div className="ml-2 sm:ml-4 p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600 flex-1 min-w-0 transform transition-transform duration-200 hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                  <div className="text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-300 flex-1 min-w-0">
                    <strong>{activity.user}</strong> updated{" "}
                    {/* TODO: Update href with real route when milestone routes are available */}
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {activity.milestone}
                    </a>{" "}
                    from <span className="font-medium">{activity.oldStatus}</span> to{" "}
                    <span className="font-medium">{activity.newStatus}</span>
                  </div>
                  <time className="text-xs text-gray-400 dark:text-gray-500 sm:ms-4 flex-shrink-0">
                    {activity.timestamp}
                  </time>
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
