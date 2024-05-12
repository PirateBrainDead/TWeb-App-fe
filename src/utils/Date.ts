import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localeData from 'dayjs/plugin/localeData';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { MonthDate, Translations } from '@/constants/constants';
import utc from 'dayjs/plugin/utc';
import('dayjs/locale/en');
import('dayjs/locale/sv');

dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(localeData);
dayjs.extend(dayOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);

dayjs.updateLocale('en', {
  weekStart: 1,
});

export const updateGlobalLocale = (locale: string) => {
  dayjs.locale(locale);
};

export function fetchWeekNumber(date: Date): number {
  return dayjs(date).isoWeek();
}

export function fetchStartOfWeek(date: Date): string {
  return `${dayjs(date).startOf('week').format('YYYY-MM-DD')}`;
}
export function fetchStartOfMonth(date: Date): string {
  return `${dayjs(date).startOf('month').format('YYYY-MM-DD')}`;
}

export function fetchStartofMonthFromMonth(month: number): string {
  return `${dayjs().month(month).startOf('month').format('YYYY-MM-DD')}`;
}

export function fetchCurrentDay(date: Date): string {
  return `${dayjs(date).format('dddd')}`;
}

export function fetchHeaderDate(
  date: Date,
  translations: Translations
): string {
  const formattedDate = dayjs(date).format('dddd, MMM DD / [Week] WW');
  const subParts = formattedDate.split(' ');
  const trimmedDay = subParts[0]
    .substring(0, subParts[0].length - 1)
    .toLowerCase();
  subParts[0] = translations[trimmedDay];
  subParts[0] = subParts[0] + ', ';
  subParts[1] = translations[subParts[1].toLowerCase()];
  return subParts.join(' ');
}

export function fetchFormattedDate(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function getFormattedTime(date: Date): string {
  return dayjs(date).format('HH:mm');
}

export function fetchFormattedTime(time: string): string {
  return dayjs(`${fetchFormattedDate(new Date())} ${time}`).format('HH:mm');
}

export const fetchMonthDates = (date: Date) => {
  const daysInMonth = dayjs(date).daysInMonth();
  const month = dayjs(date).month(); // 0 - 11 not incremented as needed is index needed below
  const year = dayjs(date).year();

  const allMonthDates: MonthDate[] = Array.from(
    { length: daysInMonth },
    (_, index) => {
      const day = fetchCurrentDay(
        new Date(year, month, index + 1)
      ).toLocaleLowerCase();
      const numericDate = index + 1;
      const date = fetchFormattedDate(new Date(year, month, index + 1));

      return { day, numericDate, date };
    }
  );
  return allMonthDates;
};

export const fetchYearDates = (year: number): MonthDate[] => {
  let allYearDates: MonthDate[] = [];

  // Iterate over each month in the year
  for (let month = 0; month < 12; month++) {
    const currentDate = new Date(year, month, 1);
    const monthDates = fetchMonthDates(currentDate);
    allYearDates = allYearDates.concat(monthDates);
  }

  return allYearDates;
};

export const fetchDayOfYear = (date: Date): number => {
  return dayjs(date).dayOfYear();
};

export const fetchMonths = () => {
  return dayjs.months();
};

export const addWeekToDate = (date: Date) => {
  return dayjs(date).add(1, 'week').format('YYYY-MM-DD');
};

export const subtractWeekFromDate = (date: Date) => {
  return dayjs(date).subtract(1, 'week').format('YYYY-MM-DD');
};

export const fetchDateOfWeekDay = (day: number) => {
  return dayjs().day(day).format('YYYY-MM-DD');
};

export const isAfterToday = (date: Date): boolean => {
  return dayjs(date).isAfter(dayjs());
};

export const isSameOrAfterToday = (date: Date): boolean => {
  return dayjs(date).isSameOrAfter(dayjs(), 'seconds');
};

export const fetchModalDate = (date: Date, translation: Translations) => {
  const today = dayjs(date).format('dddd: DD/MM');
  const parts = today.split(':');
  parts[0] = translation[parts[0].toLowerCase()];
  return parts.join(':');
};

export const isBeforeToday = (date: Date): boolean => {
  return dayjs(date).isBefore(dayjs());
};

export const isBeforeDate = (date: Date, compareDate: Date): boolean => {
  return dayjs(date).isBefore(dayjs(compareDate));
};

export const fetchTipToolFormatDate = (date: Date) => {
  return dayjs(date).format('dddd DD/MM');
};

export const fetchWeekDurationDates = (
  date: Date,
  translations: Translations
): string => {
  const weekStart = dayjs(date).startOf('week').format('MMM DD');
  const weekStartParts = weekStart.split(' ');
  weekStartParts[0] = translations[weekStartParts[0].toLowerCase()];

  const weekEnd = dayjs(date).endOf('week').format('MMM DD');
  const weekEndParts = weekEnd.split(' ');
  weekEndParts[0] = translations[weekEndParts[0].toLowerCase()];

  const weekStartFinal = weekStartParts.join(' ');
  const weekEndFinal = weekEndParts.join(' ');
  return `${weekStartFinal} - ${weekEndFinal}`;
};

export const getAdjacentDates = (dateString: string): MonthDate[] => {
  const date = dayjs(dateString);
  const result: MonthDate[] = [];

  // Get 10 days before the input date
  for (let i = 10; i > 0; i--) {
    const currentDate = date.subtract(i, 'day');
    result.push({
      day: currentDate.format('dddd').toLocaleLowerCase(),
      numericDate: currentDate.date(),
      date: currentDate.format('YYYY-MM-DD'),
    });
  }

  // Add the input date
  result.push({
    day: date.format('dddd').toLocaleLowerCase(),
    numericDate: date.date(),
    date: date.format('YYYY-MM-DD'),
  });

  // Get 10 days after the input date
  for (let i = 1; i <= 10; i++) {
    const currentDate = date.add(i, 'day');
    result.push({
      day: currentDate.format('dddd').toLocaleLowerCase(),
      numericDate: currentDate.date(),
      date: currentDate.format('YYYY-MM-DD'),
    });
  }

  return result;
};

export const appendTimeToDate = (startTime: string) => {
  const date = dayjs.utc();
  const splitTIme = startTime.split(':');
  const hours = parseInt(splitTIme[0], 10);
  const minutes = parseInt(splitTIme[1], 10);

  return date
    .set('hour', hours)
    .set('minute', minutes)
    .set('seconds', 0)
    .toDate();
};
