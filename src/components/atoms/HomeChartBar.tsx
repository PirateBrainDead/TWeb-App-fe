interface Props {
  fill?: any;
  x?: any;
  y?: any;
  width?: any;
  height?: any;
  showCircle?: boolean;
  background?: any;
  payload?: any;
}

export default function HomeChartBar({
  fill,
  x,
  y,
  width,
  height,
  background,
  showCircle = false,
  payload,
}: Props) {
  return (
    <>
      <rect
        x={x}
        y={background.height - height + background.y}
        width={width}
        height={height}
        fill={fill}
      />
      {showCircle && (
        <circle
          cx={x + width / 2.1}
          cy={y - 15}
          r='6'
          fill={
            payload.key.toLocaleLowerCase() === 'monday' ||
            payload.key.toLocaleLowerCase() === 'måndag'
              ? 'white'
              : 'transparent'
          }
        />
      )}
    </>
  );
}
