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
};

export type DashProps = {
  projectList: Project[];
  setProjectList: React.Dispatch<React.SetStateAction<Project[]>>;
  selectedProjectId: number;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number>>;
  currentProject?: Project;
  handleSave: (updatedFields: Partial<Project>) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openMenus: string[];
  setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;
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
};

export type DashCardProps = {
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
  setIsProjectDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleProjectSelect: (id: number) => void;
};

export type SidebarProps = {
  projectList: Project[];
  selectedProjectId: number;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number>>;
  openMenus: string[];
  setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;
  isProjectDropdownOpen: boolean;
  setIsProjectDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleProjectSelect: (id: number) => void;
};

export type ProjectSwitcherProps = {
  projectList: Project[];
  selectedProjectId: number;
  handleProjectSelect: (id: number) => void;
};