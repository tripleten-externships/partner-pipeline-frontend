import React from "react";

type Milestone = {
  title: string;
  status: "To-do";
  description: string;
};

const milestones: Milestone[] = [
  {
    title: "Requirements Gathering",
    status: "To-do",
    description: "Collect business and user requirements for the project.",
  },
  {
    title: "Stakeholder Agreements",
    status: "To-do",
    description: "Align with stakeholders on scope, timeline, and expectations.",
  },
  {
    title: "Design Prototypes",
    status: "To-do",
    description: "Build and review wireframes and UI design mockups.",
  },
  {
    title: "Team Formation",
    status: "To-do",
    description: "Assemble the project team and assign roles and responsibilities.",
  },
  {
    title: "Development Phase X",
    status: "To-do",
    description: "Begin core feature development for the MVP or next phase.",
  },
  {
    title: "Project Handoff",
    status: "To-do",
    description: "Deliver final product, documentation, and training as needed.",
  },
];

const MilestonesProgress: React.FC = () => {
  return (
    <section
      aria-labelledby="milestones-heading"
      className="relative pl-0 pr-0 pt-4 pb-4 bg-zinc-950 rounded-md shadow mb-10"
    >
      {/* Section heading */}
      <h2
        id="milestones-heading"
        className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"
      >
        Milestones Progress
      </h2>

      {/* Stepper timeline container */}
      <ol className="flex flex-wrap justify-between items-start gap-6 sm:flex-nowrap">
        {milestones.map((milestone, index) => (
          <li key={index} className="flex-1 min-w-[180px] sm:min-w-0 relative mb-6 sm:mb-0">
            <div className="flex items-center">
              {/* Step dot icon */}
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <svg
                  className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>

              {/* Horizontal line between steps (hidden on last item) */}
              {index < milestones.length - 1 && (
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
              )}
            </div>

            {/* Step content */}
            <div className="mt-3 sm:pe-8">
              {/* Milestone title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {milestone.title}
              </h3>
              {/* Milestone status */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Status: <span className="font-medium">{milestone.status}</span>
              </p>
              {/* Milestone description */}
              <p className="text-sm text-gray-500 dark:text-gray-400">{milestone.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default MilestonesProgress;
