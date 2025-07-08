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
import { FormFields, Project } from "@/utils/types";

function App() {
  const [projectList, setProjectList] = useState<Project[]>([
    {
      id: "1Ab4",
      name: "Drops Diabetes App",
      imgUrl: "",
      fallBackIcon: <SquareStack size={16} />,
      subtitle: "Manage diabetes treatment app",
      status: "Active",
    },
    {
      id: "2tGh",
      name: "Drops Marketing Page",
      imgUrl: "",
      fallBackIcon: <AudioWaveform size={16} />,
      subtitle: "Drops Marketing Page App",
      status: "Completed",
    },
    {
      id: "7hId",
      name: "Drops Analytics",
      imgUrl: "",
      fallBackIcon: <BarChart4 size={16} />,
      subtitle: "Drops Analytics App",
      status: "Paused",
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectList[0].id);
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    description: "",
    status: "Active"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const currentProject = projectList.find((p) => p.id === selectedProjectId);

  useEffect(() => {
  if (currentProject && isSheetOpen) {
    setFormData({
      name: currentProject.name || "",
      description: currentProject.subtitle || "",
      status: currentProject.status || "",
    });
  }
}, [currentProject, isSheetOpen]);

  const handleChange = <K extends keyof FormFields>(field: K, value: FormFields[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id);
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

