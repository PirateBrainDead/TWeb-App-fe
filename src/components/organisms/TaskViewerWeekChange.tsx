import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import WeekChange from '../molecules/WeekChange';
import { Translations } from '@/constants/constants';
import { addWeekToDate, subtractWeekFromDate } from '@/utils/Date';
import { DateContext } from '@/context/DateContext';
import { useContext } from 'react';

interface Props {
  translations?: Translations;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskViewerWeekChange({
  translations,
  setLoading,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { contextDate, setContextDate } = useContext(DateContext);

  return (
    <WeekChange
      date={contextDate}
      translations={translations}
      onBackward={() => {
        setLoading(true);
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        const newDate = subtractWeekFromDate(new Date(contextDate));
        setContextDate(`${newDate}`);
        current.set('date', `${newDate}`);
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`);
      }}
      onForward={() => {
        setLoading(true);
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        const newDate = addWeekToDate(new Date(contextDate));
        setContextDate(`${newDate}`);
        current.set('date', `${newDate}`);
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`);
      }}
    />
  );
}
