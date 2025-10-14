import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button.variants";
import { MilestoneModal } from "../MilestoneModal/MilestoneModal";
import { useMilestones } from "@/utils/api";
import { MilestoneProps } from "@/utils/types";

type MilestoneStatus = "To-do" | "In progress" | "In review" | "Complete";

type MilestoneRaw = {
  id?: string;
  milestoneName?: string | null;
  status?: string | null;
};

type MilestoneUI = {
  id?: string;
  milestoneName: string;
  status: MilestoneStatus;
};

// Local demo milestone shape (used when no project selected)
type LocalMilestone = {
  title: string;
  status: MilestoneStatus;
};

const mapStatus = (s?: string): MilestoneStatus => {
  switch (s) {
    case "not_started":
    case "To-do":
      return "To-do";
    case "in_progress":
    case "In progress":
      return "In progress";
    case "completed":
    case "Complete":
      return "Complete";
    case "blocked":
    case "In review":
      return "In review";
    default:
      return "To-do";
  }
};

const statusStyles: Record<MilestoneStatus, { color: string; icon: JSX.Element }> = {
  "To-do": {
    color: "bg-gray-300",
    icon: <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />,
  },
  "In progress": {
    color: "bg-yellow-400",
    icon: (
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  "In review": {
    color: "bg-blue-500",
    icon: (
      <svg className="w-3 h-3 animate-spin text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    ),
  },
  Complete: {
    color: "bg-green-500",
    icon: (
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z" />
      </svg>
    ),
  },
};

const MilestonesProgress: React.FC<MilestoneProps> = ({ selectedProjectId }) => {
  // If we have a project ID, fetch real milestones; otherwise fall back to local demo state
  const { data, loading, error } = useMilestones(selectedProjectId);

  const fetchedMilestones: MilestoneUI[] = (data?.milestones ?? []).map((m: MilestoneRaw) => ({
    id: m.id,
    milestoneName: m.milestoneName ?? "Untitled milestone",
    status: mapStatus(m.status ?? undefined),
  }));

  // local demo state + modal for when no project is selected (or for quick dev testing)
  const [openModal, setOpenModal] = useState(false);
  const [localMilestones, setLocalMilestones] = useState<LocalMilestone[]>([
    { title: "Initial setup", status: "Complete" },
  ]);

  const handleAddLocalMilestone = (newMilestone: LocalMilestone) => {
    setLocalMilestones((prev) => [...prev, newMilestone]);
  };

  const isUsingFetched = typeof selectedProjectId === "string" && selectedProjectId.length > 0;

  const renderTimeline = (items: { id?: string; title: string; status: MilestoneStatus }[]) => (
    <ol className="flex flex-wrap justify-between items-start gap-6 sm:flex-nowrap">
      {items.map((milestone, index) => {
        const style = statusStyles[milestone.status] ?? statusStyles["To-do"];
        return (
          <li key={milestone.id ?? index} className="flex-1 min-w-[180px] sm:min-w-0 relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className={`ml-2 z-10 flex items-center justify-center w-6 h-6 rounded-full ${style.color}`}>
                {style.icon}
              </div>
              {index < items.length - 1 && (
                <div className="hidden ml-4 sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
              )}
            </div>

            <div className="ml-2 mt-6 sm:pe-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {milestone.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Status: <span className="font-medium">{milestone.status}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Milestone description</p>
            </div>
          </li>
        );
      })}
    </ol>
  );

  return (
    <section className="relative pl-0 pr-0 pt-4 pb-4 bg-zinc-950 rounded-md shadow mb-10">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Milestones Progress Tracker</h2>

        <div>
          <button className={buttonVariants({ variant: "default" })} onClick={() => setOpenModal(true)}>
            Add milestone
          </button>
        </div>
      </div>

      {isUsingFetched ? (
        // real project -> show fetched milestones (with loading/error states)
        <>
          {loading && <p className="ml-2 text-sm text-gray-400">Loading…</p>}
          {!loading && error && (
            <p className="ml-2 text-sm text-red-400">Couldn’t load milestones. Check console for details.</p>
          )}
          {!loading && !error && fetchedMilestones.length === 0 && (
            <p className="ml-2 text-sm text-gray-400">No milestones yet for this project.</p>
          )}
          {!loading && !error && fetchedMilestones.length > 0 && (
            <div>{renderTimeline(fetchedMilestones.map((m) => ({ id: m.id, title: m.milestoneName, status: m.status })))}</div>
          )}
        </>
      ) : (
        // no project -> show the local demo list
        <>
          {localMilestones.length === 0 ? (
            <p className="ml-2 text-sm text-gray-400">No demo milestones. Add one to get started.</p>
          ) : (
            <div>{renderTimeline(localMilestones.map((m, i) => ({ id: String(i), title: m.title, status: m.status })))}</div>
          )}
        </>
      )}

      {/* Milestone modal (used for both demo local creation and, in the future, real creation) */}
      <MilestoneModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={(payload) => {
          // MilestoneModal should return an object matching LocalMilestone:
          // e.g. { title: string, status: MilestoneStatus }
          handleAddLocalMilestone(payload as LocalMilestone);
          setOpenModal(false);
        }}
      />
    </section>
  );
};

export default MilestonesProgress;
