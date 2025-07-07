export type ProjectStatus = "Active" | "Completed" | "Paused" | "Archived";

export type Project = {
  id: string;
  name: string;
  imgUrl: string,
  fallBackIcon: React.ReactNode;
  subtitle?: string;
  status: ProjectStatus;
};

export type FormFields = {
  name: string;
  description: string;
  status: "Active" | "Completed" | "Paused" | "Archived";
};

export type EditProjectFormProps = {
  formData: FormFields;
  setFormData: React.Dispatch<React.SetStateAction<FormFields>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (field: keyof FormFields, value: string) => void;
  onSave: (updatedFields: FormFields) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export type DashProps = {
  projectList: Project[];
  setProjectList: React.Dispatch<React.SetStateAction<Project[]>>;
  selectedProjectId: string;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<string>>;
  currentProject?: Project;
  handleSave: (updatedFields: Partial<Project>) => void;
  onSubmit: () => void;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openMenus: string[];
  setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;
  toggleMenu: (menu: string) => void;
  isProjectDropdownOpen: boolean;
  setIsProjectDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleProjectSelect: (id: string) => void;
  formData: FormFields;

  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    status: ProjectStatus;
  }>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    toggleProjectDropdown: (e: React.MouseEvent) => void;
  projectDropdownRef: React.RefObject<HTMLDivElement>;
  isUserMenuOpen: boolean;
  toggleUserMenu: (e: React.MouseEvent) => void;
  userMenuRef: React.RefObject<HTMLDivElement>;
  userEmail: string;
  handleChange: <K extends keyof FormFields>(field: K, value: FormFields[K]) => void;
};

export type DashCardProps = {
  children?: React.ReactNode;
};

export type DashContentProps = {
  children?: React.ReactNode;
};

export type BreadcrumbHeaderProps = {
  section: string;
  page: string;
};

export type SelectorProps = {
  projectList: Project[];
  selectedProjectId: string;
  isProjectDropdownOpen: boolean;
  toggleProjectDropdown: (e: React.MouseEvent) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  handleProjectSelect: (id: string) => void;
};

export interface SidebarProps {
  projectList: Project[];
  selectedProjectId: string;
  isProjectDropdownOpen: boolean;
  toggleProjectDropdown: (e: React.MouseEvent) => void;
  toggleMenu: (menu: string) => void;
  projectDropdownRef: React.RefObject<HTMLDivElement>;
  handleProjectSelect: (id: string) => void;

  openMenus: string[];
  setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;

  isUserMenuOpen: boolean;
  toggleUserMenu: (e: React.MouseEvent) => void;
  userMenuRef: React.RefObject<HTMLDivElement>;
  userEmail: string;
}

export interface UserMenuProps {
  isOpen: boolean;
  toggleMenu: (e: React.MouseEvent) => void;
  menuRef: React.RefObject<HTMLDivElement>;
  userEmail: string;
}

export interface Invitation {
  id: string;
  projectName: string;
  inviterName: string;
  role: string;
  projectLogo: string;
  projectIcon: React.ReactNode;
}

export interface AcceptInvitationPageProps {
  projectList: Project[];
  setSelectedProjectId: (id: string) => void;
  invitation: Invitation | null;
  isLoggedIn: boolean;
  userEmail: string;
  handleAcceptInvite: () => void;
}
// export type SidebarProps = {
//   projectList: Project[];
//   selectedProjectId: string;
//   setSelectedProjectId: React.Dispatch<React.SetStateAction<string>>;
//   openMenus: string[];
//   setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;
//   handleProjectSelect: (id: string) => void;
// };

export type ProjectSwitcherProps = {
  projectList: Project[];
  selectedProjectId: string;
  handleProjectSelect: (id: string) => void;
  isProjectDropdownOpen: boolean;
  toggleProjectDropdown: (e: React.MouseEvent) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
};
