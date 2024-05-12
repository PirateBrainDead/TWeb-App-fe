import { fetchStartofMonthFromMonth } from '@/utils/Date';
import Dropdown from '../atoms/DropDown';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { DateContext } from '@/context/DateContext';

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  months: string[];
}

export default function MonthDropDown({ setLoading, months }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { contextDate, setContextDate } = useContext(DateContext);

  const currentMonth = new Date(contextDate).getMonth();

  return (
    <Dropdown
      options={months}
      currentMonth={currentMonth}
      onOptionClick={(option: number) => {
        setLoading(true);
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('date', `${fetchStartofMonthFromMonth(option)}`);
        setContextDate(`${fetchStartofMonthFromMonth(option)}`);
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`);
      }}
    />
  );
}
