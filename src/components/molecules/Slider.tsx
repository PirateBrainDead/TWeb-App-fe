'use client';
import React, { useState, useEffect } from 'react';

interface Props {
  efficiency: number;
}

const Slider = (props: Props) => {
  const [efficiency, setEfficiency] = useState(0);

  useEffect(() => {
    let initialEfficiency = props.efficiency;
    if (initialEfficiency < 0) {
      initialEfficiency = 0;
    } else if (initialEfficiency > 150) {
      initialEfficiency = 150;
    }
    const percentage = (initialEfficiency / 150) * 100;
    setEfficiency((percentage / 100) * 100);
  }, [props.efficiency]);

  return (
    <div className='w-full h-full flex justify-center'>
      <div className='bg-dark rounded-lg shadow-[0px_0px_5px_5px_rgba(0,144,255,0.2)] h-[75%] w-[100%] flex'>
        <div className='w-[68%] py-2 h-full'>
          <div className='w-[33%] h-full ml-[55%]'>
            <div className='h-[33.33%] bg-success'></div>
            <div className='h-[33.33%] bg-warning'></div>
            <div className='h-[33.33%] bg-danger'></div>
          </div>
          <div
            className='h-[0.3rem] w-[54%] ml-[44%] bg-white relative z-10 rounded-lg'
            style={{ bottom: `${efficiency}%` }}
          ></div>
        </div>
        <div className='w-[22%] pb-[20%] pt-[4%] h-full font-medium text-xs pr-4'>
          <div className='h-[33.33%]'>150%</div>
          <div className='h-[33.33%]'>100%</div>
          <div className='h-[33.33%] '>50%</div>
          <div>0%</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
