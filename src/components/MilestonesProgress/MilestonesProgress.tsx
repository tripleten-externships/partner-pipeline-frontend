import React from "react";

type MilestoneStatus = "To-do" | "In progress" | "In review" | "Complete";

type Milestone = {
  title: string;
  status: MilestoneStatus;
  description: string;
};

// Example mocked data with different statuses
const milestones: Milestone[] = [
  { title: "Requirements Gathering", status: "To-do", description: "Collect requirements." },
  { title: "Stakeholder Agreements", status: "In progress", description: "Align with stakeholders." },
  { title: "Design Prototypes", status: "In review", description: "Review wireframes & mockups." },
  { title: "Team Formation", status: "Complete", description: "Assemble project team." },
  { title: "Development Phase X", status: "To-do", description: "Begin core development." },
  { title: "Project Handoff", status: "To-do", description: "Deliver final product." },
];

// Map status to Flowbite-style color and icon
const statusStyles: Record<MilestoneStatus, { color: string; icon: JSX.Element }> = {
  "To-do": { 
    color: "bg-gray-300", 
    icon: <span className="w-2.5 h-2.5 rounded-full bg-gray-500" /> 
  },
  "In progress": { 
    color: "bg-blue-500", 
    icon: (
      <svg className="w-3 h-3 animate-spin text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    ) 
  },
  "In review": { 
    color: "bg-yellow-400", 
    icon: (
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10h4v2h-6V6h2v6z" />
      </svg>
    ) 
  },
  "Complete": { 
    color: "bg-green-500", 
    icon: (
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z" />
      </svg>
    ) 
  },
};

const MilestonesProgress: React.FC = () => {
  return (
    <section className="relative pl-0 pr-0 pt-4 pb-4 bg-zinc-950 rounded-md shadow mb-10">
      <h2 className="ml-2 text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
        Milestones Progress Tracker
      </h2>

      <ol className="flex flex-wrap justify-between items-start gap-6 sm:flex-nowrap">
        {milestones.map((milestone, index) => {
          const style = statusStyles[milestone.status];
          return (
            <li key={index} className="flex-1 min-w-[180px] sm:min-w-0 relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className={`ml-2 z-10 flex items-center justify-center w-6 h-6 rounded-full ${style.color}`}>
                  {style.icon}
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden ml-4 sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                )}
              </div>
              <div className="ml-2 mt-6 sm:pe-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{milestone.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Status: <span className="font-medium">{milestone.status}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{milestone.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default MilestonesProgress;
