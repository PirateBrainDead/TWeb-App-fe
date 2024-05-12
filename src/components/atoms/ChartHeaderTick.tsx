export default function ChartHeaderTick({ x, y, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        dy={'-15'}
        textAnchor='middle'
        className='font-bold capitalize'
        alignmentBaseline='central'
        fill='#fff'
      >
        {payload.value}
      </text>
    </g>
  );
}
