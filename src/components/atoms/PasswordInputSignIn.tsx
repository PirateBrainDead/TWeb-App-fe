'use client';
import React, { useState } from 'react';
import classNames from 'classnames';
import EyeHideSvg from './svg/EyeHide';
import EyeSvg from './svg/Eye';

interface Props {
  placeholder?: string;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  type?: string;
  className?: string;
}

export default function PasswordInputSignIn(props: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={classNames(props.className)}>
      <label
        htmlFor={props.placeholder}
        className={classNames(
          'relative block rounded-lg border shadow-sm focus-within:ring-1 dark:text-white',
          {
            'border-danger focus-within:border-danger focus:text-danger focus-within:ring-danger':
              props.error,
          },
          {
            'border-dark-60 focus-within:border-primary focus:text-primary focus-within:ring-primary':
              !props.error,
          }
        )}
      >
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          onChange={props.onChange}
          name={props.name}
          className='peer border-none text-dark-20 bg-transparent  focus:border-transparent focus:outline-none focus:ring-0 py-3 w-full autofill:caret-amber-50'
          placeholder={props.placeholder}
          value={props.value}
        />

        {props.type === 'password' && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute end-2.5 top-1/2 -translate-y-1/2 cursor-pointer'
          >
            {isPasswordVisible ? <EyeSvg /> : <EyeHideSvg />}
          </button>
        )}
      </label>
      {props.error && (
        <label className='text-danger text-xs'>{props.error}</label>
      )}
    </div>
  );
}
