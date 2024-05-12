'use client';
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
interface DateContextType {
  contextDate: string;
  setContextDate: Dispatch<SetStateAction<string>>;
}

interface Props {
  children: React.ReactNode;
  date: string;
}

export const DateContext = createContext<DateContextType>(
  {} as DateContextType
);

function DateContextWrapper({ children, date }: Props) {
  const [contextDate, setContextDate] = useState<string>(date);

  return (
    <DateContext.Provider value={{ contextDate, setContextDate }}>
      {children}
    </DateContext.Provider>
  );
}

export default DateContextWrapper;
