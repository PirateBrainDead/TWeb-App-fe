import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import TaskIcons from '@/components/molecules/TaskIcons';
import { updateTask } from '@/server/Tasks';
import CustomButton from '@/components/atoms/Button';
import { Task, TaskTemplate } from '@/dto/Tasks.dto';
import { currentDate, TaskStatus, Translations } from '@/constants/constants';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Section } from '@/dto/Sections.dto';
import { updateTaskTemplate } from '@/server/TaskTemplates';

interface TaskItemDraggableProps {
  task: Task;
  activeStates: boolean[];
  index: number;
  handleSectionClick?: (index: number) => void;
  setNewTask?: Dispatch<SetStateAction<Task>>;
  isArchive: boolean;
  translations: Translations;
  setDeleteModal?: Dispatch<SetStateAction<boolean>>;
  setDeleteTask?: Dispatch<SetStateAction<Task>>;
  snapshot?: DraggableStateSnapshot;
  sections: Section[];
  setContextTask: Dispatch<SetStateAction<Task>>;
  setTaskExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function TaskItemDraggable({
  task,
  activeStates,
  index,
  handleSectionClick,
  setNewTask,
  setDeleteModal,
  setDeleteTask,
  translations,
  snapshot,
  sections,
  isArchive,
  setContextTask,
  setTaskExpanded,
}: TaskItemDraggableProps) {
  const description =
    task.description.length > 30
      ? task.description.substring(0, 30) + '...'
      : task.description;

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
        checklist: task.checklist,
        comments: task.comments,
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
    <div key={task.id}>
      <div
        key={task.id}
        className={classNames(
          'me-1 py-1 text-dark-20 w-full',
          {
            'text-white rounded-lg border-dark-60 border px-3  pt-2 my-2 transition-all duration-500 ease-in-out':
              activeStates[index],
          },
          {
            'transition-all duration-150 ease-in-out': !activeStates[index],
          },
          {
            'text-white rounded-lg border-dark-40 border-2 px-3 pt-2 my-2 bg-dark-80':
              snapshot && snapshot.isDragging,
          }
        )}
      >
        <div
          className='text-white'
          onClick={() => {
            handleSectionClick ? handleSectionClick(index) : null;
            setContextTask(task);
            setTaskExpanded(true);
          }}
        >
          <p className='pb-2  text-xs'>{task.name}</p>

          {task.description.length > 30 ? (
            <p className=' border-none align-top focus:ring-0 placeholder-transparent text-xs text-dark-60 break-words min-h-[3rem] '>
              {activeStates[index] ? task.description : description}
              {!activeStates[index] && task.description.length > 30 && (
                <span className='cursor-pointer text-primary ps-1'>
                  {translations.showMore}
                </span>
              )}
            </p>
          ) : (
            <p className=' border-none align-top focus:ring-0 placeholder-transparent text-xs text-dark-60 break-words min-h-[3rem] whitespace-pre-line'>
              {activeStates[index] ? task.description : description}
              {!activeStates[index] && task.description.length > 30 && (
                <span className='cursor-pointer text-primary ps-1'>
                  {translations.showMore}
                </span>
              )}
            </p>
          )}

          <div>
            {task.status == TaskStatus.INITIATED ||
            task.status == TaskStatus.DONE ? (
              <TaskIcons
                time={task.startTime}
                isPriority={task.prioritize}
                status={task.status}
                translations={translations}
                sections={sections}
                sectionId={task.sectionId}
                endTime={task.endTime}
                estimatedTime={task.estimatedTime}
                checklist={task.checklist?.items.length > 0 ? true : false}
                actualStartTime={task.actualStartTime}
                hidePriority
              />
            ) : (
              <TaskIcons
                time={task.startTime}
                isPriority={task.prioritize}
                status={task.status}
                translations={translations}
                sections={sections}
                sectionId={task.sectionId}
                endTime={task.endTime}
                estimatedTime={task.estimatedTime}
                checklist={task.checklist?.items.length > 0 ? true : false}
              />
            )}
          </div>
        </div>
        {task.status !== TaskStatus.DONE && activeStates[index] && (
          <div className='flex justify-center mb-2 gap-x-2'>
            <div className='cursor-pointer'>
              <CustomButton
                size='sm'
                color='warning'
                onClick={() => {
                  if (!isArchive) updatePriority(task);
                  else updateTaskTemplatePriority(task);
                  activeStates[index] = false;
                }}
              >
                <p className='text-black text-xs px-1 py-[0.1rem]'>
                  {task.prioritize
                    ? translations.dePrioritizeTitle
                    : translations.prioritizeTitle}
                </p>
              </CustomButton>
            </div>
            <div
              className='cursor-pointer'
              onClick={() => {
                setNewTask && setNewTask(task);
                activeStates[index] = false;
              }}
            >
              <CustomButton size='sm' color='white'>
                <p className='text-black text-xs px-1 py-[0.1rem]'>
                  {translations.editTask}
                </p>
              </CustomButton>
            </div>

            <div
              className='cursor-pointer'
              onClick={async () => {
                setDeleteTask && setDeleteTask(task);
                activeStates[index] = false;
                setDeleteModal && setDeleteModal(true);
              }}
            >
              <CustomButton size='sm' color='danger'>
                <p className='text-white text-xs px-1 py-[0.1rem]'>
                  {translations.deleteTask}
                </p>
              </CustomButton>
            </div>
          </div>
        )}
        {!activeStates[index] && (
          <div className='flex justify-center'>
            <div className='h-[0.01rem] w-full bg-dark-80'></div>
          </div>
        )}
      </div>
    </div>
  );
}
