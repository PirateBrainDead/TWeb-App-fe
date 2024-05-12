import React from 'react';

export default function ExpandArrowSvg({ rotate = 0 }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='22'
      height='12'
      fill='none'
      viewBox='0 0 18 9'
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        stroke='#6E7585'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='1.5'
        d='M16.92.95L10.4 7.47c-.77.77-2.03.77-2.8 0L1.08.95'
      ></path>
    </svg>
  );
}
