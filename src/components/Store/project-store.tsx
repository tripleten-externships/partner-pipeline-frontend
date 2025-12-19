import { create } from 'zustand';

export type ProjectIcon = 'stack' | 'waveform' | 'bar';

export interface Project {
  id: number;
  name: string;
  icon: ProjectIcon;
  shortcut: string;
}

interface ProjectStore {
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
  resetProject: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),
  resetProject: () => set({ currentProject: null }),
}));