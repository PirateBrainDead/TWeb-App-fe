'use client';

import React from 'react';
import { ToastContainer, TypeOptions } from 'react-toastify';
import CrossSvg from './svg/Cross';
import CheckIconSVG from './svg/CheckIcon';
import WarningIconSVG from './svg/WarningIcon';

export default function Toast() {
  const contextClassStyle = {
    success: 'border-l-8 border-success shadow-success-80',
    error: 'border-l-8 border-danger shadow-danger-80',
    info: 'border-l-8 border-primary shadow-primary-80',
    warning: 'border-l-8 border-warning shadow-warning-80',
    default: 'border border-dark-80 shadow-dark-80',
  };

  return (
    <ToastContainer
      toastClassName={(context) =>
        contextClassStyle[context?.type ?? 'default'] +
        ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-dark my-3 shadow-md'
      }
      hideProgressBar={true}
      bodyClassName={() => 'text-sm font-white block p-3'}
      autoClose={3000}
      position='top-right'
      closeButton={({ closeToast }) => (
        <div
          className='absolute top-0 right-0 p-3 cursor-pointer'
          onClick={closeToast}
        >
          <CrossSvg size={20} />
        </div>
      )}
      icon={({ type }) => {
        switch (type) {
          case 'success':
            return <ToastIconComponent type={type} />;
            break;

          case 'info':
            return <ToastIconComponent type={type} />;
            break;

          case 'warning':
            return <ToastIconComponent type={type} />;
            break;

          case 'error':
            return <ToastIconComponent type={type} />;
            break;

          default:
            return <ToastIconComponent />;
            break;
        }
      }}
    />
  );
}

function ToastIconComponent({ type = 'default' }: { type?: TypeOptions }) {
  const baseStyle = {
    success: 'text-success',
    error: 'text-danger',
    info: 'text-primary',
    warning: 'text-warning',
    default: 'text-white',
  };

  return (
    <div className='flex items-center gap-2 mb-2'>
      {type === 'error' && (
        <div className='p-1 rounded-md bg-danger'>
          <CrossSvg size={20} />
        </div>
      )}
      {type === 'success' && (
        <div className='p-1 rounded-md bg-success'>
          <CheckIconSVG />
        </div>
      )}
      {type === 'info' && (
        <div className='p-1 rounded-md bg-primary'>
          <WarningIconSVG />
        </div>
      )}
      {type === 'warning' && (
        <div className='p-1 rounded-md bg-warning'>
          <WarningIconSVG />
        </div>
      )}

      {type !== 'default' && (
        <p
          className={
            baseStyle[type] + ' text-center font-bold text-lg capitalize'
          }
        >
          {type}
        </p>
      )}
    </div>
  );
}
