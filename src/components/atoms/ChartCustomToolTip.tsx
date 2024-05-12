import { fetchTipToolFormatDate } from '@/utils/Date';

export default function ChartCustomToolTip({
  active,
  payload,
  translations,
}: any) {
  if (active && payload && payload.length) {
    const date = fetchTipToolFormatDate(payload[0].payload.date);
    const day = date.split(' ')[0].toLowerCase();
    const dateMonth = date.split(' ')[1];

    return (
      <div className='bg-dark p-2 rounded-md'>
        <p>{`${translations[day]} ${dateMonth}`}</p>
        <p>{`${translations.percentage}: ${payload[0].payload.percentage}%`}</p>
        <p>{`${translations.completed}: ${payload[0].payload.value.completed}`}</p>
        <p>{`${translations.total}: ${payload[0].payload.value.total}`}</p>
      </div>
    );
  }

  return null;
}
