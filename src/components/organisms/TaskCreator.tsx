import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import { useTask } from '@/hooks/useTask';
import {
  COLORS,
  Days,
  Translations,
  months,
  days,
} from '@/constants/constants';
import { Section } from '@/dto/Sections.dto';
import { Task } from '@/dto/Tasks.dto';
import WeekChange from '@/components/molecules/WeekChange';
import CustomButton from '@/components/atoms/Button';
import TextInput from '@/components/atoms/TextInput';
import TextArea from '@/components/atoms/TextArea';
import Chips from '@/components/atoms/Chip';
import Toggle from '@/components/atoms/Toggle';
import CalenderSvg from '@/components/atoms/svg/Calender';
import TimeInput from '@/components/atoms/TimeInput';
import 'react-datepicker/dist/react-datepicker.css';
import {
  addWeekToDate,
  fetchFormattedDate,
  fetchStartOfWeek,
  isAfterToday,
  subtractWeekFromDate,
} from '@/utils/Date';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from '@/components/atoms/Slider';
import { toast } from 'react-toastify';

import dayjs from 'dayjs';

interface Props {
  sections: Section[];
  editTask?: Task;
  setEditTask: Dispatch<SetStateAction<Task>>;
  setIsArchive?: Dispatch<SetStateAction<boolean>>;
  isArchive?: boolean;
  translations: Translations;
  isDraggedTaskArchive: boolean;
  setisDraggedTaskArchive: Dispatch<SetStateAction<boolean>>;
  setLoader?: Dispatch<SetStateAction<boolean>>;
  isDraggedTask: boolean;
  taskExpanded?: boolean;
}
export default function TaskCreator({
  sections,
  editTask,
  setIsArchive,
  isArchive,
  translations,
  setEditTask,
  isDraggedTaskArchive,
  setisDraggedTaskArchive,
  isDraggedTask,
  taskExpanded,
}: Props) {
  const {
    task,
    activeStates,
    activeDaysStates,
    isRepeatable,
    isEdit,
    estimatedTime,
    time,
    estimatedMinutes,
    estimatedHours,
    startDate,
    startOfWeek,
    todayDate,
    endDate,
    createDispatch,
    updateDispatch,
    createTaskTemplateDispatch,
    updateTaskTemplateDispatch,
    setTask,
    setIsRepeatable,
    handleDaysClick,
    handleSectionClick,
    setEstimatedTime,
    setFormattedTime,
    setTime,
    setEstimatedHours,
    setEstimatedMinutes,
    setActiveDaysStates,
    setStartOfWeek,
    setTodayDate,
    setEndDate,
  } = useTask({
    sections,
    editTask,
    isArchive,
    translations,
    setEditTask,
    isDraggedTaskArchive,
    setisDraggedTaskArchive,
    isDraggedTask,
    taskExpanded,
  });

  const [disabled, setDisabled] = useState<boolean>(true);
  const [heightPercentage, setHeightPercentage] = useState(20);

  const locale = {
    localize: {
      day: (n: any) => days[n],
      month: (n: any) => months[n],
    },
    formatLong: {
      date: () => 'dd/mm/yyyy',
    },
  };

  useEffect(() => {
    if (isArchive) {
      if (
        task.name?.length > 0 &&
        task.description?.length > 0 &&
        activeStates.filter((active) => active).length > 0 &&
        startDate !== ''
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else if (
      task.name?.length > 0 &&
      task.description?.length > 0 &&
      activeStates.filter((active) => active).length > 0 &&
      startDate !== ''
    ) {
      setDisabled(false);
      if (isRepeatable) {
        if (endDate === undefined) {
          setDisabled(true);
        } else if (activeDaysStates.filter((active) => active).length === 0) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      }
    } else {
      setDisabled(true);
    }
  }, [
    task.name,
    task.description,
    activeStates,
    activeDaysStates,
    task.startTime,
    isRepeatable,
    task.endDate,
    estimatedTime,
    startDate,
    endDate,
    isArchive,
  ]);

  useEffect(() => {
    setStartOfWeek(fetchStartOfWeek(new Date(todayDate)));
  }, [todayDate]);

  return (
    <div className='h-screen overflow-scroll scrollbar-none w-full '>
      <form className='overflow-y-scroll overflow-x-hidden min-h-[700px] h-screen pb-[11.5rem] scrollbar-none'>
        <div className='w-full flex flex-col items-center ps-10 h-full '>
          <div className='flex w-full justify-end pb-1'>
            <div
              className={classNames('flex w-full justify-center', {
                'ml-24': !isArchive,
              })}
            >
              <WeekChange
                translations={translations}
                disableBackward={startOfWeek <= fetchStartOfWeek(new Date())}
                onBackward={() => {
                  setTodayDate(
                    subtractWeekFromDate(new Date(todayDate)).toString()
                  );
                  setActiveDaysStates(Array(Days.length).fill(false));
                  setIsRepeatable(false);
                }}
                onForward={() => {
                  setTodayDate(addWeekToDate(new Date(todayDate)).toString());
                  setActiveDaysStates(Array(Days.length).fill(false));
                  setIsRepeatable(false);
                }}
                disableForward={isArchive}
                date={todayDate.toString()}
              />
            </div>

            {!isArchive && (
              <div className='flex items-center'>
                <CustomButton
                  color='primary'
                  onClick={() => (setIsArchive ? setIsArchive(true) : null)}
                  size='sm'
                >
                  <p className='w-16 text-xs'>{translations.taskArkiv}</p>
                </CustomButton>
              </div>
            )}
          </div>
          <div className='w-full h-full overflow-y-auto scrollbar-none  pe-1'>
            <div className='w-full h-[8%] mt-2'>
              <TextInput
                name='name'
                placeholder={translations.taskNameLabelInput}
                value={task.name || ''}
                onChange={(e) => {
                  setTask({ ...task, name: e.target.value });
                }}
              />
            </div>
            <Droppable droppableId={'taskCreator'}>
              {(provided) => (
                <div
                  className='w-full h-[83%]'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className={`mt-4 w-full h-[${heightPercentage}%]`}>
                    <TextArea
                      name='description'
                      placeholder={translations.descriptionLabelInput}
                      value={task.description}
                      descriptionError={translations.descriptionMaxLength}
                      onChange={(e) => {
                        setTask({ ...task, description: e.target.value });
                      }}
                      heightPercentage={heightPercentage}
                      setHeightPercentage={setHeightPercentage}
                    />
                  </div>

                  <div className='w-full flex items-center mt-2 h-[7%]'>
                    <span className='text-sm text-white font-semibold flex items-center w-full h-full '>
                      {translations.newTaskSectionTitle} *
                    </span>
                  </div>
                  <div className='w-full overflow-scroll scrollbar-none mt-2 h-[7%] flex items-center'>
                    <div className='flex w-96 h-full items-center'>
                      {sections.map((section: Section, index) => (
                        <div
                          key={section.id}
                          className='cursor-pointer h-full flex items-center'
                          onClick={() => {
                            if (!isEdit || isArchive) {
                              handleSectionClick(index);
                            } else if (isEdit && !isArchive && isDraggedTask) {
                              handleSectionClick(index);
                            }
                          }}
                        >
                          <input
                            value={section.id}
                            className='hidden'
                            name={`sectionSelection${section.id}`}
                            readOnly={true}
                          />
                          <Chips
                            label={section.name}
                            active={activeStates[index]}
                            index={index}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='flex justify-between mt-3 h-[15%]'>
                    <div className='h-full'>
                      <p className='text-sm text-white font-semibold h-[30%] flex items-center '>
                        {translations.newTaskDayTitle} {'*'}
                      </p>
                      <div className='flex  mt-2  h-[38%]'>
                        {Days.map((day, index) => (
                          <div
                            key={day.dayName}
                            className='cursor-pointer sm:mt-1 2xl:mt-0 '
                            onClick={() => {
                              if (!isAfterToday(new Date(startOfWeek))) {
                                if (!isRepeatable) {
                                  if (index >= dayjs(new Date()).day() - 1)
                                    handleDaysClick(index);
                                  else {
                                    toast(translations.pastDate, {
                                      type: 'warning',
                                    });
                                  }
                                } else {
                                  handleDaysClick(index);
                                }
                              } else {
                                handleDaysClick(index);
                              }
                            }}
                          >
                            <input
                              name={`daySelection_${day.dayName}`}
                              value={day.dayName}
                              className='hidden'
                              readOnly={true}
                            />
                            <Chips
                              label={translations[day.dayName]}
                              active={activeDaysStates[index]}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='h-full'>
                      <p className='text-sm text-white font-semibold h-[35%] flex items-center justify-end '>
                        {translations.prioritizeTitle}
                      </p>
                      <div className='h-[50%] text-end'>
                        <Toggle
                          name='priority'
                          value={task.prioritize}
                          onChange={(e) => {
                            setTask({ ...task, prioritize: e.target.checked });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between w-full mt-1 h-[13%] items-center'>
                    <div>
                      <p className='text-sm text-white font-semibold mb-1'>
                        {translations.timePickerLabel}
                      </p>
                      <div className='bg-transparent'>
                        <TimeInput
                          name='time'
                          value={task.startTime?.toString() || ''}
                          onChange={(e) => {
                            setTask({ ...task, startTime: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className='text-sm text-white font-semibold '>
                        {translations.repeatUntilLabel} {isRepeatable && '*'}
                      </p>
                      <div className='relative mt-2'>
                        <div className='absolute right-2 mt-[0.3rem] '>
                          <CalenderSvg
                            color={!isRepeatable ? COLORS.DARK['40'] : ''}
                          />
                        </div>
                        <DatePicker
                          className={classNames(
                            'w-[8.2rem] bg-transparent rounded-md text-dark-60 flex justify-between cursor-pointer text-xs h-8',
                            {
                              'border-dark-60': !isRepeatable,
                            },
                            {
                              'border-primary': isRepeatable,
                            }
                          )}
                          autoComplete='off'
                          placeholderText='DD/MM/YY'
                          disabled={!isRepeatable}
                          name='endDate'
                          id='date'
                          selected={
                            isRepeatable
                              ? endDate
                                ? new Date(endDate)
                                : new Date()
                              : null
                          }
                          onChange={(e) => {
                            setTask({
                              ...task,
                              endDate: fetchFormattedDate(e as Date),
                            });
                            setEndDate(fetchFormattedDate(e as Date));
                          }}
                          minDate={new Date()}
                          locale={locale as Locale}
                        />
                      </div>
                    </div>
                    <div>
                      <p className='text-sm text-white font-semibold '>
                        {translations.daysSectionHeading}
                      </p>
                      <div className='h-[50%] text-end'>
                        <Toggle
                          name='repeat'
                          value={isRepeatable}
                          onChange={(e) => {
                            setIsRepeatable(e.target.checked);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='h-[10%] flex items-center mt-6 transform w-full'>
                    <div className='w-full '>
                      <div className='w-full flex justify-between items-center'>
                        <p className='text-sm text-white font-semibold '>
                          {translations.estimatedTime} *
                        </p>
                        <div className='flex items-center border rounded-xl'>
                          <input
                            type='text'
                            value={estimatedHours}
                            id='hoursInput'
                            name='hoursInput'
                            pattern='[0-9]+'
                            onChange={(e) => {
                              const newValue = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                              );
                              let parsedValue: number =
                                newValue === '' ? 0 : parseInt(newValue, 10);
                              if (parsedValue > 10) {
                                parsedValue = 10;
                              }
                              if (parsedValue == 10) {
                                setEstimatedMinutes(0);
                              }
                              setEstimatedHours(parsedValue);
                            }}
                            className='bg-transparent text-white w-10 h-6 text-xs border-none focus:border-transparent focus:outline-none focus:ring-0'
                          />
                          <span className='text-white text-xs ml-[-0.6rem] mr-[-0.3rem]'>
                            hrs
                          </span>

                          <input
                            type='text'
                            value={estimatedMinutes}
                            id='minutesInput'
                            name='minutesInput'
                            pattern='[0-9]+'
                            onChange={(e) => {
                              const newValue = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                              );
                              let parsedValue: number =
                                newValue === '' ? 0 : parseInt(newValue, 10);
                              if (parsedValue > 59) {
                                parsedValue = 59;
                              }
                              if (estimatedHours == 10) {
                                parsedValue = 0;
                              }
                              setEstimatedMinutes(parsedValue);
                            }}
                            className='bg-transparent text-white w-10 h-6 text-xs border-none focus:border-transparent focus:outline-none focus:ring-0'
                          />
                          <span className='text-white text-xs mr-2 ml-[-0.6rem]'>
                            min
                          </span>
                        </div>
                      </div>
                      <div className='flex w-full mt-1 justify-between'>
                        <Slider
                          setEstimatedTime={setEstimatedTime}
                          setFormattedTime={setFormattedTime}
                          time={time}
                          setTime={setTime}
                          estimatedHours={estimatedHours}
                          estimatedMinutes={estimatedMinutes}
                          setEstimatedHours={setEstimatedHours}
                          setEstimatedMinutes={setEstimatedMinutes}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='w-full flex justify-center ml-[-0.5rem] text-xs mt-2'>
                    {isEdit && !isDraggedTask && (
                      <div className='w-44'>
                        <CustomButton
                          color={disabled ? 'default' : 'danger'}
                          formAction={
                            !isArchive
                              ? updateDispatch
                              : updateTaskTemplateDispatch
                          }
                          type={'submit'}
                          disabled={disabled}
                        >
                          <p>{translations.updateTaskTitle}</p>
                        </CustomButton>
                      </div>
                    )}
                  </div>
                  <div className='flex  justify-center gap-x-3 mx-7 mt-2 w-auto whitespace-nowrap text-xs'>
                    <div className='flex flex-col gap-y-2 items-center'>
                      <div>
                        <CustomButton
                          color={disabled ? 'default' : 'primary'}
                          type='submit'
                          formAction={createDispatch}
                          disabled={disabled}
                        >
                          <p>{translations.createTaskTitle}</p>
                        </CustomButton>
                      </div>
                    </div>
                    <div>
                      <CustomButton
                        color={disabled || isArchive ? 'default' : 'primary'}
                        formAction={createTaskTemplateDispatch}
                        type={'submit'}
                        disabled={isArchive || disabled}
                      >
                        <p>{translations.createTaskTemplateTitle}</p>
                      </CustomButton>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </form>
    </div>
  );
}
