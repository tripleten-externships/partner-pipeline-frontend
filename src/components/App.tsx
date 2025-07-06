import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import useClickOutside from "@/hooks/useClickOutside";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./login-route";
import UserManagement from "../routes/user-management/user-management";
import {
  SquareStack,
  AudioWaveform,
  BarChart4,
} from "lucide-react";
import { Project } from "@/utils/types";
import AcceptInvitationPage from "./AcceptInvitationPage/AcceptInvitationPage";
import { Invitation } from "@/utils/types";

function App() {
  const navigate = useNavigate()
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const currentProject = projectList.find((p) => p.id === selectedProjectId);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userEmail, setUserEmail] = useState("andrew@example.com"); // use real session/user context in production --comments for lint to ignore for dev
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with real logic

  useClickOutside(projectDropdownRef, () => setIsProjectDropdownOpen(false));
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  useEffect(() => {
    if (currentProject && isSheetOpen) {
      setFormData({
        name: currentProject.name || "",
        description: currentProject.description || "",
        status: currentProject.status || "",
      });
    }
  }, [currentProject, isSheetOpen]);

  //Simulate invitation 
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const sampleId = projectList[0]?.id; // pick the first project for dev
      const existing = projectList.find(p => p.id === sampleId);
      if (existing) {
        setInvitation({
          id: existing.id,
          projectName: existing.name,
          inviterName: "Dev Tester",
          role: "Collaborator",
          projectLogo: "/logo.png",
          projectIcon: existing.icon,
        });
      }
      setIsLoading(false);
    }, 300);
  }, [projectList]);


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

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      handleSave(formData); // assuming this is the current form
      setIsLoading(false);
      setIsSheetOpen(false); // closes the modal/sheet
    }, 1000);
  };

  const handleAcceptInvite = () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to accept this invitation.");
      return;
    }
    toast.success(`Successfully joined ${invitation?.projectName} as ${invitation?.role}`);
    setTimeout(() => navigate("/"), 1500);
  };

  const toggleProjectDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProjectDropdownOpen((open) => !open);
  };

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen((open) => !open);
  };

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
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
              onSubmit={handleSubmit}
              currentProject={currentProject}
              handleProjectSelect={handleProjectSelect}
              openMenus={openMenus}
              setOpenMenus={setOpenMenus}
              isSheetOpen={isSheetOpen}
              setIsSheetOpen={setIsSheetOpen}
              setIsProjectDropdownOpen={setIsProjectDropdownOpen}
              isProjectDropdownOpen={isProjectDropdownOpen}
              toggleProjectDropdown={toggleProjectDropdown}
              projectDropdownRef={projectDropdownRef}
              isUserMenuOpen={isUserMenuOpen}
              toggleUserMenu={toggleUserMenu}
              userMenuRef={userMenuRef}
              userEmail={userEmail}
              toggleMenu={toggleMenu}
            />
          }
        />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/invitation"
          element={
            <AcceptInvitationPage
              projectList={projectList}
              setSelectedProjectId={setSelectedProjectId}
              invitation={invitation}
              isLoggedIn={isLoggedIn}
              userEmail={userEmail}
              handleAcceptInvite={handleAcceptInvite}
            />
          }
        />
      </Routes>
      <Toaster position="bottom-center" />
    </main>
  );
}

export default App;

