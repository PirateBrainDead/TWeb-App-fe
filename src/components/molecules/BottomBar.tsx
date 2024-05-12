'use client';
import React, { useEffect, useState } from 'react';
import Home from '@/components/atoms/svg/Home';
import Settings from '@/components/atoms/svg/Settings';
import { COLORS, Pages, Translations } from '@/constants/constants';
import BottomBarItem from '../atoms/BottomBarItem';
import { BottomBarTitles } from '@/constants/constants';
import { usePathname } from 'next/navigation';

interface Props {
  translations: Translations;
}

export default function BottomBar(props: Props) {
  const pathname = usePathname();
  const [pages, setPages] = useState<BottomBarTitles>(BottomBarTitles.PLANNING);

  function changePage(value: BottomBarTitles) {
    setPages(value);
  }
  useEffect(() => {
    if (pathname.includes('statistics')) {
      setPages(BottomBarTitles.STATISTICS);
    } else if (pathname.includes('setting')) {
      setPages(BottomBarTitles.SETTINGS);
    } else {
      setPages(BottomBarTitles.PLANNING);
    }
  }, [pathname]);
  return (
    <>
      {!pathname.includes(Pages.SIGNIN) && (
        <div className='text-white bg-taskBackground flex justify-between border-b-[0.5px] px-5 border-t-taskBackground border-opacity-8 shadow-[0px_0px_1px_1px_rgba(0,144,255,0.2)]'>
          <div className='text-white text-2xl pt-3'>TASK MANAGEMENT APP</div>
          <div className='flex justify-end p-1 gap-10 ps-auto'>
            <BottomBarItem
              href={Pages.PLANNING}
              icon={
                <Home
                  color={
                    pages === BottomBarTitles.PLANNING
                      ? COLORS.PRIMARY.DEFAULT
                      : COLORS.DARK[40]
                  }
                />
              }
              label={props.translations.tabBottomHome}
              active={pages === BottomBarTitles.PLANNING}
              onClick={() => changePage(BottomBarTitles.PLANNING)}
            />

            <BottomBarItem
              href={Pages.SETTINGS}
              icon={
                <Settings
                  color={
                    pages === BottomBarTitles.SETTINGS
                      ? COLORS.PRIMARY.DEFAULT
                      : COLORS.DARK[40]
                  }
                />
              }
              label={props.translations.tabBottomSettings}
              active={pages === BottomBarTitles.SETTINGS}
              onClick={() => changePage(BottomBarTitles.SETTINGS)}
            />
          </div>
        </div>
      )}
    </>
  );
}
