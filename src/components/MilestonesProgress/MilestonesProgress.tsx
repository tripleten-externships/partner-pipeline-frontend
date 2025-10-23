import React, {useState} from "react";
import { buttonVariants } from "@/components/ui/button.variants";
import { EditMilestoneModal } from "../EditMilestoneForm/EditMilestoneForm";
import { MilestoneModal } from "../MilestoneModal/MilestoneModal";


// Define allowed statuses for milestones
type MilestoneStatus = "To-do" | "In progress" | "In review" | "Complete";

// Each milestone has a title, status, and description
type Milestone = {
 title: string;
  status: MilestoneStatus;
  // description: string; Current Milestone schema does not include description
};



// Logical progression left → right:
// First three are Complete (green), then In review (blue spinner),
// then In progress (yellow), then To-do (gray)
// const milestones: Milestone[] = [
//   { title: "Requirements Gathering", status: "Complete", description: "Collect requirements." },
//   { title: "Stakeholder Agreements", status: "Complete", description: "Align with stakeholders." },
//   { title: "Design Prototypes", status: "Complete", description: "Review wireframes & mockups." },
//   { title: "Team Formation", status: "In review", description: "Review team structure." },
//   { title: "Development Phase", status: "In progress", description: "Begin core development." },
//   { title: "Project Handoff", status: "To-do", description: "Deliver final product." },
// ];


// Map each status to Tailwind color + icon representation
// (dynamic styling)
const statusStyles: Record<MilestoneStatus, { color: string; icon: JSX.Element }> = {
  "To-do": { 
    color: "bg-gray-300", // Gray circle for tasks not started
    icon: <span className="w-2.5 h-2.5 rounded-full bg-gray-500" /> // small gray dot inside
  },
  "In progress": { 
    color: "bg-yellow-400", // Yellow for active task
    icon: (
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" /> {/* simple filled circle */}
      </svg>
    ) 
  },
  "In review": { 
    color: "bg-blue-500", // Blue with a spinner for in review 
    icon: (
      <svg className="w-3 h-3 animate-spin text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    ) 
  },
  "Complete": { 
    color: "bg-green-500", // Green for completed tasks
    icon: (
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z" /> {/* checkmark */}
      </svg>
    ) 
  },
};

const MilestonesProgress: React.FC = () => {

  const [openModal, setOpenModal] = useState(false);
    const [milestonesList] = useState<Milestone[]>([
    { title: "Initial setup", status: "Complete" },
  ]);
    const [selectedMilestone, setSelectedMilestone] = useState(milestonesList[0] || null);
  

  const handleEditMilestone = (newMilestone: Milestone) => {
    selectedMilestone.title = newMilestone.title;
    selectedMilestone.status = newMilestone.status;


const MilestonesProgress: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [milestonesList, setMilestonesList] = useState<Milestone[]>([
    { title: "Initial setup", status: "Complete" },
  ]);

  const handleAddMilestone = (newMilestone: Milestone) => {
    setMilestonesList((prev) => [...prev, newMilestone]);
  };

  return (
    <section className="relative pl-0 pr-0 pt-4 pb-4 bg-zinc-950 rounded-md shadow mb-10">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Milestones Progress Tracker
        </h2>

        <button
          className={buttonVariants({ variant: "default" })}
          onClick={() => setOpenModal(true)}
        >
          Add milestone
        </button>
      </div>

      <ol className="flex flex-wrap justify-between items-start gap-6 sm:flex-nowrap">
        {milestonesList.map((milestone, index) => {
          const style = statusStyles[milestone.status];
          return (
            <li
              key={index}
              className="flex-1 min-w-[180px] sm:min-w-0 relative mb-6 sm:mb-0"
            >
              <div className="flex items-center">
                <div
                  className={`ml-2 z-10 flex items-center justify-center w-6 h-6 rounded-full ${style.color}`}
                >
                  {style.icon}
                </div>

                {/* Line between milestones */}
                {index < milestonesList.length - 1 && (
                  <div className="hidden ml-4 sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                )}
              </div>

              {/* Milestone text */}
              <div className="ml-2 mt-6 sm:pe-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {milestone.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Status: <span className="font-medium">{milestone.status}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Milestone description
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      
       {/* Modal */}

       <EditMilestoneModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onEdit={handleEditMilestone}
        Milestone={{
    title: selectedMilestone.title,
    status: selectedMilestone.status}
  } />

      {/* Modal */}
      <MilestoneModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleAddMilestone}
      />
    </section>
  );
};


export default MilestonesProgress;