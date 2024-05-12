export interface Section {
  id: string;
  name: string;
  plannedDays?: string[];
  iconName: string;
}

export interface HeaderSection extends Section {
  inPhase: boolean;
  completedTasks: number;
  totalTasks: number;
}
