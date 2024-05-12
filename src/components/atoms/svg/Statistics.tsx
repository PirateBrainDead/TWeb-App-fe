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
        d='M8.533 12.267H8.8c1.026 0 1.866.84 1.866 1.866v9.334c0 1.026-.84 1.866-1.866 1.866h-.267a1.872 1.872 0 01-1.866-1.866v-9.334c0-1.026.84-1.866 1.866-1.866zM16 6.667c1.026 0 1.866.84 1.866 1.866v14.934c0 1.026-.84 1.866-1.866 1.866a1.872 1.872 0 01-1.867-1.866V8.533c0-1.026.84-1.866 1.867-1.866zm7.466 10.666c1.027 0 1.867.84 1.867 1.867v4.267c0 1.026-.84 1.866-1.866 1.866a1.872 1.872 0 01-1.867-1.866V19.2c0-1.027.84-1.867 1.866-1.867z'
      ></path>
    </svg>
  );
}
