'use client';
import React, { useState } from 'react';
import ArrowSvg from '../atoms/svg/Arrow';
import {
  Translations,
  TrimDays,
  getDayOfWeek,
  isOverlapping,
  timeRegex,
} from '@/constants/constants';
import Chips from '../atoms/Chip';
import MinusSvg from '../atoms/svg/MinusSvg';
import PlusSvg from '../atoms/svg/PlusSvg';
import CustomButton from '../atoms/Button';
import EditSvg from '../atoms/svg/Edit';
import ArrowRightSvg from '../atoms/svg/ArrowRight';
import { toast } from 'react-toastify';
import { ScheduleData } from '@/dto/Staff.dto';
import { UpdateStaff } from '@/server/Staff';
import { ErrorResponse } from '@/dto/ErrorResponse.dto';
import { fetchFormattedDate, isBeforeDate } from '@/utils/Date';
import Loading from '@/app/[locale]/signin/loading';

const initialShift = {
  startTime: '',
  endTime: '',
  staffCount: 0,
};

interface Props {
  staff: ScheduleData;
  translations: Translations;
  setStaffModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstallationModal = (props: Props) => {
  const [data, setData] = useState<ScheduleData>(props.staff);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(getDayOfWeek());
  const [selectedCheckboxIndices, setSelectedCheckboxIndices] = useState<
    number[]
  >([]);
  const [loader, setLoader] = useState(false);

  const handleAddRow = () => {
    const selectedWeekday = data.weekdays[selectedDay || '0'];
    const lastShift = selectedWeekday[selectedWeekday.length - 1];
    const startTime = lastShift && lastShift.endTime ? lastShift.endTime : '';

    setData((prevData) => ({
      ...prevData,
      weekdays: {
        ...prevData.weekdays,
        [selectedDay || '0']: [
          ...(prevData.weekdays[selectedDay || '0'] || []),
          { ...initialShift, startTime }, // Set the start time of the new shift
        ],
      },
    }));
  };
  const handleRemoveRow = () => {
    if (selectedDay !== null) {
      const newShifts = [...data.weekdays[selectedDay]];
      const filteredShifts = newShifts.filter(
        (_, index) => !selectedCheckboxIndices.includes(index)
      );
      setData({
        ...data,
        weekdays: {
          ...data.weekdays,
          [selectedDay]: filteredShifts,
        },
      });
      setSelectedCheckboxIndices([]);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleChipClick = (dayIndex: number) => {
    if (isEditing) {
      toast(props.translations.saveFirstWarning, {
        type: 'warning',
      });
      setLoader(false);
    } else {
      setSelectedDay(dayIndex);
    }
  };
  const handleCheckboxChange = (index: any) => {
    setSelectedCheckboxIndices((prevIndices) => {
      const isSelected = prevIndices.includes(index);
      if (isSelected) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const validateShift = (shift: any, index: number, shifts: any[]): boolean => {
    if (!timeRegex.test(shift.startTime) || !timeRegex.test(shift.endTime)) {
      toast(props.translations.invalidFormatWarning, {
        type: 'warning',
      });
      setLoader(false);
      return false;
    }

    const today = new Date();
    const startTime = fetchFormattedDate(today) + ' ' + shift.startTime;
    const endTime = fetchFormattedDate(today) + ' ' + shift.endTime;

    if (isBeforeDate(new Date(endTime), new Date(startTime))) {
      toast(props.translations.StartTimeWarning, { type: 'warning' });
      setLoader(false);
      return false;
    }

    if (shift.staffCount < 0 || isNaN(shift.staffCount)) {
      toast(props.translations.staffCountWarning, { type: 'warning' });
      setLoader(false);
      return false;
    }

    for (let otherIndex = index + 1; otherIndex < shifts.length; otherIndex++) {
      if (isOverlapping(shift, shifts[otherIndex])) {
        toast(
          `${props.translations.overLapWarning} ${shift.startTime}-${shift.endTime} and ${shifts[otherIndex].startTime}-${shifts[otherIndex].endTime}`,
          { type: 'warning' }
        );
        setLoader(false);
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    setLoader(true);
    const { weekdays, staffMargin } = data;
    const selectedWeekday = weekdays[selectedDay || '0'];

    // Validate staff margin
    if (staffMargin < 0 || isNaN(staffMargin)) {
      toast('Staff margin must be a non-negative number.', { type: 'warning' });
      setLoader(false);
      return;
    }

    // Validate each shift
    const isValid = selectedWeekday.every(validateShift);

    if (isValid) {
      const requestBody = {
        staffMargin,
        schedules: selectedWeekday.map(
          ({ startTime, endTime, staffCount }) => ({
            startTime,
            endTime,
            staffCount,
          })
        ),
      };

      try {
        const response: boolean | ErrorResponse = await UpdateStaff(
          selectedDay || 0,
          requestBody
        );

        if (typeof response === 'boolean') {
          setIsEditing(false);
          toast(props.translations.staffUpdated, { type: 'success' });
        } else {
          toast(response.message, { type: 'error' });
        }
      } catch (error: any) {
        toast(error.message, { type: 'error' });
      }
      setLoader(false);
    }
  };

  return (
    <div className='text-white h-full flex flex-col justify-between'>
      <div className='flex h-[5%]'>
        <div
          className='cursor-pointer'
          onClick={() => {
            props.setStaffModal(false);
          }}
        >
          <ArrowSvg height={20} width={20} />
        </div>
        <span className='ml-16 font-bold'>
          {props.translations.statisticsTitle}
        </span>
      </div>

      <div className='h-[20%] mt-5'>
        <span className='font-medium'>{props.translations.selectDay}</span>

        <div className='flex flex-wrap mt-2'>
          {TrimDays.map((day, index) => {
            const dayName: string = day.dayName;
            return (
              <div
                key={index}
                className='cursor-pointer '
                onClick={() => handleChipClick(index)}
              >
                <input
                  name={`daySelection_${dayName}`}
                  value={dayName}
                  className='hidden'
                  readOnly={true}
                />
                <div className='m-1'>
                  <Chips
                    label={props.translations[dayName]}
                    active={selectedDay === index}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='mt-2 h-[50%]'>
        <div className='flex justify-between h-[8%]'>
          <span className=' font-medium'>
            {props.translations.numberOfStaff}
          </span>
          {!isEditing && (
            <button onClick={handleEditToggle}>
              <EditSvg />
            </button>
          )}
        </div>

        <div className='h-[75%] mt-5 border rounded-lg p-2 border-gray-700'>
          <div className=' flex justify-between mx-2 font-medium h-[5%]'>
            <span>{props.translations.time}</span>
            <span>{props.translations.quantity}</span>
          </div>

          <div className='h-[90%] mt-3 overflow-y-auto scrollbar-none'>
            {data.weekdays[selectedDay || 0].length > 0 ? (
              data.weekdays[selectedDay || 0]?.map((shift, index) => (
                <div className='flex justify-between mt-2' key={index}>
                  <div className='flex w-[70%] items-center '>
                    {isEditing && (
                      <input
                        type='checkbox'
                        className='mr-1 rounded-md bg-dark '
                        onChange={() => handleCheckboxChange(index)}
                        checked={selectedCheckboxIndices.includes(index)}
                      ></input>
                    )}

                    <input
                      type='text'
                      autoComplete='off'
                      placeholder=''
                      value={shift.startTime}
                      onChange={(e) => {
                        const newShifts = [
                          ...data.weekdays[selectedDay || '0'],
                        ];
                        newShifts[index].startTime = e.target.value;
                        setData({
                          ...data,
                          weekdays: {
                            ...data.weekdays,
                            [selectedDay || '0']: newShifts,
                          },
                        });
                      }}
                      disabled={!isEditing}
                      className='bg-background w-full rounded-md text-sm'
                    />
                    <div className='mx-4'>
                      <ArrowRightSvg />
                    </div>
                    <input
                      autoComplete='off'
                      type='text'
                      placeholder=''
                      value={shift.endTime}
                      onChange={(e) => {
                        const newShifts = [
                          ...data.weekdays[selectedDay || '0'],
                        ];
                        newShifts[index].endTime = e.target.value;
                        setData({
                          ...data,
                          weekdays: {
                            ...data.weekdays,
                            [selectedDay || '0']: newShifts,
                          },
                        });
                      }}
                      disabled={!isEditing}
                      className='bg-background w-full rounded-md text-sm'
                    />
                  </div>

                  <div className='w-[15%]'>
                    <input
                      inputMode='numeric'
                      autoComplete='off'
                      pattern='[0-9]*'
                      value={shift.staffCount}
                      className='bg-background w-full rounded-md text-center text-sm'
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                        const newShifts = [
                          ...data.weekdays[selectedDay || '0'],
                        ];
                        newShifts[index].staffCount =
                          newValue === '' ? 0 : parseInt(newValue, 10);
                        setData({
                          ...data,
                          weekdays: {
                            ...data.weekdays,
                            [selectedDay || '0']: newShifts,
                          },
                        });
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              ))
            ) : (
              <span className='flex justify-center mt-5'>
                {props.translations.noData}
              </span>
            )}
          </div>
          {isEditing && (
            <div className='flex gap-2 justify-center mt-4 mb-2'>
              <button onClick={handleRemoveRow}>
                <MinusSvg />
              </button>

              <button onClick={handleAddRow}>
                <PlusSvg />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='h-[5%] mt-2 flex items-center'>
        <span className='font-medium mr-5'>{props.translations.margin}</span>
      </div>

      <div className='h-[10%]'>
        <span className='font-medium '>{props.translations.person}</span>
        <input
          value={data.staffMargin}
          className='bg-background w-[15%] rounded-md h-[50%] text-center text-xs ml-2'
          onChange={(e) => {
            setData({ ...data, staffMargin: Number(e.target.value) });
          }}
          disabled={!isEditing}
        />
      </div>

      {isEditing && (
        <div className='flex justify-center'>
          <CustomButton
            color='primary'
            className='w-[50%]'
            size='sm'
            onClick={handleSave}
          >
            {loader ? <Loading /> : props.translations.save}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default InstallationModal;
