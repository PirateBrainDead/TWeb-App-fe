import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { formatTime, secondsToFormattedTime } from '@/constants/constants';

interface Props {
  setEstimatedTime: Dispatch<SetStateAction<string>>;
  setFormattedTime: Dispatch<SetStateAction<string>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  estimatedHours: number;
  estimatedMinutes: number;
  setEstimatedMinutes: Dispatch<SetStateAction<number>>;
  setEstimatedHours: Dispatch<SetStateAction<number>>;
}
const Slider = ({
  setEstimatedTime,
  setFormattedTime,
  time,
  setTime,
  estimatedHours,
  estimatedMinutes,
  setEstimatedHours,
  setEstimatedMinutes,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTime(value);

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);

    setEstimatedHours(hours);
    setEstimatedMinutes(minutes);
    setEstimatedTime(formatTime(String(value)));
    setFormattedTime(secondsToFormattedTime(value));
    const percentage = (value / 36000) * 100;
    document.documentElement.style.setProperty('--value', `${percentage}%`);
  };

  useEffect(() => {
    const hoursInSeconds = estimatedHours * 3600;
    const minutesInSeconds = estimatedMinutes * 60;
    const totalSeconds = hoursInSeconds + minutesInSeconds;

    setFormattedTime(secondsToFormattedTime(totalSeconds));
    setTime(totalSeconds);
  }, [estimatedHours, estimatedMinutes]);
  useEffect(() => {
    const percentage = (time / 36000) * 100;
    document.documentElement.style.setProperty('--value', `${percentage}%`);
  }, [time]);

  return (
    <div className='w-full flex'>
      <input
        type='range'
        min='0'
        max='36000'
        step='1'
        value={time}
        onChange={handleChange as any}
        className='w-full bg-gray-200 h-[0.35rem] rounded-2xl mt-1'
        id='timeRange'
      />
    </div>
  );
};

export default Slider;
