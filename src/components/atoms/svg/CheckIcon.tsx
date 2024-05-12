interface Props {
  color?: string;
  height?: string;
  width?: string;
}

export default function CheckIconSVG({
  color = 'white',
  height = '24',
  width = '24',
}: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={height}
      viewBox='0 -960 960 960'
      width={width}
    >
      <path
        fill={color}
        d='m382-354 339-339q12-12 28.5-12t28.5 12q12 12 12 28.5T778-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z'
      />
    </svg>
  );
}