import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Task } from '@/dto/Tasks.dto';
import { Section } from '@/dto/Sections.dto';
import { TaskStatus, Translations } from '@/constants/constants';
import ManageTasks from '@/components/molecules/ManageTasks';
import { getTasksByDate } from '@/server/Tasks';

interface Props {
  translations: Translations;
  sections: Section[];
  handleModalClose: React.Dispatch<React.SetStateAction<boolean>>;
  date: string;
}

export default function ManageTasksModal({
  translations,
  sections,
  handleModalClose,
  date,
}: Props) {
  const session: any = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeState, setActiveState] = useState<boolean>(true);
  const [sectionFilter, setSectionFilter] = useState<string[]>([]);
  const [data, setData] = useState<Task[]>(tasks);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleShowMore = (index: number | null) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  useEffect(() => {
    setExpandedIndex(null);
    if (activeState) {
      setData(
        tasks.filter((task) => {
          if (task.status !== TaskStatus.DONE) {
            if (sectionFilter.length === 0) {
              return true;
            } else {
              return sectionFilter.includes(task.sectionId);
            }
          }
        })
      );
    } else {
      setData(
        tasks.filter((task) => {
          if (task.status === TaskStatus.DONE) {
            if (sectionFilter.length === 0) {
              return true;
            } else {
              return sectionFilter.includes(task.sectionId);
            }
          }
        })
      );
    }
  }, [sectionFilter, activeState, tasks]);

  useEffect(() => {
    if (session.data) {
      getTasksByDate(new Date(date)).then((data) => {
        setTasks(data);
      });
    }
  }, [session, date]);

  return (
    <ManageTasks
      translations={translations}
      sections={sections}
      tasks={data}
      date={date}
      sectionFilter={sectionFilter}
      setSectionFilter={setSectionFilter}
      activeState={activeState}
      setActiveState={setActiveState}
      expandedIndex={expandedIndex}
      handleShowMore={handleShowMore}
      handleModalClose={handleModalClose}
    />
  );
}
