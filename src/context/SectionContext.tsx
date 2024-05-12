'use client';
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
interface SectionContextValue {
  sections: string[];
  setSections: Dispatch<SetStateAction<string[]>>;
}

export const sectionsData = createContext<SectionContextValue>(
  {} as SectionContextValue
);

function SectionContext({ children }: any) {
  const [sections, setSections] = useState<string[]>([]);

  return (
    <sectionsData.Provider value={{ sections, setSections }}>
      {children}
    </sectionsData.Provider>
  );
}

export default SectionContext;
