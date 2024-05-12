import React, { useContext, useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import { getAdjacentDates } from '@/utils/Date';
import { MonthDate, Translations } from '@/constants/constants';
import { DateContext } from '@/context/DateContext';

interface Props {
  weekDaysTranslations: Translations;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DateSwiper({
  weekDaysTranslations,
  setLoading,
}: Props) {
  const { contextDate, setContextDate } = useContext(DateContext);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const adjacentDates: MonthDate[] = getAdjacentDates(contextDate);
  const [dates, setDates] = useState<MonthDate[]>(adjacentDates);

  // find index of current date in adjacentDates
  const currentIndex = adjacentDates.findIndex(
    (date: any) => date.date === contextDate
  );

  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const adjacentDates = getAdjacentDates(contextDate);
    setDates(adjacentDates);

    // find index of current date in adjacentDates
    const currentIndex = adjacentDates.findIndex(
      (date: any) => date.date === contextDate
    );

    setActiveIndex(currentIndex);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentIndex, true);
    }
  }, [contextDate]);

  const settings: Settings = {
    centerMode: true,
    infinite: true,
    speed: 100,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    className: 'text-center',
    initialSlide: activeIndex,
    arrows: false,
    swipeToSlide: true,
    afterChange: (index: number) => {
      if (activeIndex === index) return;

      setActiveIndex(index);
      setLoading(true);
      setContextDate(`${dates[index].date}`);

      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('date', `${dates[index].date}`);
      const search = current.toString();
      const query = search ? `?${search}` : '';
      router.push(`${pathname}${query}`);
    },
  };

  return (
    <div className='w-[22.25rem] cursor-pointer	' key={contextDate}>
      <Slider ref={sliderRef} {...settings}>
        {dates.map((dateInfo: any, index: any) => {
          return (
            <div
              key={index}
              className={classNames({
                'bg-primary rounded pb-1 pt-[0.3rem] text-xs flex items-center text-white max-w-[2.7rem]':
                  activeIndex === index,
                'mt-[0.4rem] text-dark-20 text-xs opacity-40 max-w-[2.3rem]':
                  activeIndex !== index,
                'opacity-30 text-dark-40 text-xs max-w-[2.3rem] ':
                  activeIndex === index + 4 || activeIndex === index - 4,
              })}
            >
              <p>{dateInfo.numericDate}</p>
              <p className='capitalize'>{weekDaysTranslations[dateInfo.day]}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
