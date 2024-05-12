'use client';
import { useEffect, useState } from 'react';
import ArrowSvg from '@/components/atoms/svg/Arrow';
import { Translations } from '@/constants/constants';
import { fetchWeekNumber } from '@/utils/Date';

interface Props {
  date: string;
  translations?: Translations;
  onForward?: () => void;
  onBackward?: () => void;
  disableBackward?: boolean;
  disableForward?: boolean;
}

const WeekChange: React.FC<Props> = ({
  date,
  translations,
  onForward,
  onBackward,
  disableBackward,
  disableForward,
}) => {
  const [week, setWeek] = useState(fetchWeekNumber(new Date(date)));

  useEffect(() => {
    setWeek(fetchWeekNumber(new Date(date)));
  }, [date]);

  return (
    <div className=' text-white flex justify-center items-center'>
      <button
        type='button'
        disabled={disableBackward}
        onClick={() => {
          onBackward && onBackward();
        }}
      >
        <ArrowSvg width={20} height={20} />
      </button>
      <span className='text-lg font-semibold'>
        {translations?.week} {week}
      </span>
      <button
        type='button'
        disabled={disableForward}
        onClick={() => {
          onForward && onForward();
        }}
      >
        <ArrowSvg rotate={180} width={20} height={20} />
      </button>
    </div>
  );
};

export default WeekChange;
