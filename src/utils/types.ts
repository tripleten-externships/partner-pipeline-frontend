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
};

export type DashProps = {
  projectList: Project[];
  setProjectList: React.Dispatch<React.SetStateAction<Project[]>>;
  selectedProjectId: string;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<string>>;
  currentProject?: Project;
  handleSave: (updatedFields: Partial<Project>) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openMenus: string[];
  setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;
  handleProjectSelect: (id: string) => void;
  formData: FormFields;

  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    status: ProjectStatus;
  }>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: <K extends keyof FormFields>(field: K, value: FormFields[K]) => void;
};

export type DashCardProps = {
  children?: React.ReactNode;
};

export type BreadcrumbHeaderProps = {
  section: string;
  page: string;
};

export type SidebarProps = {
  projectList: Project[];
  selectedProjectId: string;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<string>>;
  openMenus: string[];
  setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;
  handleProjectSelect: (id: string) => void;
};

export type ProjectSwitcherProps = {
  projectList: Project[];
  selectedProjectId: string;
  handleProjectSelect: (id: string) => void;
};