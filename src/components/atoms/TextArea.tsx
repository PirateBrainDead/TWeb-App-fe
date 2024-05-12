'use client';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import ExpandArrowSvg from './svg/ExpandArrow';
interface Props {
  name?: string;
  placeholder: string;
  error?: string;
  maxLength?: number;
  onChange?: (val: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  descriptionError?: string;
  color?: string;
  className?: string;
  heightPercentage?: number;
  setHeightPercentage?: React.Dispatch<React.SetStateAction<number>>;
}
export default function TextArea({
  error,
  placeholder,
  maxLength = 1000,
  onChange,
  value,
  name,
  descriptionError,
  color,
  heightPercentage,
  setHeightPercentage,
}: Props) {
  const [characterCount, setCharacterCount] = useState(value?.length ?? 0);
  const [arrowClicked, setArrowClicked] = useState(false);

  const hanldeArrowClick = () => {
    if (setHeightPercentage && heightPercentage) {
      // Check if setHeightPercentage is defined
      setArrowClicked(!arrowClicked);

      if (arrowClicked) {
        setHeightPercentage(heightPercentage - 40);
      } else {
        setHeightPercentage(heightPercentage + 40);
      }
    }
  };

  useEffect(() => {
    setCharacterCount(value?.length ?? 0);
  }, [value]);
  return (
    <div className='h-full'>
      <label htmlFor={placeholder} className='relative block h-full'>
        <textarea
          id={placeholder}
          name={name}
          autoComplete='off'
          className={classNames(
            'w-full rounded-md border shadow-sm focus-within:ring-1 peer resize-none max-h-full h-full min-h-[4rem] align-top focus:ring-0 placeholder-transparent text-white text-xs scrollbar-none autofill:caret-amber-50',
            {
              'bg-taskBackground': !color, // Set default background color
              [color!]: color, // Set background color if color prop is provided
              'border-danger focus-within:border-danger focus-within:ring-danger':
                error,
              'border-dark-60 focus-within:border-primary focus-within:ring-primary':
                !error,
            }
          )}
          rows={4}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(val) => {
            onChange && onChange(val);
            setCharacterCount(val.target.value.length);
          }}
          onPaste={(val) => {
            if (val.clipboardData.getData('text/plain').length > maxLength) {
              toast(descriptionError, {
                type: 'error',
              });
              val.preventDefault();
            }
          }}
          value={value}
        />
        <span
          className={classNames(
            'pointer-events-none absolute start-2 top-0  -translate-y-[70%] p-0.5 text-xs text-dark-60 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-0 peer-focus:text-xs',
            {
              'bg-taskBackground': !color, // Set default background color
              [color!]: color, // Set background color if color prop is provided
              'peer-focus:text-danger': error,
              'peer-focus:text-primary': !error,
            }
          )}
        >
          {placeholder}
        </span>
        <div className='absolute right-0 flex items-center'>
          <p className='text-dark-20 text-sm'>
            {characterCount}/{maxLength}
          </p>

          {heightPercentage && (
            <div onClick={hanldeArrowClick} className='p-2 cursor-pointer'>
              {!arrowClicked ? (
                <ExpandArrowSvg />
              ) : (
                <ExpandArrowSvg rotate={180} />
              )}
            </div>
          )}
        </div>
      </label>
      {error && <label className='text-danger text-xs'>{error}</label>}
    </div>
  );
}
