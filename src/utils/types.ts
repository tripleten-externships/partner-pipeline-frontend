export type Project = {
  id: number;
  name: string;
  icon: React.ReactNode;
  shortcut: string;
  description: string;
  status: string;
};

export type FormFields = {
  name: string;
  description: string;
  status: string;
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
  selectedProjectId: number;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number>>;
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
  handleProjectSelect: (id: number) => void;
  formData: {
    name: string;
    description: string;
    status: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    status: string;
  }>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (field: string, value: string) => void;
    toggleProjectDropdown: (e: React.MouseEvent) => void;
  projectDropdownRef: React.RefObject<HTMLDivElement>;
  isUserMenuOpen: boolean;
  toggleUserMenu: (e: React.MouseEvent) => void;
  userMenuRef: React.RefObject<HTMLDivElement>;
  userEmail: string;
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
  selectedProjectId: number;
  isProjectDropdownOpen: boolean;
  toggleProjectDropdown: (e: React.MouseEvent) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  handleProjectSelect: (id: number) => void;
};

export interface SidebarProps {
  projectList: Project[];
  selectedProjectId: number;
  isProjectDropdownOpen: boolean;
  toggleProjectDropdown: (e: React.MouseEvent) => void;
  toggleMenu: (menu: string) => void;
  projectDropdownRef: React.RefObject<HTMLDivElement>;
  handleProjectSelect: (id: number) => void;

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
  id: number;
  projectName: string;
  inviterName: string;
  role: string;
  projectLogo: string;
  projectIcon: React.ReactNode;
}

export interface AcceptInvitationPageProps {
  projectList: Project[];
  setSelectedProjectId: (id: number) => void;
  invitation: Invitation | null;
  isLoggedIn: boolean;
  userEmail: string;
  handleAcceptInvite: () => void;
}