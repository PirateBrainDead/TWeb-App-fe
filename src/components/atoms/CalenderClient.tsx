'use client';
import React, { useState } from 'react';
import CalenderSvg from './svg/Calender';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fetchFormattedDate } from '@/utils/Date';
import { days, months } from '@/constants/constants'; // Import the Swedish locale

interface CalenderClientProps {
  date: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

function CalenderClient({ date, setLoading }: CalenderClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentDate, setCurrentDate] = useState(new Date(date));

  const handleDateChange = (selectedDate: Date) => {
    setLoading && setLoading(true);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('date', `${fetchFormattedDate(selectedDate)}`);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
    setCurrentDate(selectedDate);
  };
  const locale = {
    localize: {
      day: (n: any) => days[n],
      month: (n: any) => months[n],
    },
    formatLong: {
      date: () => 'dd/mm/yyyy',
    },
  };
  return (
    <div className='relative'>
      <div className='absolute right-2 mt-[0.3rem]'>
        <CalenderSvg />
      </div>
      <DatePicker
        className='w-28 bg-transparent border-2 rounded-md flex justify-between cursor-pointer text-xs h-8 border-primary'
        placeholderText='DD/MM/YY'
        name='endDate'
        id='date'
        locale={locale as Locale}
        selected={currentDate}
        onChange={handleDateChange}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
}

export default CalenderClient;
