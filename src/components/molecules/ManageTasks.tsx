import React from 'react';
import classNames from 'classnames';
import ArrowSvg from '@/components/atoms/svg/Arrow';
import CustomButton from '@/components/atoms/Button';
import { fetchModalDate } from '@/utils/Date';
import Tab from '@/components/molecules/Tab';
import { TaskStatus, Translations } from '@/constants/constants';
import { Section } from '@/dto/Sections.dto';
import { Task } from '@/dto/Tasks.dto';
import TaskIcons from './TaskIcons';

interface Props {
  translations: Translations;
  sections: Section[];
  date: string;
  tasks: Task[];
  sectionFilter: string[];
  setSectionFilter: React.Dispatch<React.SetStateAction<string[]>>;
  activeState: boolean;
  setActiveState: React.Dispatch<React.SetStateAction<boolean>>;
  expandedIndex: number | null;
  handleShowMore: (index: number | null) => void;
  handleModalClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ManageTasks({
  translations,
  sections,
  date,
  tasks,
  sectionFilter,
  setSectionFilter,
  activeState,
  setActiveState,
  expandedIndex,
  handleShowMore,
  handleModalClose,
}: Props) {
  const allTasks = tasks.length;
  const completedTasks =
    tasks?.filter((task: any) => task?.status === TaskStatus.DONE).length ?? 0;

  return (
    <div className='flex text-white'>
      <div className='h-full w-full flex flex-col items-center'>
        <div className='flex text-white justify-between w-full items-center font-medium text-lg'>
          <div className='flex items-center'>
            <div
              onClick={() => {
                handleModalClose(false);
              }}
            >
              <ArrowSvg height={20} width={20} />
            </div>
            <span className='ps-6'>
              {fetchModalDate(new Date(date), translations)}
            </span>
          </div>
          <span className='pe-6'>
            {translations.taskCompleted}
            {': '} {completedTasks}/{allTasks}
          </span>
        </div>
        <div className='w-full flex justify-center scale-110'>
          <Tab
            translations={translations}
            active={activeState}
            setActiveState={setActiveState}
          />
        </div>

        <div className='mt-3 mb-3 w-full'>
          <div className='flex gap-2 overflow-x-auto scrollbar-none'>
            {sections.map((section: Section) => {
              return (
                <div className='pe-2' key={section.id}>
                  <CustomButton
                    color={
                      sectionFilter.includes(section.id) ? 'primary' : 'default'
                    }
                    size='md'
                    onClick={() => {
                      if (
                        sectionFilter.length === 1 &&
                        sectionFilter[0] === section.id
                      ) {
                        setSectionFilter([]);
                        return;
                      }

                      if (sectionFilter.includes(section.id)) {
                        const filter = sectionFilter.filter(
                          (id) => id !== section.id
                        );
                        setSectionFilter(filter);
                        return;
                      }
                      const filter = [...sectionFilter, section.id];
                      setSectionFilter(filter);
                    }}
                  >
                    <p
                      className={classNames(
                        'w-auto whitespace-nowrap text-xs',
                        {
                          'text-white': sectionFilter.includes(section.id),
                        },
                        {
                          'text-dark-40 ': !sectionFilter.includes(section.id),
                        }
                      )}
                    >
                      {section.name}
                    </p>
                  </CustomButton>
                </div>
              );
            })}
          </div>
        </div>
        <div className='overflow-y-scroll h-[25rem] scrollbar-none w-full'>
          {tasks.length > 0 ? (
            <div className='columns-2 w-full gap-x-6 mt-5 items-center break-words'>
              {tasks.map((task: any, index: any) => {
                const isExpanded = index === expandedIndex;

                const description =
                  task.description.length > 150
                    ? task.description.substring(0, 150) + '...'
                    : task.description;

                return (
                  <div key={index} className='break-inside-avoid-column'>
                    <div
                      className={classNames(
                        'me-1 py-1 text-dark-20 w-full rounded-lg ease-in-out transition-all ',
                        {
                          'text-white border-dark-60 border px-3  pt-2 my-2 duration-500':
                            isExpanded,
                        },
                        {
                          'duration-150 border-dark-60': !isExpanded,
                        }
                      )}
                      onClick={() => handleShowMore(index)}
                    >
                      <p className='pb-2  text-xs'>{task.name}</p>
                      <p className=' border-none align-top focus:ring-0 placeholder-transparent text-xs text-dark-60 break-words min-h-[2rem]'>
                        {isExpanded ? task.description : description}
                        {!isExpanded && task.description.length > 150 && (
                          <span className='cursor-pointer text-primary ps-1'>
                            show more
                          </span>
                        )}
                      </p>
                      <TaskIcons
                        time={task.startTime}
                        isPriority={task.prioritize}
                        status={task.status}
                        translations={translations}
                        endTime={task.endTime}
                        checklist={
                          task.checklist?.items.length > 0 ? true : false
                        }
                      />
                      {!isExpanded && (
                        <div className='h-[0.01rem] w-full bg-dark-80'></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='flex justify-center'>
              <p className='text-white text-xl font-bold mt-5'>
                {translations.emptyTasksTitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
