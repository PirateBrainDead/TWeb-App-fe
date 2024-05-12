'use client';
import { Task } from '@/dto/Tasks.dto';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskItemDraggable from '@/components/molecules/TaskItemDraggable';
import { Translations } from '@/constants/constants';
import { Section } from '@/dto/Sections.dto';

interface Props {
  tasks: Task[];
  setNewTask?: React.Dispatch<React.SetStateAction<Task>>;
  isArchive: boolean;
  translations: Translations;
  setDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTask?: React.Dispatch<React.SetStateAction<Task>>;
  sections: Section[];
  setContextTask: Dispatch<SetStateAction<Task>>;
  setTaskExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function TaskItem({
  tasks,
  setNewTask,
  isArchive,
  translations,
  setDeleteModal,
  setDeleteTask,
  sections,
  setContextTask,
  setTaskExpanded,
}: Props) {
  const [activeStates, setActiveStates] = useState(
    Array(tasks.length).fill(false)
  );
  const handleSectionClick = (index: number) => {
    const newActiveStates = new Array(activeStates.length).fill(false);
    newActiveStates[index] = !activeStates[index];
    setActiveStates(newActiveStates);
  };

  return (
    <Droppable key={'tasksId'} droppableId='tasksId' isDropDisabled={true}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='w-full'
        >
          <div className='grid grid-cols-2 gap-x-6 w-full items-center'>
            {tasks?.map((task, index) => {
              return (
                <div key={index} className='break-inside-avoid-column'>
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={`task-${task.id}-index-${index}-title-${task.name}`}
                        id={'dragTask'}
                      >
                        <div className='mx-1'>
                          <TaskItemDraggable
                            task={task}
                            activeStates={activeStates}
                            index={index}
                            handleSectionClick={handleSectionClick}
                            setNewTask={setNewTask}
                            setDeleteModal={setDeleteModal}
                            setDeleteTask={setDeleteTask}
                            isArchive={isArchive}
                            translations={translations}
                            snapshot={snapshot}
                            sections={sections}
                            setContextTask={setContextTask}
                            setTaskExpanded={setTaskExpanded}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                </div>
              );
            })}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
