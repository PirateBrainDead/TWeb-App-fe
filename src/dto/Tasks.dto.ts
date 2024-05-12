import { TaskStatus } from '@/constants/constants';
import dayjs from 'dayjs';

export interface Task {
  prioritize: boolean;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime?: string;
  id: string;
  sectionId: string;
  status: TaskStatus;
  repeatableTaskId: string;
  endDate?: string;
  repeatDaysInWeek?: number[];
  isRepeatable: boolean;
  sectionIds?: string[];
  startDate?: string;
  estimatedTime: string;
  // Phase 2 attachments
  attachments: Attachments;
  comments?: string[];
  checklist: CheckList;
  actualStartTime?: string;
}

export interface CheckList {
  items: CheckListItem[];
}

export interface CheckListItem {
  name: string;
  isChecked: boolean;
}

export interface Attachments {
  admin: string[];
  hq: string[];
}

export interface Tasks {
  tasks: Task[];
}

export interface CreateTask
  extends Omit<
    Task,
    | 'sectionId'
    | 'status'
    | 'id'
    | 'date'
    | 'repeatableTaskId'
    | 'endDate'
    | 'isRepeatable'
  > {
  startDate: string;
  endDate: string | dayjs.Dayjs;
  repeatDaysInWeek: number[];
  sectionIds: string[];
}

export interface DeleteTask {
  id: string;
  date: string;
  allEvents: boolean;
}

export interface RepeatableTask extends Omit<CreateTask, 'sectionIds'> {
  id: string;
  sectionId: string;
  excludeDays?: string[];
}

export interface UpdateTask
  extends Omit<CreateTask, 'sectionIds' | 'startDate'> {
  id: string;
  date: string;
  allEvents: boolean;
}

export interface TaskInitState {
  name: string;
  description: string;
  selectedSections: string[];
  selectedDays: number[];
  startTime: string | dayjs.Dayjs;
  prioritize: boolean;
  repeatUntil: dayjs.Dayjs;
}

export type TaskTemplate = {
  id?: string;
  name: string;
  description?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  prioritize?: boolean;
  sectionIds?: string[];
  repeatDaysInWeek?: number[];
  estimatedTime: string;
  attachments: Attachments;
  comments?: string[];
  checklist: CheckList;
};
