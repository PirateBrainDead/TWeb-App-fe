import { compareTimes, TaskStatus } from '@/constants/constants';
import { HeaderSection, Section } from '@/dto/Sections.dto';
import { Task } from '@/dto/Tasks.dto';
import dayjs from 'dayjs';

export function transformHeaderSections(
  sections: Section[],
  tasks: Task[]
): HeaderSection[] {
  const headerSections: HeaderSection[] = [];

  sections.forEach((section: Section) => {
    const sectionTasks = tasks.filter(
      (task: Task) => task.sectionId === section.id
    );

    const completedTasks =
      sectionTasks.filter((task: Task) => task.status === TaskStatus.DONE)
        .length ?? 0;

    const borderColor = sectionTasks
      ?.filter((task) => task?.status !== TaskStatus.DONE)
      .every(isTaskPhaseValid)
      ? true
      : false;

    headerSections.push({
      ...section,
      inPhase: borderColor,
      totalTasks: sectionTasks.length,
      completedTasks: completedTasks,
    });
  });

  return headerSections;
}

const isTaskPhaseValid = (task: Task) => {
  if (task.startTime.length === 0) {
    return task.status === TaskStatus.INITIATED;
  }
  return (
    task.status === TaskStatus.INITIATED ||
    compareTimes(task.startTime, dayjs().format('HH:mm'))
  );
};
