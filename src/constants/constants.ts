import { ErrorResponse } from '@/dto/ErrorResponse.dto';
import { Session } from 'next-auth';
import dayjs, { Dayjs } from 'dayjs';
import { fetchFormattedDate } from '@/utils/Date';
import { Task } from '@/dto/Tasks.dto';
import { Section } from '@/dto/Sections.dto';

export enum TaskStatus {
  TODO,
  INITIATED,
  DONE,
}

export const COLORS = {
  BACKGROUND: 'black',
  WHITE: '#FFF',
  TRANSPARENT: 'transparent',
  PURPLE: '#800080',
  PRIMARY: {
    DEFAULT: '#0090FF',
    80: '#33A7FF',
    60: '#66BDFF',
    40: '#99D3FF',
    20: '#CCE9FF',
    10: '#E5F4FF',
  },
  DARK: {
    DEFAULT: 'black',
    80: '#3D475C',
    60: '#6E7585',
    40: '#9EA3AD',
    20: '#CFD1D6',
    10: '#E7E8EB',
    5: '#F3F4F5',
  },
  DANGER: {
    DEFAULT: '#FB5656',
    80: '#FC7878',
    60: '#FC9999',
    40: '#FDBBBB',
    20: '#FEDDDD',
    10: '#FFEEEE',
  },
  WARNING: {
    DEFAULT: '#FF9141',
    80: '#FFA767',
    60: '#FFBD8D',
    40: '#FFD3B3',
    20: '#FFE9D9',
    10: '#FFF4EC',
  },
  SUCCESS: {
    DEFAULT: '#48BD77',
    80: '#77DFA0',
    60: '#99E7B8',
    40: '#BBEFD0',
    20: '#DDF7E7',
    10: '#EEFBF3',
  },
};

// TODO: Remove this
export const Days = [
  { dayName: 'monday' },
  { dayName: 'tuesday' },
  { dayName: 'wednesday' },
  { dayName: 'thursday' },
  { dayName: 'friday' },
  { dayName: 'saturday' },
  { dayName: 'sunday' },
];
export const TrimDays = [
  { dayName: 'mon' },
  { dayName: 'tues' },
  { dayName: 'wed' },
  { dayName: 'thur' },
  { dayName: 'fri' },
  { dayName: 'sat' },
  { dayName: 'sun' },
];

export const getDayOfWeek = () => {
  const currentDate = new Date();
  const dayOfWeekNumber = (currentDate.getDay() + 6) % 7;
  return dayOfWeekNumber;
};

export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export enum StatsType {
  MONTHLY = 'Monthly',
  WEEKLY = 'Weekly',
}

export enum BottomBarTitles {
  HOME = 'Home',
  PLANNING = 'Planning',
  STATISTICS = 'Statistics',
  SETTINGS = 'Settings',
}

export enum Pages {
  PLANNING = '/planning',
  SETTINGS = '/settings',
  ACCOUNT = '/settings/account',
  DEPARTMENT = '/settings/department',
  TASKS = '/tasks',
  SIGNIN = '/signin',
}

export enum AuthProvider {
  CREDENTIALS = 'credentials',
}

export const SectionToFileName: Record<string, string> = {
  bread: 'Bread',
  'fruits-and-vegetables': 'Fruit',
  fridge: 'Fridge',
  dairy: 'Milk',
  colonial: 'Coffee',
  fresh: 'Fish',
  barbaque: 'Barbaque',
  bottle: 'Bottle',
  broom: 'Broom',
  cheese: 'Cheese',
  firstaid: 'FirstAid',
  flower: 'Flower',
  folder: 'Folder',
  fork: 'Fork',
  furniture: 'Furniture',
  hanger: 'Hanger',
  headphone: 'Headphone',
  human: 'Person',
  meat: 'Meat',
  pet: 'Pet',
  pricetag: 'PriceTag',
  register: 'Register',
  recycle: 'Recycle',
  receipt: 'Receipt',
  shrimp: 'Shrimp',
  snowflake: 'SnowFlake',
  store: 'Store',
  truck: 'Truck',
  tv: 'Tv',
  warehouse: 'Warehouse',
};
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const getAllMonthDates = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();

  const allMonthDates = Array.from({ length: daysInMonth }, (_, index) => {
    const dayIndex = (currentDate.getDay() + index) % 7; // 0 is Sunday, 1 is Monday, and so on
    const dayNames = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    const day = dayNames[dayIndex];
    const numericDate = index + 1;

    // Include the date property in the return object
    const date = fetchFormattedDate(
      new Date(currentDate.getFullYear(), currentMonth, numericDate)
    );

    return { day, numericDate, date };
  });

  return allMonthDates;
};

export const locales = ['sv', 'en'];

export function getCurrentDate(dateValue: string) {
  const inputDate = new Date(dateValue);

  // Define arrays for days and months
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get day, month, and year from the parsed date
  const dayOfWeek = daysOfWeek[inputDate.getDay()];
  const dayOfMonth = inputDate.getDate();
  const month = months[inputDate.getMonth()];

  // Format the output string
  const formattedDate = `${dayOfWeek} ${dayOfMonth}/${
    months.indexOf(month) + 1
  }`;

  return formattedDate;
}

export interface ClientSession extends Session {
  accessToken: string;
  LoginUser: any;
}

export enum ApiRoutes {
  LOGIN = 'api/auth/login-manager-app',
  CHANGE_PASSWORD = 'api/users/change-password',
  SECTIONS = 'api/sections',
  GET_STORES = 'api/stores/by-current-user',
  UPDATE_STORES = 'api/stores',
  NOTICES = 'api/notices',
  TASK_TEMPLATES = 'api/task-templates',
  TASKS = 'api/tasks',
  TASKS_REPEATABLE = 'api/tasks/repeatable',
  STATISTICS_WEEKLY = 'api/statistics/weekly',
  STATISTICS_MONTHLY = 'api/statistics/monthly',
  STAFF = 'api/staff',
  STORE_STATUS = 'api/statistics/store-status',
  IMAGE = 'api/upload/task',
  IMAGE_URL = '/task/',
}

export type Translations = {
  [key: string]: string;
};

export const ScatterColors: string[] = [
  '#FF0000', // Red
  '#0000FF', // Blue
  '#00FF00', // Green
  '#FFFF00', // Yellow
  '#800080', // Purple
  '#FFA500', // Orange
  '#FFC0CB', // Pink
  '#A52A2A', // Brown
  '#000000', // Black
  '#FFFFFF', // White
  '#808080', // Gray
  '#00FFFF', // Cyan
  '#FF00FF', // Magenta
  '#808000', // Olive
  '#800000', // Maroon
  '#000080', // Navy
  '#008080', // Teal
  '#4B0082', // Indigo
  '#40E0D0', // Turquoise
  '#FFD700', // Gold
  '#C0C0C0', // Silver
  '#F5F5DC', // Beige
  '#E6E6FA', // Lavender
  '#FF7F50', // Coral
  '#FA8072', // Salmon
  '#E0115F', // Ruby
  '#50C878', // Emerald
  '#082567', // Sapphire
  '#800020', // Burgundy
  '#36454F', // Charcoal
];

export type Response = boolean | ErrorResponse;

export const commonError = 'Something went wrong';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';
export const TIME_FORMAT_WITH_SECONDS = `${TIME_FORMAT}:ss`;
export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const DATETIME_FORMAT_WITH_SECONDS = `${DATE_FORMAT} ${TIME_FORMAT_WITH_SECONDS}`;

export const formatDate = (date: Dayjs | Date | string): string =>
  dayjs(date).format(DATE_FORMAT);
export const currentDate = dayjs().format(DATE_FORMAT);

export const urlPattern = /^(https?:\/\/)[^\s]+$/;

export function testUrlValidity(inputValue: string) {
  if (urlPattern.test(inputValue)) {
    return true;
  } else return false;
}

export function convertToMinutes(estimatedTime: string) {
  const parts = estimatedTime.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);

  return hours * 60 + minutes;
}

export const isOverlapping = (slot1: any, slot2: any) => {
  const startTime1 = new Date(`2000-01-01 ${slot1.startTime}`);
  const endTime1 = new Date(`2000-01-01 ${slot1.endTime}`);
  const startTime2 = new Date(`2000-01-01 ${slot2.startTime}`);
  const endTime2 = new Date(`2000-01-01 ${slot2.endTime}`);

  return startTime1 < endTime2 && endTime1 > startTime2;
};

export const graphBottomValues = (date: string) => [
  {
    color: COLORS.PRIMARY.DEFAULT,
    name: 'EstimatedWorkingHours',
    isSelected: true,
  },
  {
    color: COLORS.SUCCESS.DEFAULT,
    name: 'SavedWorkingTime',
    isSelected: true,
  },
  {
    color: COLORS.DANGER.DEFAULT,
    name: 'LostWorkingTime',
    isSelected: true,
  },
  { color: COLORS.DARK[80], name: 'ComingHours', isSelected: true },
  { color: COLORS.WHITE, name: 'NumberOfPersonnel', isSelected: false },
  { color: COLORS.WARNING.DEFAULT, name: 'AverageStaff', isSelected: false },
  { color: COLORS.PURPLE, name: 'AverageWorkingHours', isSelected: false },
  {
    color: COLORS.DARK[40],
    name: 'CurrentTime',
    isSelected: date === fetchFormattedDate(new Date()) ? true : false,
  },
];

export const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function convertDecimalToTime(decimalTime: number) {
  const absoluteDecimalTime = Math.abs(decimalTime);
  const hours = Math.floor(absoluteDecimalTime);
  const minutes = Math.round((absoluteDecimalTime % 1) * 60);
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}
export const timeStringToSeconds = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60;
};

export const formatTime = (seconds: string) => {
  const secondsNum = parseInt(seconds, 10);
  const hours = Math.floor(secondsNum / 3600);
  const minutes = Math.floor((secondsNum % 3600) / 60);
  return `${hours} hrs ${minutes} min`;
};
export const secondsToFormattedTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
};

export interface MonthDate {
  day: string;
  numericDate: number;
  date: string;
}

export const convertTimeToHmFormat = (time: string) => {
  const [hours, minutes] = time.split(':');
  const formattedHours = parseInt(hours, 10);
  const formattedMinutes = parseInt(minutes, 10);
  return `${formattedHours} h ${formattedMinutes} m`;
};

export const attachmentLimit = 9;

export function extractFileName(fullPath: string) {
  const parts = fullPath.split('/');
  return parts[parts.length - 1];
}

export function compareTimes(time1: string, time2: string): boolean {
  // Split the times into hours and minutes
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  // Calculate the total minutes since midnight for each time
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;
  // console.log('totalMinutes1', totalMinutes1, 'totalMinutes2', totalMinutes2);
  // Compare the total minutes
  if (totalMinutes1 > totalMinutes2) {
    return true;
  } else {
    return false;
  }
}

export function separateColumns(list: Task[]) {
  const column1: Task[] = [];
  const column2: Task[] = [];
  list.forEach((task, index) => {
    if (index % 2 === 0) {
      column1.push(task);
    } else {
      column2.push(task);
    }
  });
  return column1.concat(column2);
}
export function getSectionName(
  sectionId: string,
  sections: Array<Section>
): string | undefined {
  const section: any = sections?.find((section) => section.id === sectionId);

  if (section) return section.name;
  else return undefined;
}
export function getHoursAndMinutes(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function sortList(list: Task[]) {
  list.sort((a, b) => {
    const aStartTime = a.startTime ? convertToMinutes(a.startTime) : Infinity;
    const bStartTime = b.startTime ? convertToMinutes(b.startTime) : Infinity;

    // First, prioritize tasks with both priority and start time
    if (a.prioritize && b.prioritize) {
      return aStartTime - bStartTime;
    } else if (a.prioritize && !b.prioritize) {
      // Prioritized task comes before non-prioritized task
      return -1;
    } else if (!a.prioritize && b.prioritize) {
      // Non-prioritized task comes after prioritized task
      return 1;
    } else {
      // If both tasks have no priority, then sort by start time
      if (a.startTime && b.startTime) {
        return aStartTime - bStartTime;
      } else if (!a.startTime && !b.startTime) {
        // If both tasks have no start time, maintain original order
        return 0;
      } else {
        // Tasks without start time come before those with start time
        return a.startTime ? 1 : -1;
      }
    }
  });
}
export const months = [
  'Januari',
  'Februari',
  'Mars',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'Augusti',
  'September',
  'Oktober',
  'November',
  'December',
];

export const days = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
