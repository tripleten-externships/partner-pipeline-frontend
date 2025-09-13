import React from "react";

// Define allowed statuses for milestones
type MilestoneStatus = "To-do" | "In progress" | "In review" | "Complete";

// Each milestone has a title, status, and description
type Milestone = {
  title: string;
  status: MilestoneStatus;
  description: string;
};

// Logical progression left → right:
// First three are Complete (green), then In review (blue spinner),
// then In progress (yellow), then To-do (gray)
const milestones: Milestone[] = [
  { title: "Requirements Gathering", status: "Complete", description: "Collect requirements." },
  { title: "Stakeholder Agreements", status: "Complete", description: "Align with stakeholders." },
  { title: "Design Prototypes", status: "Complete", description: "Review wireframes & mockups." },
  { title: "Team Formation", status: "In review", description: "Review team structure." },
  { title: "Development Phase", status: "In progress", description: "Begin core development." },
  { title: "Project Handoff", status: "To-do", description: "Deliver final product." },
];

// Map each status to Tailwind color + icon representation
// (dynamic styling)
const statusStyles: Record<MilestoneStatus, { color: string; icon: JSX.Element }> = {
  "To-do": {
    color: "bg-gray-300", // Gray circle for tasks not started
    icon: <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />, // small gray dot inside
  },
  "In progress": {
    color: "bg-yellow-400", // Yellow for active task
    icon: (
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" /> {/* simple filled circle */}
      </svg>
    ),
  },
  "In review": {
    color: "bg-blue-500", // Blue with a spinner for in review
    icon: (
      <svg className="w-3 h-3 animate-spin text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    ),
  },
  Complete: {
    color: "bg-green-500", // Green for completed tasks
    icon: (
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z" /> {/* checkmark */}
      </svg>
    ),
  },
};

const MilestonesProgress: React.FC = () => {
  return (
    <section className="relative px-2 sm:px-4 pt-4 pb-4 bg-zinc-950 rounded-md shadow mb-6 sm:mb-10">
      <h2 className="ml-2 text-lg sm:text-xl md:text-2xl font-semibold mb-6 sm:mb-8 text-gray-900 dark:text-white">
        Milestones Progress Tracker
      </h2>

      {/* Mobile/Tablet: Vertical layout, Desktop: Horizontal layout */}
      <ol className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 sm:gap-6">
        {milestones.map((milestone, index) => {
          const style = statusStyles[milestone.status]; // dynamically get color & icon based on status
          return (
            <li key={index} className="flex-1 md:min-w-0 relative">
              {/* Mobile/Tablet: Horizontal layout with connecting line on left */}
              <div className="flex flex-row md:flex-col items-start md:items-center">
                <div className="flex flex-col md:flex-row items-center md:w-full">
                  {/* Circle for each milestone */}
                  <div
                    className={`ml-2 md:ml-0 z-10 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ${style.color} flex-shrink-0`}
                  >
                    {style.icon} {/* dynamic icon */}
                  </div>

                  {/* Connecting line between milestones */}
                  {index < milestones.length - 1 && (
                    <>
                      {/* Vertical line for mobile/tablet */}
                      <div className="flex md:hidden ml-5 sm:ml-6 w-px h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                      {/* Horizontal line for desktop */}
                      <div className="hidden md:block md:flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 ml-2 mr-2"></div>
                    </>
                  )}
                </div>

                {/* Milestone text - responsive positioning and sizing */}
                <div className="ml-6 sm:ml-10 md:ml-0 md:mt-4 flex-1 min-w-0 -mt-1 md:mt-4 md:text-left">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white break-words">
                    {milestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Status: <span className="font-medium">{milestone.status}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-words">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default MilestonesProgress;
