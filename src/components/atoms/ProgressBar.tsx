import classNames from 'classnames';
import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  height: 'h-1' | 'h-2' | 'h-3' | 'h-4' | 'h-5' | 'h-6';
  color: 'bg-primary' | 'bg-success' | 'bg-danger' | 'bg-warning';
  rounded: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  rounded,
  value,
  max,
  height,
  color,
}) => {
  const percentage = max === 0 ? 0 : (value / max) * 100;

  return (
    <span
      role='progressbar'
      className={classNames('block bg-white', {
        'rounded-full': rounded,
      })}
    >
      <span
        className={classNames(
          'block',
          {
            'rounded-full': rounded,
          },
          height,
          color
        )}
        style={{ width: `${percentage}%` }}
      ></span>
    </span>
  );
};

export default ProgressBar;
