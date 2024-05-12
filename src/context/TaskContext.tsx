'use client';
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Task } from '@/dto/Tasks.dto';
interface TaskContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  repeat: number;
  setRepeat: Dispatch<SetStateAction<number>>;
}

interface Props {
  children: React.ReactNode;
}

export const TaskContext = createContext<TaskContextType>(
  {} as TaskContextType
);

function TaskContextWrapper({ children }: Props) {
  const [tasks, setTasks] = useState<Task[]>([] as Task[]);
  const [repeat, setRepeat] = useState(0);
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        repeat,
        setRepeat,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContextWrapper;
