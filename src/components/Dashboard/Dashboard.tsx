import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import DashCard from "../DashCard/DashCard";
import DashContent from "../DashContent/DashContent";
import BreadcrumbHeader from "../BreadcrumbHeader/BreadcrumbHeader";
import EditProjectForm from "../EditProjectForm/EditProjectForm";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button.variants";
import { DashProps } from "@/utils/types";
import ActivityLog from "../ActivityLog/ActivityLog";

const Dashboard: React.FC<DashProps> = ({
  projectList,
  selectedProjectId,
  setSelectedProjectId,
  currentProject,
  handleSave,
  isSheetOpen,
  setIsSheetOpen,
  openMenus,
  setOpenMenus,
  handleProjectSelect,
  formData,
  setFormData,
  isLoading,
  setIsLoading,
  handleChange,
}) => {
  return (
    <div className="flex h-screen">
      <Sidebar
        projectList={projectList}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
        handleProjectSelect={handleProjectSelect}
        openMenus={openMenus}
        setOpenMenus={setOpenMenus}
      />
      <main className="flex-1 p-6 overflow-y-auto bg-zinc-950">
        <BreadcrumbHeader section="Overview" page="History" />
        <div className="flex justify-end mb-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className={buttonVariants({ variant: "default" })}>
                Edit Project
              </button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Edit Project</SheetTitle>
                <SheetDescription>Update your project info below.</SheetDescription>
              </SheetHeader>

              {currentProject && (
                <div>
                  <EditProjectForm
                    formData={formData}
                    setFormData={setFormData}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    onChange={handleChange}
                    onSave={handleSave}
                    onCancel={() => setIsSheetOpen(false)}
                  />
                </div>
              )}
            </SheetContent>

          </Sheet>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DashCard />
          <DashCard />
          <DashCard />
        </div>
        <ActivityLog />
        <DashContent />
      </main>
    </div>
  );
};

export default Dashboard;
