import { COLORS } from '@/constants/constants';

interface Props {
  color?: string;
}
export default function CalenderSvg({ color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        stroke={color ? color : COLORS.PRIMARY['80']}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M18.222 5H5.778C4.796 5 4 5.796 4 6.778v12.444C4 20.204 4.796 21 5.778 21h12.444c.982 0 1.778-.796 1.778-1.778V6.778C20 5.796 19.204 5 18.222 5zM16 3v4M8 3v4M4 10h16'
      ></path>
    </svg>
  );
}
