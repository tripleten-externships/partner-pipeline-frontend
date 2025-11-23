import { buttonVariants } from "@/components/ui/button.variants";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashProps } from "@/utils/types";
import React from "react";
import ActivityLog from "../ActivityLog/ActivityLog";
import AddProjectForm from "../AddProjectForm/AddProjectForm";
import BreadcrumbHeader from "../BreadcrumbHeader/BreadcrumbHeader";
import DashCard from "../DashCard/DashCard";
import DashContent from "../DashContent/DashContent";
import StudentsWaitingCard from "../Dashboard/StudentsWaitingCard";
import EditProjectForm from "../EditProjectForm/EditProjectForm";
import MilestonesProgress from "../MilestonesProgress/MilestonesProgress";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard: React.FC<DashProps> = ({
  projectList,
  selectedProjectId,
  currentProject,
  formData,
  setFormData,
  isLoading,
  setIsLoading,
  handleChange,
  onSubmit,
  isSheetOpen,
  setIsSheetOpen,
  handleAddProject,
  handleDeleteProject,
  openMenus,
  setOpenMenus,
  isProjectDropdownOpen,
  toggleProjectDropdown,
  projectDropdownRef,
  isAddProjectSheetOpen,
  setIsAddProjectSheetOpen,
  handleProjectSelect,
  isUserMenuOpen,
  toggleUserMenu,
  toggleMenu,
  userMenuRef,
  userEmail,
  loadingProjects,
  projectError,
}) => (
  <div className="flex h-screen">
    <Sidebar
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
    />

    <main className="flex-1 p-6 overflow-y-auto bg-zinc-950">
      <BreadcrumbHeader section="Overview" page="History" />
      <div className="flex justify-end mb-4 gap-2">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className={buttonVariants({ variant: "default" })}>Edit Project</button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Edit Project</SheetTitle>
              <SheetDescription>Update your project info below.</SheetDescription>
            </SheetHeader>
            {currentProject && (
              <EditProjectForm
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onChange={handleChange}

                onCancel={() => setIsSheetOpen(false)}
                onSubmit={onSubmit}
                onDelete={handleDeleteProject}
              />
            )}
          </SheetContent>
        </Sheet>
        <Sheet open={isAddProjectSheetOpen} onOpenChange={setIsAddProjectSheetOpen}>
          <SheetContent className="sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add New Project</SheetTitle>
              <SheetDescription>Create a new project for testing.</SheetDescription>
            </SheetHeader>
            <AddProjectForm onProjectSubmit={handleAddProject} onSubmit={handleAddProject} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StudentsWaitingCard />
        <DashCard />
        <DashCard />
      </div>
      <MilestonesProgress  />
      <ActivityLog selectedProjectId={selectedProjectId} />
      <DashContent />
    </main>
  </div>
);

export default Dashboard;