'use client';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  getSectionName,
  TaskStatus,
  Translations,
} from '@/constants/constants';
import { Section } from '@/dto/Sections.dto';
import { Task } from '@/dto/Tasks.dto';
import DateSwiper from '@/components/molecules/DateSwiper';
import Tab from '@/components/molecules/Tab';
import CustomButton from '@/components/atoms/Button';
import TaskItem from '@/components/molecules/TaskItem';
import TaskCreator from '@/components/organisms/TaskCreator';
import ConfirmationModal from '@/components/molecules/ConfirmationModal';
import { deleteTask } from '@/server/Tasks';
import { deleteTaskTemplate } from '@/server/TaskTemplates';
import { toast } from 'react-toastify';
import MonthDropDown from '@/components/organisms/MonthDropDown';
import TaskViewerWeekChange from '@/components/organisms/TaskViewerWeekChange';
import BackIconSvg from '@/components/atoms/svg/BackIcon';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import clipboardCopy from 'clipboard-copy';
import { DateContext } from '@/context/DateContext';
import TaskExpandView from './TaskExpandView';
interface Props {
  sections: Section[];
  tasks: Task[];
  templateTasks: Task[];
  translations: Translations;
  queryFilter: string;
  date: string;
  months: string[];
  loadingData: boolean;
}
export default function TaskClientComponent({
  sections,
  tasks,
  templateTasks,
  translations,
  queryFilter,
  date,
  months,
  loadingData,
}: Props) {
  const [isDraggedTaskArchive, setisDraggedTaskArchive] = useState(false);
  const [isDraggedTask, setIsDraggedTask] = useState(false);
  const [newTask, setNewTask] = useState<Task>({} as Task);
  const [deletedTask, setDeleteTask] = useState<Task>({} as Task);
  const [isArchive, setIsArchive] = useState<boolean>(false);
  const [data, setData] = useState(tasks);
  const [templateData, setTemplateData] = useState(templateTasks);
  const [sectionFilter, setSectionFilter] = useState<string[]>([queryFilter]);
  const [activeState, setActiveState] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { setContextDate } = useContext(DateContext);
  const [isSortedYet, setIsSortedYet] = useState(false);

  const [draggableContextTask, setDraggableContextTask] = useState<Task>(
    {} as Task
  );
  const [taskExpanded, setTaskExpanded] = useState<boolean>(false);

  useEffect(() => {
    setContextDate(date);
  }, [date]);

  useEffect(() => {
    setData(tasks);
    setTemplateData(templateTasks);
    if (queryFilter !== 'allTasks') {
      setSectionFilter([queryFilter]);
    } else {
      setSectionFilter([]);
    }
    setLoading(false);
  }, [tasks, queryFilter, templateTasks]);

  useLayoutEffect(() => {
    setIsSortedYet(false);
    if (activeState) {
      setData(
        tasks
          .filter((task) => {
            if (task.status !== TaskStatus.DONE) {
              if (sectionFilter.length === 0) {
                return true;
              } else {
                return sectionFilter.includes(task.sectionId);
              }
            }
          })
          .filter((task) => {
            if (!isArchive) {
              return getSectionName(task.sectionId, sections) !== undefined;
            }
          })
      );
    } else {
      setData(
        tasks
          .filter((task) => {
            if (task.status === TaskStatus.DONE) {
              if (sectionFilter.length === 0) {
                return true;
              } else {
                return sectionFilter.includes(task.sectionId);
              }
            }
          })
          .filter((task) => {
            if (!isArchive) {
              return getSectionName(task.sectionId, sections) !== undefined;
            }
          })
      );
    }
    setTemplateData(
      templateTasks.filter((task) => {
        if (sectionFilter.length === 0) {
          return true;
        } else {
          return task.sectionIds?.some((sectionId) =>
            sectionFilter.includes(sectionId)
          );
        }
      })
    );

    setIsSortedYet(true);
  }, [sectionFilter, activeState]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;
    if (destination.droppableId === 'taskCreator') {
      const draggedTaskIndex = source.index;
      let draggedTaskData = {} as Task;
      setIsDraggedTask(true);
      if (!isArchive) {
        draggedTaskData = data[draggedTaskIndex];
      } else {
        draggedTaskData = templateTasks[draggedTaskIndex];
      }
      clipboardCopy(JSON.stringify(draggedTaskData)).then(() => {
        setNewTask && setNewTask(draggedTaskData);

        if (isArchive) {
          setisDraggedTaskArchive(true);
        } else {
          setisDraggedTaskArchive(false);
        }
      });
    }
  };
  useEffect(() => {
    setSectionFilter([]);
  }, [isArchive]);
  return (
    <div className='flex flex-row px-14 pb-16 pt-3'>
      {/*------ Modals ------------*/}
      <ConfirmationModal
        title={translations.modalTitle}
        description={translations.modalDeleteDescription}
        type='danger'
        showModal={deleteModal}
        confirmText={translations.modalConfirmText}
        cancelText={translations.modalCancelText}
        handleConfirmation={async () => {
          if (!isArchive) {
            const response = await deleteTask({
              id: deletedTask.id,
              date: date,
              allEvents: deletedTask?.isRepeatable ?? false,
            });
            if (typeof response === 'boolean') {
              toast(translations.FlashMessageDeletedTask, {
                type: 'success',
              });
            } else {
              const errors = response.message.split('.');
              errors.map((part: string) =>
                toast(translations[part], { type: 'error' })
              );
            }
          } else {
            const response = await deleteTaskTemplate(deletedTask.id);
            if (typeof response === 'boolean') {
              toast(translations.FlashMessageDeleteTemplate, {
                type: 'success',
              });
            } else {
              const errors = response.message.split('.');
              errors.map((part: string) => toast(part, { type: 'error' }));
            }
          }
          setDeleteModal(false);
        }}
        handleCancellation={() => {
          setDeleteTask({} as Task);
          setDeleteModal(false);
        }}
      />

      {/*-----------------------------*/}
      <DragDropContext onDragEnd={onDragEnd}>
        {isSortedYet && (
          <>
            {/*Left Columns*/}

            {!taskExpanded ? (
              <div className='w-1/2 flex flex-col items-center relative overflow-y-scroll overflow-x-hidden h-screen pb-[16.5rem] scrollbar-none'>
                <div className='w-[0.07rem] h-[60%] absolute right-[-1.25rem] overflow-y-hidden bg-gradient-to-t from-taskBackground  via-dark-80  to-taskBackground' />
                {!isArchive ? (
                  <div className='flex w-full'>
                    <div>
                      <MonthDropDown months={months} setLoading={setLoading} />
                    </div>
                    <div className='flex w-full justify-center ml-[-6rem]'>
                      <TaskViewerWeekChange
                        translations={translations}
                        setLoading={setLoading}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='flex w-full items-center'>
                    <div
                      className='cursor-pointer flex items-center'
                      onClick={() => setIsArchive(false)}
                    >
                      <span>
                        <BackIconSvg />
                      </span>
                      <p className='text-white font-bold ml-2 text-sm'>
                        {translations.backToPlanning}
                      </p>
                    </div>
                    <div className='flex justify-center w-7/12'>
                      <p className='text-white text-lg font-bold'>
                        {translations.taskArchive}
                      </p>
                    </div>
                  </div>
                )}

                {!isArchive && (
                  <>
                    <div className=' mt-2'>
                      <DateSwiper
                        weekDaysTranslations={translations}
                        setLoading={setLoading}
                      />
                    </div>
                    <div className='w-full justify-center flex'>
                      <Tab
                        translations={translations}
                        active={activeState}
                        setActiveState={setActiveState}
                      />
                    </div>
                  </>
                )}
                <div className='w-full'>
                  <div className='w-full overflow-x-scroll scrollbar-none mt-3'>
                    <div className='flex w-96 '>
                      {sections.map((section: Section) => {
                        return (
                          <div className='pe-2' key={section.id}>
                            <CustomButton
                              color={
                                sectionFilter.includes(section.id)
                                  ? 'primary'
                                  : 'default'
                              }
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
                              <p className='w-auto whitespace-nowrap text-xs text-white'>
                                {section.name}
                              </p>
                            </CustomButton>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {loading || loadingData ? (
                  <div className='flex justify-center items-center mt-12 w-full'>
                    <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
                  </div>
                ) : (
                  <div className='w-full mt-3'>
                    {!isArchive ? (
                      <>
                        {data.length > 0 ? (
                          <div className='w-full gap-x-4 '>
                            <TaskItem
                              tasks={data}
                              setNewTask={setNewTask}
                              setDeleteModal={setDeleteModal}
                              setDeleteTask={setDeleteTask}
                              isArchive={isArchive}
                              translations={translations}
                              sections={sections}
                              setContextTask={setDraggableContextTask}
                              setTaskExpanded={setTaskExpanded}
                            />
                          </div>
                        ) : (
                          <div className='flex justify-center items-center h-60'>
                            <p className='text-white text-base font-bold'>
                              {translations['emptyTasksTitle']}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {templateData.length > 0 ? (
                          <div className='w-full gap-x-4 '>
                            <TaskItem
                              tasks={templateData}
                              setNewTask={setNewTask}
                              setDeleteModal={setDeleteModal}
                              setDeleteTask={setDeleteTask}
                              isArchive={isArchive}
                              translations={translations}
                              sections={sections}
                              setContextTask={setDraggableContextTask}
                              setTaskExpanded={setTaskExpanded}
                            />
                          </div>
                        ) : (
                          <div className='flex justify-center items-center h-60'>
                            <p className='text-white text-base font-bold'>
                              {translations['emptyTasksTitle']}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className='w-1/2'>
                <TaskExpandView
                  task={draggableContextTask}
                  sections={sections}
                  translations={translations}
                  setNewTask={setNewTask}
                  setDeleteModal={setDeleteModal}
                  setDeleteTask={setDeleteTask}
                  isArchive={isArchive}
                  setContextTask={setDraggableContextTask}
                  setTaskExpanded={setTaskExpanded}
                  setIsDraggedTask={setIsDraggedTask}
                />
              </div>
            )}

            <div className='w-[0.1rem] ml-10 mt-[-0.6rem] bg-gradient-to-t from-dark  via-dark-80  to-dark' />

            {/*Right Columns*/}
            <div className=' w-1/2'>
              <TaskCreator
                translations={translations}
                sections={sections}
                editTask={newTask}
                setEditTask={setNewTask}
                isArchive={isArchive}
                setIsArchive={setIsArchive}
                isDraggedTaskArchive={isDraggedTaskArchive}
                setisDraggedTaskArchive={setisDraggedTaskArchive}
                setLoader={setLoading}
                isDraggedTask={isDraggedTask}
                taskExpanded={taskExpanded}
              />
            </div>
          </>
        )}
      </DragDropContext>
    </div>
  );
}
