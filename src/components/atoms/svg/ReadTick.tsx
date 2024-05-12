interface Props {
  color?: string;
}
export default function ReadTickSvg({ color = '#0090FF' }: Props) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.7858 3.54745C14.0358 3.79739 14.0358 4.20261 13.7858 4.45255L6.45249 11.7859C6.20256 12.0358 5.79733 12.0358 5.5474 11.7859L2.21406 8.45255C1.96413 8.20261 1.96413 7.79739 2.21406 7.54745C2.464 7.29752 2.86922 7.29752 3.11916 7.54745L5.99994 10.4282L12.8807 3.54745C13.1307 3.29752 13.5359 3.29752 13.7858 3.54745Z'
        fill={color}
      />
    </svg>
  );
}
