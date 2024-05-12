import classNames from 'classnames';
import { ChangeEvent } from 'react';

interface Props {
  type?: string;
  placeholder: string;
  error?: string;
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  className?: string;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  color?: string;
  maxLength?: number;
}

export default function TextInput(props: Props) {
  return (
    <div className='w-full  h-full '>
      <div className='w-full  h-full'>
        <label htmlFor={props.placeholder} className='relative block h-full'>
          <div
            className={classNames(
              'w-full overflow-hidden rounded-md border shadow-sm focus-within:ring-1 h-full',
              {
                'border-danger focus-within:border-danger focus-within:ring-danger':
                  props.error,
              },
              {
                'border-dark-60 focus-within:border-primary focus-within:ring-primary':
                  !props.error,
              },
              {
                'bg-taskBackground': !props.color,
                [props.color!]: props.color,
              }
            )}
          >
            <input
              type={props.type ?? 'text'}
              id={props.placeholder}
              name={props.name}
              autoComplete='off'
              className={classNames(
                'w-full peer resize-none border-none align-top focus:ring-0 placeholder-transparent text-white text-xs h-full autofill:caret-amber-50',
                {
                  'bg-taskBackground': !props.color,
                  [props.color!]: props.color,
                }
              )}
              placeholder={props.placeholder}
              onChange={(val: any) => {
                props.onChange && props.onChange(val);
              }}
              value={props.value}
              maxLength={props.maxLength}
            />
            <span
              className={classNames(
                'pointer-events-none absolute start-2 top-0 -translate-y-[65%] p-0.5 text-dark-60 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs',
                {
                  'bg-taskBackground': !props.color,
                  [props.color!]: props.color,
                  'peer-focus:text-danger': props.error,
                  'peer-focus:text-primary': !props.error,
                }
              )}
            >
              <p className='text-xs'>{props.placeholder}</p>
            </span>
          </div>
        </label>
        {props.error && (
          <label className='text-danger text-xs'>{props.error}</label>
        )}
      </div>
    </div>
  );
}
