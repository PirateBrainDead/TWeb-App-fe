import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import ClockSvg from '@/components/atoms/svg/Clock';
import { getHoursAndMinutes } from '@/constants/constants';
interface Props {
  error?: string;
  onChange: (val: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  className?: string;
  disabled?: boolean;
}

export default function TimeInput(props: Props) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [typedTime, setTypedTime] = useState('');

  useEffect(() => {
    props.onChange({
      target: { name: props.name, value: typedTime },
    } as ChangeEvent<HTMLInputElement>);
  }, [typedTime]);
  return (
    <div className={classNames(props.className)}>
      <DatePicker
        timeCaption='Tid'
        name={props.name}
        id={props.name}
        disabled={props.disabled}
        autoComplete='off'
        value={props.value}
        className={classNames(
          `peer  h-8 border-[0.05rem] rounded-md text-dark-60 bg-transparent w-28 placeholder-transparent focus:border-dark-60  focus:outline-none focus:ring-0 text-sm cursor-pointer`,
          {
            'border-primary-80': showTimePicker,
          },
          {
            'border-dark-60': !showTimePicker,
          }
        )}
        showTimeSelect
        showTimeSelectOnly
        timeFormat='HH:mm'
        timeIntervals={10}
        onChange={(e, event) => {
          const date = new Date(e as Date);
          const time = getHoursAndMinutes(date);
          if (event?.nativeEvent.AT_TARGET.toString() === undefined)
            props.onChange({
              target: { name: props.name, value: time },
            } as ChangeEvent<HTMLInputElement>);
          setShowTimePicker(false);
        }}
        onKeyDown={(e) => {
          const key = e.key;
          const isValidKey = /^[0-9]$/.test(key);
          const isDeleteOrBackspace = key === 'Backspace' || key === 'Delete';
          const isColon = key === ':';
          const isValidLength =
            typedTime.length < 5 && (isColon || typedTime.length !== 2);
          if (!(isValidKey || isDeleteOrBackspace) || !isValidLength) {
            e.preventDefault();
          }
          if (isDeleteOrBackspace) {
            setTypedTime('');
            props.onChange({
              target: { name: props.name, value: '' },
            } as ChangeEvent<HTMLInputElement>);
          }
          if ((isValidKey || isDeleteOrBackspace) && typedTime.length < 5) {
            let updatedTypedTime = typedTime;
            if (isDeleteOrBackspace) {
              updatedTypedTime = typedTime.slice(0, -1);
            } else {
              if (typedTime.length === 2 && !isColon) {
                updatedTypedTime += ':';
              }
              updatedTypedTime += key;
            }
            let hours = parseInt(updatedTypedTime.substring(0, 2), 10);
            let minutes = parseInt(
              updatedTypedTime.substring(3, updatedTypedTime.length),
              10
            );
            if (hours > 23) {
              hours = 23;
            }
            if (minutes > 59) {
              minutes = 59;
            }
            if (updatedTypedTime.length === 5) {
              setTypedTime(
                `${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}`
              );
              return;
            }
            if (updatedTypedTime === '00:0') {
              setTypedTime(
                `${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}`
              );
              return;
            }
            setTypedTime(updatedTypedTime);
          }
        }}
        icon={
          <div
            className='cursor-pointer '
            onClick={() => setShowTimePicker(!showTimePicker)}
          >
            <ClockSvg focus={showTimePicker} />
          </div>
        }
        showIcon={true}
        calendarIconClassname={'absolute right-0 '}
        onFocus={() => setShowTimePicker(true)}
        onBlur={() => setShowTimePicker(false)}
        open={showTimePicker}
      />

      {props.error && (
        <label className='text-danger text-xs'>{props.error}</label>
      )}
    </div>
  );
}
