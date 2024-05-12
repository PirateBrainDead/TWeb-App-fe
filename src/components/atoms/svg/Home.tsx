import { COLORS } from '@/constants/constants';

export default function HomeSvg({ color = COLORS.WHITE }: any) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='26'
      height='26'
      fill='none'
      viewBox='0 0 32 32'
    >
      <path
        fill={color}
        d='M16 7.587l6.666 6V24H20v-8h-8v8H9.333V13.587l6.667-6zM16 4L2.666 16h4v10.667h8v-8h2.667v8h8V16h4L16 4z'
      ></path>
    </svg>
  );
}
