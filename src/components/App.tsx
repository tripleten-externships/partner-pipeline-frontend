import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import useClickOutside from "@/hooks/useClickOutside";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./login-route";
import UserManagement from "../routes/user-management/user-management";
import { SquareStack, AudioWaveform, BarChart4 } from "lucide-react";
import AcceptInvitationPage from "./AcceptInvitationPage/AcceptInvitationPage";
import { FormFields, Project, Invitation, ProjectFormValues } from "@/utils/types";

function App() {
  const navigate = useNavigate();
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
    status: "Active",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isAddProjectSheetOpen, setIsAddProjectSheetOpen] = useState(false);

  const currentProject = projectList.find((p) => p.id === selectedProjectId);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userEmail, setUserEmail] = useState("morty@example.com"); // use real session/user context in production --comments for lint to ignore for dev
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with real logic

  useClickOutside(projectDropdownRef, () => setIsProjectDropdownOpen(false));
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  useEffect(() => {
    if (currentProject && isSheetOpen) {
      setFormData({
        name: currentProject.name || "",
        description: currentProject.subtitle || "",
        status: currentProject.status || "",
      });
    }
  }, [currentProject, isSheetOpen]);

  //Simulate invitation
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const sampleId = projectList[0]?.id; // pick the first project for dev
      const existing = projectList.find((p) => p.id === sampleId);
      if (existing) {
        setInvitation({
          id: existing.id,
          projectName: existing.name,
          inviterName: "Dev Tester",
          role: "Collaborator",
          projectLogo: "/logo.png",
          projectIcon: existing.fallBackIcon,
        });
      }
      setIsLoading(false);
    }, 300);
  }, [projectList]);

  const handleChange = <K extends keyof FormFields>(field: K, value: FormFields[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id);
  };

  const handleSave = (updatedFields: Partial<Project>) => {
    setProjectList((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId ? { ...project, ...updatedFields } : project
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

  const handleAddProject = async (values: ProjectFormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay

    const newId = Math.random().toString(36).substring(2, 6);
    const newProject: Project = {
      id: newId,
      name: values.name,
      subtitle: values.subtitle || "",
      imgUrl: values.img ? URL.createObjectURL(values.img) : "",
      status: values.status,
      fallBackIcon: <SquareStack size={16} />,
    };

    setProjectList((prev) => [...prev, newProject]);
    setSelectedProjectId(newId);
    toast.success(`Project "${values.name}" created.`);
    setIsAddProjectSheetOpen(false);
    setIsLoading(false);
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
              onProjectSubmit={handleAddProject}
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
              isAddProjectSheetOpen={isAddProjectSheetOpen}
              setIsAddProjectSheetOpen={setIsAddProjectSheetOpen}
              handleAddProject={handleAddProject}
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
