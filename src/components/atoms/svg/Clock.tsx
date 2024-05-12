import { COLORS } from '@/constants/constants';

interface Props {
  width?: string;
  height?: string;
  fill?: boolean;
  focus?: boolean;
}
export default function ClockSvg(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || '16'}
      height={props.height || '16'}
      fill='none'
      viewBox='0 0 16 16'
    >
      <path
        fill={
          props.focus
            ? COLORS.PRIMARY.DEFAULT
            : props.fill
              ? COLORS.PRIMARY.DEFAULT
              : COLORS.DARK['60']
        }
        d='M10.58 10.167L8.334 8.833v-3.02a.478.478 0 00-.48-.48h-.04a.478.478 0 00-.48.48V8.96c0 .233.12.453.326.573l2.434 1.46c.226.134.52.067.653-.16a.48.48 0 00-.167-.666zm3.54-6.827l-2.053-1.707a.667.667 0 10-.854 1.027l2.047 1.707c.28.233.7.2.94-.087.24-.28.2-.7-.08-.94zM2.734 4.367L4.78 2.66a.661.661 0 00.087-.94.659.659 0 00-.933-.087L1.88 3.34c-.28.24-.32.66-.08.94.234.287.653.32.933.087zM8 2.667a6 6 0 10.001 12 6 6 0 000-12zm0 10.666a4.672 4.672 0 01-4.667-4.666A4.672 4.672 0 018 4a4.672 4.672 0 014.667 4.667A4.672 4.672 0 018 13.333z'
      ></path>
    </svg>
  );
}
