import { COLORS } from '@/constants/constants';

export default function PlanningSvg({ color = COLORS.WHITE }: any) {
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
        d='M24 17.333h-6.667V24c0 .733-.6 1.333-1.333 1.333s-1.334-.6-1.334-1.333v-6.667H8c-.734 0-1.333-.6-1.333-1.333s.6-1.333 1.333-1.333h6.666V8c0-.733.6-1.333 1.334-1.333.733 0 1.333.6 1.333 1.333v6.667H24c.733 0 1.333.6 1.333 1.333s-.6 1.333-1.333 1.333z'
      ></path>
    </svg>
  );
}
