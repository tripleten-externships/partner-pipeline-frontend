import React from "react";
// import {Timeline as FlowBiteTimeLine} from 'flowbite-react';

import { ActivityUI } from "@/routes/TimelinePage";

type TimelineProps = {
  activities: ActivityUI[];
};

// interface  to place temporary data
// export interface TimelineItem {
//   time: string;
//   imageSrc: string;
//   alt: string;
//   content: React.ReactNode;
// }

// list of objects with temporary data
// const timelineItems: TimelineItem[] = [
//   {
//     time: "just now",
//     imageSrc:
//       "https://images.unsplash.com/photo-1515096451051-3e94dfce0487?q=80&w=854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     alt: "Bonnie image",
//     content: (
//       <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
//         Bonnie moved{" "}
//         <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">
//           Jese Leos
//         </a>{" "}
//         to{" "}
//         <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-600 dark:text-gray-300">
//           Funny Group
//         </span>
//       </div>
//     ),
//   },
//   {
//     time: "2 hours ago",
//     imageSrc:
//       "https://images.unsplash.com/photo-1515096451051-3e94dfce0487?q=80&w=854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     alt: "Thomas Lean image",
//     content: (
//       <>
//         <div className="items-center justify-between mb-3 sm:flex">
//           <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
//             2 hours ago
//           </time>
//           <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
//             Thomas Lean commented on{" "}
//             <a href="#" className="font-semibold text-gray-900 dark:text-white hover:underline">
//               Flowbite Pro
//             </a>
//           </div>
//         </div>
//         <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
//           Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure
//           your design system! This is the second session of our new webinar series on #DesignSystems
//           discussions where we'll be speaking about Measurement.
//         </div>
//       </>
//     ),
//   },
//   {
//     time: "1 day ago",
//     imageSrc:
//       "https://images.unsplash.com/photo-1515096451051-3e94dfce0487?q=80&w=854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     alt: "Jese Leos image",
//     content: (
//       <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
//         Jese Leos has changed{" "}
//         <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">
//           Pricing page
//         </a>{" "}
//         task status to <span className="font-semibold text-gray-900 dark:text-white">Finished</span>
//       </div>
//     ),
//   },
// ];

const Timeline: React.FC<TimelineProps> = ({ activities }) => {
  const getRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now.getTime() - past.getTime();

    // Convert milliseconds to different units
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    if (minutes < 30) {
      return "Just now";
    }

    if (hours < 24) {
      let h = Math.floor(hours);
      if (h < 1) {
        h = 1;
      }
      return `${h} hour${h === 1 ? "" : "s"} ago`;
    }

    if (days < 7) {
      let d = Math.floor(days);
      if (d < 1) {
        d = 1;
      }
      return `${d} day${d === 1 ? "" : "s"} ago`;
    }

    if (days < 30) {
      return "last week";
    }

    return past.toLocaleString();
  };

  return (
    <div>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {activities.map((activity, index) => {
          const initials = activity.updatedBy?.[0]?.toUpperCase?.() ?? "?";

          return (
            <li
              key={activity.id}
              className={`ms-6 ${index < activities.length - 1 ? "mb-10" : ""}`}
            >
              {/* Avatar */}
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <div className="rounded-full shadow-lg">{initials}</div>
              </span>

              {/* Card */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between w-full">
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                    <strong>{activity.updatedBy}</strong> updated{" "}
                    <a
                      href="#"
                      className="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {activity.milestoneName}
                    </a>{" "}
                    from <span>{activity.oldStatus}</span> to{" "}
                    <span className="font-semibold text-white">{activity.newStatus}</span>
                  </div>

                  <time className="text-xs font-normal text-gray-400 sm:text-right">
                    {getRelativeTime(activity.timestampISO)}
                  </time>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Timeline;
