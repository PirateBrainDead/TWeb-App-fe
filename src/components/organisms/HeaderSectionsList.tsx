'use client';

import { Pages, Translations } from '@/constants/constants';
import SVGComponent from '@/components/atoms/GetSectionSvg';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomButton from '@/components/atoms/Button';
import { HeaderSection, Section } from '@/dto/Sections.dto';
import classNames from 'classnames';
import { transformHeaderSections } from '@/utils/Header';
import { Task } from '@/dto/Tasks.dto';
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '@/context/TaskContext';

interface Props {
  translations: Translations;
  section: Section[];
  task: Task[];
}

export default function HeaderSectionsList({
  translations,
  section,
  task,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSectionClick = (sectionId: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.delete('date');

    if (sectionId === 'allTasks') {
      current.delete('section');

      const search = current.toString();

      const query = search ? `?${search}` : '';

      router.push(`${Pages.PLANNING}${query}`);
      return;
    }

    current.set('section', `${sectionId}`);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${Pages.PLANNING}${query}`);
  };

  const [headerSections, setHeaderSections] = useState<HeaderSection[]>(
    transformHeaderSections(section, task)
  );

  const { tasks: contextTasks } = useContext(TaskContext);
  useEffect(() => {
    if (contextTasks.length > 0) {
      const updateHeaderSection: HeaderSection[] = transformHeaderSections(
        section,
        contextTasks
      );
      setHeaderSections(updateHeaderSection);
    }
  }, [contextTasks]);
  return (
    <div className='flex'>
      <div className='flex w-1/5 '>
        <CustomButton
          variant='outlined'
          size='sm'
          onClick={() => handleSectionClick('allTasks')}
        >
          {translations.allTasks}
        </CustomButton>
      </div>
      <div
        className={classNames(
          'grid w-full grid-cols-6 gap-x-2 gap-y-2 text-xs overflow-y-scroll ps-4 max-h-32',
          {
            'scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent':
              headerSections.length > 8,
          },
          { 'scrollbar-none': headerSections.length <= 8 }
        )}
      >
        {headerSections.map((section) => (
          <div key={section.id} className='w-full'>
            <CustomButton
              // key={section.id}
              color={section.inPhase ? 'success' : 'warning'}
              variant='outlined'
              size='sm'
              className='h-10 group relative justify-between w-full'
              onClick={() => handleSectionClick(section.id)}
            >
              <div className='flex items-center gap-2 w-full'>
                <SVGComponent iconName={section.iconName} />
                <p>
                  {section.name.length > 8
                    ? `${section.name.substring(0, 8)}...`
                    : section.name}
                </p>
              </div>
              <p className=''>
                {section.completedTasks + '/' + section.totalTasks}
              </p>
              {section.name.length >= 10 && (
                <span className='pointer-events-none absolute bg-dark-80 z-10 top-2 right-2 p-1 rounded w-max hidden transition-opacity group-hover:block'>
                  {section.name}
                </span>
              )}
            </CustomButton>
          </div>
        ))}
      </div>
    </div>
  );
}
