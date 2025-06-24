import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./login-route";
import UserManagement from "../routes/user-management/user-management";
import {
  SquareStack,
  AudioWaveform,
  BarChart4,
} from "lucide-react";
import { Project } from "@/utils/types";

function App() {
  const [projectList, setProjectList] = useState<Project[]>([
    {
      id: 1,
      name: "Drops Diabetes App",
      icon: <SquareStack size={16} />,
      shortcut: "⌘1",
      description: "Manage diabetes treatment app",
      status: "Active",
    },
    {
      id: 2,
      name: "Drops Marketing Page",
      icon: <AudioWaveform size={16} />,
      shortcut: "⌘2",
      description: "Drops Marketing Page App",
      status: "Completed",
    },
    {
      id: 3,
      name: "Drops Analytics",
      icon: <BarChart4 size={16} />,
      shortcut: "⌘3",
      description: "Drops Analytics App",
      status: "Paused",
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const currentProject = projectList.find((p) => p.id === selectedProjectId);

  useEffect(() => {
  if (currentProject && isSheetOpen) {
    setFormData({
      name: currentProject.name || "",
      description: currentProject.description || "",
      status: currentProject.status || "",
    });
  }
}, [currentProject, isSheetOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProjectSelect = (id: number) => {
    setSelectedProjectId(id);
    setIsProjectDropdownOpen(false);
  };

  const handleSave = (updatedFields: Partial<Project>) => {
    setProjectList((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId
          ? { ...project, ...updatedFields }
          : project
      )
    );
  };

  return (
    <main className="flex-1 bg-zinc-950">
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              projectList={projectList}
              setProjectList={setProjectList}
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
              formData={formData}
              setFormData={setFormData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handleChange={handleChange}
              handleSave={handleSave}
              currentProject={currentProject}
              handleProjectSelect={handleProjectSelect}
              openMenus={openMenus}
              setOpenMenus={setOpenMenus}
              isSheetOpen={isSheetOpen}
              setIsSheetOpen={setIsSheetOpen}
              setIsProjectDropdownOpen={setIsProjectDropdownOpen}
              isProjectDropdownOpen={isProjectDropdownOpen}
            />
          }
        />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;

