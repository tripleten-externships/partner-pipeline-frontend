import { z } from "zod";

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
  onCancel: () => void;
  onSubmit: () => void;
  onDelete: () => void;
};

export type MilestoneProps = {
  selectedProjectId: string
};

export type DashProps = {
  projectList: Project[];
  selectedProjectId: string;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<string>>;
  currentProject?: Project | null;
  onSubmit: () => void;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openMenus: string[];
  setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;
  toggleMenu: (menu: string) => void;
  isProjectDropdownOpen: boolean;
  setIsProjectDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleProjectSelect: (id: string) => void;
  handleAddProject: (values: ProjectFormValues) => void;
  handleDeleteProject: () => void;
  loadingProjects: boolean;
  projectError: Error | undefined;
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
  isAddProjectSheetOpen: boolean;
  setIsAddProjectSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onProjectSubmit: (values: ProjectFormValues) => void;
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
  isAddProjectSheetOpen: boolean;
  setIsAddProjectSheetOpen: (open: boolean) => void;

  loadingProjects: boolean;
  projectError: Error | undefined;
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

export type ProjectSwitcherProps = {
  projectList: Project[];
  selectedProjectId: string;
  handleProjectSelect: (id: string) => void;
  isProjectDropdownOpen: boolean;
  toggleProjectDropdown: (e: React.MouseEvent) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  isAddProjectSheetOpen: boolean;
  setIsAddProjectSheetOpen: (open: boolean) => void;
  loading?: boolean;
  error?: Error;
};

export interface AddProjectFormProps {
  onSubmit: (values: ProjectFormValues) => void;
  onSuccess?: () => void;
  isLoading?: boolean;
  onProjectSubmit: (values: ProjectFormValues) => void;
}

export const projectFormSchema = z.object({
  name: z.string().min(1, "Project Name is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["Active", "Paused", "Completed"]),
  img: z
    .any()
    .refine(
      (file) =>
        !file || (file instanceof File && ["image/png", "image/jpeg"].includes(file.type)),
      "Only PNG or JPEG images are allowed"
    )
    .optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
