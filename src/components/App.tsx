import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { toast, Toaster } from "sonner";
import useClickOutside from "@/hooks/useClickOutside";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./login-route";
import WelcomePage from "./welcome-page";
import ProtectedRoute from "./protected-route";
import UserManagement from "../routes/user-management/user-management";
import { SquareStack } from "lucide-react";
import AcceptInvitationPage from "./AcceptInvitationPage/AcceptInvitationPage";
import { FormFields, Invitation, Project, ProjectFormValues } from "@/utils/types";

import { GET_PROJECTS } from "@/graphql/queries/getProjects";
import { CREATE_PROJECT } from "@/graphql/mutations/createProject";
import { UPDATE_PROJECT } from "@/graphql/mutations/updateProject";
import { DELETE_PROJECT } from "@/graphql/mutations/deleteProject";

// import { useProjectIDs } from "@/utils/api";

function App() {
  const navigate = useNavigate();

  // GraphQL
  const { data, loading, error, refetch } = useQuery<{ projects: Project[] }>(GET_PROJECTS);

  const projectList = React.useMemo<Project[]>(
  () => data?.projects ?? [],
  [data?.projects]
);
  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  // UI state
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
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
  const [isAddProjectSheetOpen, setIsAddProjectSheetOpen] = useState(false);

  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const currentProject = React.useMemo(
    () => projectList.find((p) => p.id === selectedProjectId) ?? null,
    [projectList, selectedProjectId]
  );

  const [invitation, setInvitation] = useState<Invitation | null>(null);


  const [userEmail] = useState("foo@foo.com"); 

  const [isLoggedIn] = useState(true);

  useClickOutside(projectDropdownRef, () => setIsProjectDropdownOpen(false));
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  useEffect(() => {
    if (projectList.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projectList[0].id);
    }
  }, [projectList, selectedProjectId]);

  useEffect(() => {
    if (currentProject && isSheetOpen) {
      setFormData({
        name: currentProject.name || "",
        description: currentProject.subtitle || "",
        status: currentProject.status || "",
      });
    }
  }, [currentProject, isSheetOpen]);

  // Convoluted way of getting a valid default id.
  // - Check if the current id matches any valid id.
  // - If not, set it to an arbitrary one.
  // function validateID(projects: Project[]) {
  //   for(let i = 0; i < projects.length; i++){
  //     if(projects[i].id == selectedProjectId) return;
  //   }
  //   if(projects.length > 0)
  //     setSelectedProjectId(projects[0].id);
  //   else
  //     console.error("No projects available."); // TODO: Add support for zero available projects.
  // }
  // {
  //   const {loading, data} = useProjectIDs();
  //   if(!loading){
  //     validateID(data.projects);
  //   }
  // }

  
  

  //Simulate invitation
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => {
      const sampleId = projectList[0]?.id;
      const existing = projectList.find((p) => p.id === sampleId);
      if (existing) {
        setInvitation({
          id: existing.id,
          projectName: existing.name,
          inviterName: "Dev Tester",
          role: "Collaborator",
          projectLogo: "/logo.png",
          projectIcon: existing.fallBackIcon ?? <SquareStack size={16} />,
        });
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [projectList]);


  const handleChange = <K extends keyof FormFields>(field: K, value: FormFields[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id);
  };

  const handleSubmit = async () => {
    if (!currentProject) return;
    setIsLoading(true);
    try {
      await updateProject({
        variables: {
          id: currentProject.id,
          name: formData.name,
          subtitle: formData.description,
          status: formData.status,
        },
      });
      toast.success("Project updated!");
      setIsSheetOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      const { data } = await createProject({
        variables: {
          name: values.name,
          subtitle: values.subtitle || "",
          status: values.status,
        },
      });

      await refetch(); // 🚨 ensures the new project appears in projectList

      toast.success(`Project "${data.createProject.name}" created.`);
      setSelectedProjectId(data.createProject.id);
      setIsAddProjectSheetOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create project.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!currentProject) return;
    const confirm = window.confirm(`Are you sure you want to delete "${currentProject.name}"?`);
    if (!confirm) return;

    setIsLoading(true);
    try {
      await deleteProject({ variables: { id: currentProject.id } });
      toast.success("Project deleted.");
      setSelectedProjectId("");
      setIsSheetOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project.");
    } finally {
      setIsLoading(false);
    }
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
        {/* Public routes */}
        <Route path="/welcome" element={<WelcomePage />} />
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
        
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          }
        />
        <Route 
          path="/user-management" 
          element={
            <ProtectedRoute requiredPermission="users:read">
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster position="bottom-center" />
    </main>
  );
}

export default App;
