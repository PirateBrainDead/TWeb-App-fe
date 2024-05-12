import { Notice } from '@/dto/Notices.dto';
import { Section } from '@/dto/Sections.dto';
import { RepeatableTask, Task, TaskTemplate } from '@/dto/Tasks.dto';

export enum EventSyncStatus {
  CREATED,
  UPDATED,
  DELETED,
  DELETE_FAILED,
}

export interface SocketSections {
  sections: Section;
  syncStatus: EventSyncStatus;
}

export interface SocketNotices {
  notices: Notice;
  syncStatus: EventSyncStatus;
}
export interface SocketTasks {
  syncStatus: EventSyncStatus;
  taskIdForDelete?: string;
  tasks: Task[] | RepeatableTask[];
  date?: string;
}
export interface SocketTemplates {
  syncStatus: EventSyncStatus;
  taskTemplates: TaskTemplate[];
  idForDelete: string;
}
export const SOCKET_PATH = {
  SECTIONS: {
    PLANNING: (storeId: string) => `sections-planning|store:${storeId}`,
    CHANGES: (storeId: string) => `sections|store:${storeId}`,
    DELETED: (storeId: string) => `sections-delete|store:${storeId}`,
  },
  NOTICES: {
    CHANGES: (storeId: string) => `notices|store:${storeId}`,
  },
  TASKS: {
    DAILY: (storeId: string) => `daily|store:${storeId}`,
    REPEATABLE: (storeId: string) => `repeatable|store:${storeId}`,
  },
  TASK_TEMPLATES: {
    CHANGES: (userId: string) => `task-templates|user:${userId}`,
  },
};
