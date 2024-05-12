'use client';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import BackIconSvg from '../atoms/svg/BackIcon';
import { Task, TaskTemplate } from '@/dto/Tasks.dto';
import { Section } from '@/dto/Sections.dto';
import { TaskStatus, Translations, currentDate } from '@/constants/constants';
import TaskIcons from '../molecules/TaskIcons';
import CustomButton from '../atoms/Button';
import { toast } from 'react-toastify';
import { updateTaskTemplate } from '@/server/TaskTemplates';
import { updateTask } from '@/server/Tasks';
import { DateContext } from '@/context/DateContext';

interface Props {
  task: Task;
  sections: Section[];
  translations: Translations;
  setNewTask?: Dispatch<SetStateAction<Task>>;
  isArchive: boolean;
  setDeleteModal?: Dispatch<SetStateAction<boolean>>;
  setDeleteTask?: Dispatch<SetStateAction<Task>>;
  setContextTask: Dispatch<SetStateAction<Task>>;
  setTaskExpanded: Dispatch<SetStateAction<boolean>>;
  setIsDraggedTask: Dispatch<SetStateAction<boolean>>;
}

export default function TaskExpandView({
  task,
  sections,
  translations,
  setNewTask,
  isArchive,
  setDeleteModal,
  setDeleteTask,
  setContextTask,
  setTaskExpanded,
  setIsDraggedTask,
}: Props) {
  const { contextDate } = useContext(DateContext);
  const isButtonDisabled =
    task.status === TaskStatus.DONE ||
    task.status === TaskStatus.INITIATED ||
    contextDate < currentDate;

  const updatePriority = async (task: Task) => {
    if (task) {
      const response = await updateTask({
        allEvents: false,
        date: currentDate,
        description: task.description,
        endDate: task.endDate || currentDate,
        id: task.id,
        name: task.name,
        prioritize: !task.prioritize,
        repeatDaysInWeek: task.repeatDaysInWeek || [],
        startTime: task.startTime,
        estimatedTime: task.estimatedTime,
        attachments: task.attachments,
        comments: task.comments,
        checklist: task.checklist,
      });
      if (typeof response === 'boolean') {
        if (task.prioritize == false) {
          toast(translations.prioritizeTitle, {
            type: 'success',
          });
        } else {
          toast(translations.dePrioritizeTitle, {
            type: 'success',
          });
        }
      } else {
        const errors = response.message.split('.');
        errors.map((part: string) => toast(part, { type: 'error' }));
      }
    }
  };
  const updateTaskTemplatePriority = async (task: TaskTemplate) => {
    if (task) {
      const response = await updateTaskTemplate({
        name: task.name,
        description: task.description,
        sectionIds: task.sectionIds,
        endDate: task.endDate || currentDate,
        repeatDaysInWeek: task.repeatDaysInWeek || [],
        startTime: task.startTime,
        prioritize: !task.prioritize,
        id: task.id,
        estimatedTime: task.estimatedTime,
        attachments: task.attachments,
        checklist: task.checklist,
        comments: task.comments,
      });
      if (typeof response === 'boolean') {
        toast(translations.prioritizeTitle, {
          type: 'success',
        });
      } else {
        const errors = response.message.split('.');
        errors.map((part: string) => toast(part, { type: 'error' }));
      }
    }
  };

  return (
    <div className='text-white text-bold w-full m-5 h-screen'>
      <div className='flex h-full'>
        <div
          onClick={() => {
            setTaskExpanded(false);
            setContextTask({} as Task);
          }}
          className='cursor-pointer'
        >
          <BackIconSvg />
        </div>

        <div className='w-full h-full'>
          <span className='flex justify-center font-semibold'>
            {task?.name}
          </span>
          <div>
            {task.status == TaskStatus.INITIATED ||
            task.status == TaskStatus.DONE ? (
              <TaskIcons
                time={task?.startTime}
                isPriority={task?.prioritize}
                status={task?.status}
                translations={translations}
                sections={sections}
                sectionId={task?.sectionId}
                endTime={task?.endTime}
                estimatedTime={task.estimatedTime}
                checklist={task.checklist?.items.length > 0 ? true : false}
                actualStartTime={task.actualStartTime}
                hidePriority
              />
            ) : (
              <TaskIcons
                time={task?.startTime}
                isPriority={task?.prioritize}
                status={task?.status}
                translations={translations}
                sections={sections}
                sectionId={task?.sectionId}
                endTime={task?.endTime}
                estimatedTime={task.estimatedTime}
                checklist={task.checklist?.items.length > 0 ? true : false}
              />
            )}
          </div>

          {/* Scrollable */}
          <div className='h-[80%] overflow-y-auto scrollbar-none pb-[14.8rem]'>
            <div>
              <span className='font-bold my-4'>{translations.description}</span>
              <p className='mt-2 text-sm text-dark-60 whitespace-pre-line'>
                {task.description}
              </p>
            </div>

            {!isButtonDisabled && (
              <div className='flex justify-between gap-2 mb-2 mt-4 '>
                <div className='cursor-pointer w-full'>
                  <CustomButton
                    onClick={() => {
                      if (!isArchive) updatePriority(task);
                      else updateTaskTemplatePriority(task);
                    }}
                    color={'warning'}
                  >
                    <p className='text-black text-xs px-1 py-[0.1rem]'>
                      {task.prioritize
                        ? translations.dePrioritizeTitle
                        : translations.prioritizeTitle}
                    </p>
                  </CustomButton>
                </div>
                <div
                  className='cursor-pointer w-full'
                  onClick={() => {
                    setNewTask && setNewTask(task);
                    setTaskExpanded(false);
                    setIsDraggedTask(false);
                  }}
                >
                  <CustomButton color={'white'}>
                    <p className='text-black text-xs px-1 py-[0.1rem]'>
                      {translations.editTask}
                    </p>
                  </CustomButton>
                </div>

                <div
                  className='cursor-pointer  w-full'
                  onClick={async () => {
                    setDeleteTask && setDeleteTask(task);
                    setDeleteModal && setDeleteModal(true);
                    setTaskExpanded(false);
                  }}
                >
                  <CustomButton color={'danger'}>
                    <p className='text-white text-xs px-1 py-[0.1rem]'>
                      {translations.deleteTask}
                    </p>
                  </CustomButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
