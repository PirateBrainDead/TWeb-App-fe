import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useFormState } from 'react-dom';
import dayjs from 'dayjs';
import {
  Days,
  formatTime,
  secondsToFormattedTime,
  timeStringToSeconds,
  Translations,
} from '@/constants/constants';
import {
  CheckList,
  CheckListItem,
  CreateTask,
  Task,
  UpdateTask,
} from '@/dto/Tasks.dto';
import { Section } from '@/dto/Sections.dto';
import { createNewTask, updateTask } from '@/server/Tasks';
import { createTaskTemplate, updateTaskTemplate } from '@/server/TaskTemplates';
import { fetchFormattedDate, fetchStartOfWeek } from '@/utils/Date';
import { toast } from 'react-toastify';
import { DateContext } from '@/context/DateContext';

interface Props {
  editTask?: Task;
  sections: Section[];
  isArchive?: boolean;
  translations: Translations;
  setEditTask: Dispatch<SetStateAction<Task>>;
  isDraggedTaskArchive: boolean;
  setisDraggedTaskArchive: Dispatch<SetStateAction<boolean>>;
  isDraggedTask: boolean;
  taskExpanded?: boolean;
}
export const useTask = ({
  editTask,
  sections,
  isArchive,
  translations,
  setEditTask,
  isDraggedTaskArchive,
  isDraggedTask,
  taskExpanded,
}: Props) => {
  const { contextDate } = useContext(DateContext);
  const [task, setTask] = useState<Task>(editTask || ({} as Task));
  const [isRepeatable, setIsRepeatable] = useState(
    editTask ? !!editTask.repeatableTaskId : false
  );
  const [isEdit, setIsEdit] = useState(!!editTask?.name);

  const [activeStates, setActiveStates] = useState(
    Array(sections.length).fill(false)
  );
  const [activeDaysStates, setActiveDaysStates] = useState(
    Array(Days.length).fill(false)
  );
  const [todayDate, setTodayDate] = useState(fetchFormattedDate(new Date()));
  const [createState, createDispatch] = useFormState(
    handleCreateTaskFormSubmit,
    null
  );
  const [updateState, updateDispatch] = useFormState(
    handleUpdateTaskFormSubmit,
    null
  );
  const [createTaskTemplateState, createTaskTemplateDispatch] = useFormState(
    handleCreateTaskTemplateFormSubmit,
    null
  );
  const [updateTaskTemplateState, updateTaskTemplateDispatch] = useFormState(
    handleUpdateTaskTemplateFormSubmit,
    null
  );
  const [estimatedTime, setEstimatedTime] = useState<string>('0hrs 0min');
  const [formattedTime, setFormattedTime] = useState<string>('00:00');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [checkListItems, setCheckListItems] = useState<CheckListItem[]>([]);
  const [time, setTime] = useState(0);
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [estimatedMinutes, setEstimatedMinutes] = useState(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [startOfWeek, setStartOfWeek] = useState<string>(
    fetchStartOfWeek(new Date())
  );
  const handleSectionClick = (index: number) => {
    if (editTask?.name && !isArchive && isDraggedTaskArchive) {
      const newActiveStates = [...activeStates];
      newActiveStates[index] = !newActiveStates[index];
      setActiveStates(newActiveStates);
    } else if (editTask?.name && !isArchive && isDraggedTask) {
      const newActiveStates = [...activeStates];
      newActiveStates[index] = !newActiveStates[index];
      setActiveStates(newActiveStates);
    } else if (editTask?.name && !isArchive && !isDraggedTask) {
      const newActiveStates = Array(activeStates.length).fill(false);
      newActiveStates[index] = true;
      setActiveStates(newActiveStates);
    } else {
      const newActiveStates = [...activeStates];
      newActiveStates[index] = !newActiveStates[index];
      setActiveStates(newActiveStates);
    }
  };
  const handleDaysClick = (index: number) => {
    const newActiveStates = [...activeDaysStates];
    newActiveStates[index] = !newActiveStates[index];
    setActiveDaysStates(newActiveStates);
  };
  useEffect(() => {
    if (isDraggedTaskArchive) {
      setIsEdit(false);
      // setActiveStates(Array(sections.length).fill(false));
      editTask?.sectionIds?.map((id: string) => {
        setActiveStates((prev) => {
          const index = sections.findIndex((section) => section.id === id);
          prev[index] = true;
          return prev;
        });
      });
    } else {
      if (!isArchive) {
        const findIndex = sections.findIndex(
          (section) => section.id === editTask?.sectionId
        );

        if (findIndex !== -1) {
          const newActiveStates = Array(sections.length).fill(false);
          newActiveStates[findIndex] = true;
          setActiveStates(newActiveStates);
        } else {
          setActiveStates(Array(sections.length).fill(false));
        }
      } else {
        setActiveStates(Array(sections.length).fill(false));
        editTask?.sectionIds?.map((id: string) => {
          setActiveStates((prev) => {
            const index = sections.findIndex((section) => section.id === id);
            prev[index] = true;
            return prev;
          });
        });
      }
    }
  }, [editTask, isArchive]);

  useEffect(() => {
    if (editTask?.name) {
      setTask(editTask);
      setIsRepeatable(
        editTask.date === todayDate && !!editTask.repeatableTaskId
      );
      setIsEdit(true);
      setTime(timeStringToSeconds(editTask.estimatedTime || '00:00'));
      setEstimatedTime(
        formatTime(
          String(timeStringToSeconds(editTask.estimatedTime || '00:00'))
        )
      );
      setFormattedTime(
        secondsToFormattedTime(
          timeStringToSeconds(editTask.estimatedTime || '00:00')
        )
      );
      setEstimatedHours(
        Math.floor(
          timeStringToSeconds(editTask.estimatedTime || '00:00') / 3600
        )
      );
      setEstimatedMinutes(
        Math.floor(
          (timeStringToSeconds(editTask.estimatedTime || '00:00') % 3600) / 60
        )
      );
      setActiveDaysStates(Array(Days.length).fill(false));
      editTask.repeatDaysInWeek !== undefined
        ? editTask.repeatDaysInWeek?.map((day: any) => {
            setActiveDaysStates((prev) => {
              if (day === 0) {
                prev[6] = true;
              }
              prev[day - 1] = true;
              return prev;
            });
          })
        : setActiveDaysStates((prev) => {
            const index = dayjs(todayDate).day() - 1;
            const newState = prev.map((value, i) =>
              i === index ? true : value
            );
            setIsRepeatable(true);
            return newState;
          });

      setUploadedFiles(editTask.attachments ? editTask.attachments.admin : []);

      setCheckListItems(editTask.checklist ? editTask.checklist.items : []);
      setEndDate(
        editTask.endDate ? editTask.endDate : dayjs().format('YYYY-MM-DD')
      );
    } else {
      if (taskExpanded) {
        formReset();
      }
    }
  }, [editTask]);
  useEffect(() => {
    // check whether the repeatable toggle is on or not
    if (activeDaysStates.filter((active) => active).length > 0) {
      // if repeat toggle is off
      if (!isRepeatable) {
        // set the start date to the first index of the active days
        setStartDate(
          dayjs(todayDate)
            .day(activeDaysStates.findIndex((active) => active === true))
            .add(1, 'day')
            .format('YYYY-MM-DD')
        );
        // set the end date to the last index of the active days
        const lastDayIndex = activeDaysStates
          .map((active, index) => (active ? index : -1))
          .filter((index) => index !== -1)
          .pop();
        setEndDate(
          dayjs(todayDate)
            .day(lastDayIndex as number)
            .add(1, 'day')
            .format('YYYY-MM-DD')
        );
      }
      // if repeat toggle is on
      else {
        // check if the selected week is current week or not
        if (startOfWeek < fetchFormattedDate(new Date())) {
          // if selected week is current week then set the start date to current date and end date will be selected through calendar or date picker
          setStartDate(fetchFormattedDate(new Date()));
        } else {
          // if selected week is not current week then set the start date to the first index of the active days and end date will be selected through calendar or date picker
          setStartDate(
            dayjs(todayDate)
              .day(activeDaysStates.findIndex((active) => active === true))
              .add(1, 'day')
              .format('YYYY-MM-DD')
          );
        }
      }
    } else {
      setStartDate('');
      setEndDate('');
    }
  }, [activeDaysStates]);

  useEffect(() => {
    if (isArchive) {
      formReset();
    }
  }, [isArchive]);

  useEffect(() => {
    if (!isRepeatable) {
      setActiveDaysStates(Array(Days.length).fill(false));
    } else {
      setStartDate(fetchFormattedDate(new Date()));
    }
  }, [isRepeatable]);

  function mapUpdateFormDataToTask(formData: FormData) {
    const currentDate = contextDate;
    const selectedDaysIndices = activeDaysStates
      .map((state, index) => (state ? (index === 6 ? 0 : index + 1) : -1))
      .filter((index) => index !== -1);
    const formTask: UpdateTask = {
      allEvents: true,
      date: currentDate,
      description: formData.get('description') as string,
      endDate: endDate,
      id: task.id,
      name: formData.get('name') as string,
      prioritize: formData.get('priority') === 'on' ? true : false,
      repeatDaysInWeek: selectedDaysIndices as number[],
      startTime: formData.get('time') as string,
      estimatedTime: formattedTime,
      attachments: {
        admin: uploadedFiles,
        hq: [],
      },
      comments: editTask?.comments as string[],
      checklist: { items: checkListItems },
    };
    return formTask;
  }
  function mapCreateFormDataToTask(formData: FormData, startDate?: string) {
    const sectionIds = Array.from(formData.entries())
      .filter(([name]) => name.startsWith('sectionSelection'))
      .map(([, value]) => value);
    const selectedSectionIds = sectionIds.filter(
      (ids, index) => activeStates[index]
    );
    const selectedDaysIndices = activeDaysStates
      .map((state, index) => (state ? (index === 6 ? 0 : index + 1) : -1))
      .filter((index) => index !== -1);
    const formTask: CreateTask = {
      endDate: endDate,
      prioritize: formData.get('priority') === 'on' ? true : false,
      repeatDaysInWeek: selectedDaysIndices as number[],
      sectionIds: selectedSectionIds as string[],
      startDate: startDate as string,
      startTime: formData.get('time') as string,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      estimatedTime: formattedTime,
      attachments: {
        admin: uploadedFiles,
        hq: [],
      },
      checklist: {
        items: checkListItems.map((item) => ({
          name: item.name,
          isChecked: false,
        })),
      },
    };
    return formTask;
  }

  async function handleCreateTaskFormSubmit(_: any, payload: FormData) {
    try {
      const data = mapCreateFormDataToTask(payload, startDate);
      const response = await createNewTask(data);
      if (typeof response === 'boolean') {
        toast(translations.FlashMessageCreateTask, { type: 'success' });
        formReset();
      } else {
        response.message.map((part: string) => {
          if (part.includes('minimal')) {
            const parts = part.split('is');
            toast(translations[parts[0]] + parts[1], { type: 'error' });
          } else {
            toast(part, { type: 'error' });
          }
        });
      }
      return {
        type: 'success' as const,
        message: 'Task created successfully',
      };
    } catch (e) {
      throw e;
    }
  }
  async function handleUpdateTaskFormSubmit(_: any, payload: FormData) {
    try {
      const data: UpdateTask = mapUpdateFormDataToTask(payload);
      const response = await updateTask(data);

      if (typeof response === 'boolean') {
        toast(translations.FlashMessageUpdateTask, { type: 'success' });
        formReset();
      } else {
        response.message.map((part: string) => toast(part, { type: 'error' }));
      }
      return {
        type: 'success' as const,
        message: 'Task created successfully',
      };
    } catch (e) {
      throw e;
    }
  }

  async function handleCreateTaskTemplateFormSubmit(_: any, payload: FormData) {
    try {
      const data = mapCreateFormDataToTask(payload);
      const response = await createTaskTemplate({
        description: data.description,
        endDate: data.endDate as string,
        name: data.name,
        prioritize: data.prioritize,
        repeatDaysInWeek: data.repeatDaysInWeek,
        sectionIds: data.sectionIds,
        startTime: data.startTime,
        estimatedTime: formattedTime,
        attachments: data.attachments,
        checklist: data.checklist,
      });
      if (typeof response === 'boolean') {
        toast(translations.FlashMessageAddTemplate, { type: 'success' });
        formReset();
      } else {
        response.message.map((part: string) => toast(part, { type: 'error' }));
      }
      return {
        type: 'success' as const,
        message: 'Task created successfully',
      };
    } catch (e) {
      throw e;
    }
  }
  async function handleUpdateTaskTemplateFormSubmit(_: any, payload: FormData) {
    try {
      const data = mapCreateFormDataToTask(payload);
      const response = await updateTaskTemplate({
        description: data.description,
        endDate: data.endDate as string,
        name: data.name,
        prioritize: data.prioritize,
        repeatDaysInWeek: data.repeatDaysInWeek,
        sectionIds: data.sectionIds,
        startTime: data.startTime,
        id: task.id,
        estimatedTime: formattedTime,
        attachments: data.attachments,
        checklist: data.checklist,
        comments: data.comments,
      });
      if (typeof response === 'boolean') {
        toast(translations.FlashMessageUpdateTemplate, { type: 'success' });
        formReset();
      } else {
        response.message.map((part: string) => toast(part, { type: 'error' }));
      }
      return {
        type: 'success' as const,
        message: 'Task created successfully',
      };
    } catch (e) {
      throw e;
    }
  }

  function formReset() {
    setTask({
      date: '',
      endTime: '',
      id: '',
      isRepeatable: false,
      repeatableTaskId: '',
      sectionId: '',
      status: '' as any,
      name: '',
      description: '',
      startTime: '',
      startDate: '',
      endDate: '',
      prioritize: false,
      repeatDaysInWeek: [],
      sectionIds: [],
      estimatedTime: '',
      attachments: {
        admin: [],
        hq: [],
      },
      comments: editTask?.comments as string[],
      checklist: {} as CheckList,
    });
    setUploadedFiles([]);
    setCheckListItems([]);
    setActiveStates(Array(sections.length).fill(false));
    setActiveDaysStates(Array(Days.length).fill(false));
    setIsRepeatable(false);
    setIsEdit(false);
    setEditTask && setEditTask({} as Task);
    setEstimatedTime('0hrs 0min');
    setFormattedTime('00:00');
    setTime(0);
    setEstimatedHours(0);
    setEstimatedMinutes(0);
  }
  return {
    isRepeatable,
    activeStates,
    activeDaysStates,
    task,
    isEdit,
    createState,
    updateState,
    createTaskTemplateState,
    updateTaskTemplateState,
    estimatedTime,
    formattedTime,
    time,
    estimatedMinutes,
    estimatedHours,
    startDate,
    checkListItems,
    uploadedFiles,
    startOfWeek,
    todayDate,
    endDate,
    createDispatch,
    updateDispatch,
    createTaskTemplateDispatch,
    updateTaskTemplateDispatch,
    setActiveDaysStates,
    setIsRepeatable,
    setTask,
    handleDaysClick,
    handleSectionClick,
    setEstimatedTime,
    setUploadedFiles,
    setFormattedTime,
    setTime,
    setEstimatedHours,
    setEstimatedMinutes,
    setCheckListItems,
    setStartDate,
    setStartOfWeek,
    setTodayDate,
    setEndDate,
    formReset,
  };
};
