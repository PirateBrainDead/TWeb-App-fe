import React from 'react';
import ProgressBar from '@/components/atoms/ProgressBar';

interface DataProgressBarProps {
  title: string;
  value: number;
  max: number;
  height: 'h-1' | 'h-2' | 'h-3' | 'h-4' | 'h-5' | 'h-6';
  color: 'bg-primary' | 'bg-success' | 'bg-danger' | 'bg-warning';
  rounded: boolean;
}

const DataProgressBar: React.FC<DataProgressBarProps> = ({
  title,
  value,
  max,
  height,
  color,
  rounded,
}) => {
  const dynamicTitleDiv = `flex justify-between`;
  return (
    <div className='w-full text-white text-2xl font-semibold'>
      <div className={dynamicTitleDiv}>
        <h1>{title}</h1>
        <span>
          {value}/{max}
        </span>
      </div>

      <ProgressBar
        value={value}
        max={max}
        height={height}
        color={color}
        rounded={rounded}
      />
    </div>
  );
};

export default DataProgressBar;
