'use client';

import React, { useContext, useEffect, useState } from 'react';
import { fetchFormattedDate, isAfterToday } from '@/utils/Date';
import { Task } from '@/dto/Tasks.dto';
import TaskClientComponent from '@/components/organisms/TaskClientComponent';
import { getRepeatableTasks, getTasksByDate } from '@/server/Tasks';
import { Section } from '@/dto/Sections.dto';
import { z } from 'zod';
import { SearchParamsType } from '@/dto/PageProps';
import DateContextWrapper from '@/context/DateContext';
import { Translations, getSectionName, sortList } from '@/constants/constants';
import { TaskContext } from '@/context/TaskContext';

interface Props {
  sections: Section[];
  templates: Task[];
  translations: Translations;
  searchParams: SearchParamsType;
  months: string[];
}

export default function TaskClientData({
  translations,
  sections,
  searchParams,
  templates,
  months,
}: Props) {
  const {
    tasks: contextTasks,
    setTasks: setContextTasks,
    repeat,
  } = useContext(TaskContext);
  const currentDate = z.date().safeParse(new Date(searchParams?.date)).success
    ? searchParams.date.toString()
    : fetchFormattedDate(new Date());

  const currentSection = searchParams.section?.toString() ?? 'allTasks';
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    let tasksLocal: Task[];
    const isFutureDate = isAfterToday(new Date(currentDate));
    if (!isFutureDate) {
      tasksLocal = await getTasksByDate(currentDate);
    } else {
      tasksLocal = await getRepeatableTasks(currentDate);
    }
    setContextTasks(tasksLocal);
    sortList(tasksLocal);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams?.date, searchParams?.section, repeat]);

  return (
    <>
      <DateContextWrapper date={currentDate}>
        <TaskClientComponent
          date={currentDate}
          translations={translations}
          sections={sections}
          queryFilter={currentSection}
          tasks={contextTasks}
          templateTasks={templates.filter((task) => {
            return task.sectionIds?.every((sectionId) => {
              return getSectionName(sectionId, sections) !== undefined;
            });
          })}
          months={months}
          loadingData={loading}
        />
      </DateContextWrapper>
    </>
  );
}
