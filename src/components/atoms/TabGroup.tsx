import { StatsType, Translations } from '@/constants/constants';
import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  selected: StatsType;
  firstURL: string;
  secondURL: string;
  translations?: Translations;
}
export default function TabGroup({
  selected,
  firstURL,
  secondURL,
  translations,
}: Props) {
  const commonClasses =
    'inline-block px-5 py-3 text-lg font-semibold rounded-xl focus:relative';

  return (
    <div className='flex items-center gap-5 text-white'>
      <div className='inline-flex rounded-xl bg-dark-80'>
        <Link
          className={classNames(commonClasses, {
            'text-dark-20 hover:text-white': selected !== StatsType.WEEKLY,
            'text-white bg-primary': selected === StatsType.WEEKLY,
          })}
          href={firstURL}
        >
          {translations?.weeklyReport}
        </Link>

        <Link
          className={classNames(commonClasses, {
            'text-white bg-primary': selected === StatsType.MONTHLY,
            'text-dark-20 hover:text-white': selected !== StatsType.MONTHLY,
          })}
          href={secondURL}
        >
          {translations?.monthlyReport}
        </Link>
      </div>
    </div>
  );
}
