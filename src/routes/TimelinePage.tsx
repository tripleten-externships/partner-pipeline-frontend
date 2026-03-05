import React from "react";

import { DashboardLayout } from "@/components/DashboardLayout";
import { SidebarProps } from "@/utils/types";
import Timeline from "@/components/Timeline/Timeline";
import BreadcrumbHeader from "@/components/BreadcrumbHeader/BreadcrumbHeader";

import { useActivityLogs } from "@/utils/api";

interface TimelinePageProps extends SidebarProps {}

// Reusing data patterns from ActivityLogs. Could be improved by creating a shared helper.
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

type ActivityRaw = {
  id: string;
  milestone?: { milestoneName?: string } | null;
  oldStatus?: string | null;
  newStatus?: string | null;
  updatedBy?: { name?: string } | null;
  timestamp?: string | null;
  // optionally avatar or other fields could be added later
};

export type ActivityUI = {
  id: string;
  milestoneName: string;
  oldStatus: string;
  newStatus: string;
  updatedBy: string;
  timestampISO: string;
  avatarUrl?: string;
};

// This is the wrapper for the more focused, reusable Timeline component at ./components/Timeline
// The TimelinePage handles routing, data fetching and normalizing, and DashboardLayout formatting.
const TimelinePage: React.FC<TimelinePageProps> = ({
  selectedProjectId,
  projectList,
  loadingProjects,
  projectError,
  isProjectDropdownOpen,
  toggleProjectDropdown,
  projectDropdownRef,
  handleProjectSelect,
  openMenus,
  setOpenMenus,
  isUserMenuOpen,
  toggleUserMenu,
  userMenuRef,
  userEmail,
  toggleMenu,
  isAddProjectSheetOpen,
  setIsAddProjectSheetOpen,
}) => {
  const { data, loading, error } = useActivityLogs(selectedProjectId);

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
    <DashboardLayout
      projectList={projectList}
      loadingProjects={loadingProjects}
      projectError={projectError}
      selectedProjectId={selectedProjectId}
      isProjectDropdownOpen={isProjectDropdownOpen}
      toggleProjectDropdown={toggleProjectDropdown}
      projectDropdownRef={projectDropdownRef}
      handleProjectSelect={handleProjectSelect}
      openMenus={openMenus}
      setOpenMenus={setOpenMenus}
      isUserMenuOpen={isUserMenuOpen}
      toggleUserMenu={toggleUserMenu}
      userMenuRef={userMenuRef}
      userEmail={userEmail}
      toggleMenu={toggleMenu}
      isAddProjectSheetOpen={isAddProjectSheetOpen}
      setIsAddProjectSheetOpen={setIsAddProjectSheetOpen}
    >
      <BreadcrumbHeader section="Milestones" page="Timeline" />

      {!selectedProjectId && (
        <p className="ml-2 text-sm text-gray-400">Select a project to view its timeline.</p>
      )}
      {selectedProjectId && loading && <p className="ml-2 text-sm text-gray-400">Loading…</p>}
      {selectedProjectId && !loading && error && (
        <p className="ml-2 text-sm text-red-400">
          Couldn’t load activity. Check console for details.
        </p>
      )}
      {selectedProjectId && !loading && !error && activities.length === 0 && (
        <p className="ml-2 text-sm text-gray-400">No activity yet for this project.</p>
      )}
      {selectedProjectId && !loading && !error && activities.length > 0 && (
        <Timeline activities={activities} />
      )}
    </DashboardLayout>
  );
};

export default TimelinePage;
