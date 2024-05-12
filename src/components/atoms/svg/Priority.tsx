interface Props {
  color?: string;
  height?: string;
  width?: string;
}

export default function PrioritySVG({
  color = '#FF9141',
  width = '9',
  height = '12',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 11 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.57833 0H4.105L0.0136833 4.105L0 12.315C0 13.0676 0.61575 13.6833 1.36833 13.6833H9.57833C10.3309 13.6833 10.9467 13.0676 10.9467 12.315V1.36833C10.9467 0.61575 10.3309 0 9.57833 0ZM9.57833 12.315H1.36833V4.67286L4.67286 1.36833H9.57833V12.315ZM4.78917 8.89417H6.1575V10.2625H4.78917V8.89417ZM4.78917 4.105H6.1575V7.52583H4.78917V4.105Z'
        fill={color}
      />
    </svg>
  );
}
