import PriositySVG from '@/components/atoms/svg/Priority';
import FlagSvg from '@/components/atoms/svg/Flag';
import {
  TaskStatus,
  Translations,
  convertTimeToHmFormat,
} from '@/constants/constants';
import ClockSvg from '@/components/atoms/svg/Clock';
import CheckCircleSvg from '@/components/atoms/svg/CheckCircle';
import { fetchFormattedTime } from '@/utils/Date';
import SVGComponent from '@/components/atoms/GetSectionSvg';
import { Section } from '@/dto/Sections.dto';
import EstimatedTimeIcon from '@/components/atoms/svg/EstimatedTimeIcon';
import CheckBoxReadSvg from '../atoms/svg/CheckBoxRead';

interface Props {
  time?: string;
  isPriority?: boolean;
  status?: TaskStatus;
  endTime?: string | undefined;
  translations?: Translations;
  sectionId?: string;
  sections?: Section[];
  estimatedTime?: string;
  checklist: boolean;
  actualStartTime?: string;
  hidePriority?: true;
}

export default function TaskIcons({
  time,
  isPriority,
  status,
  endTime,
  translations,
  sectionId,
  sections,
  estimatedTime,
  checklist,
  actualStartTime,
  hidePriority,
}: Props) {
  const formattedTime = convertTimeToHmFormat(estimatedTime || '');

  function getSectionIconName(sectionId: string): string | undefined {
    const section: any = sections?.find((section) => section.id === sectionId);

    if (section) return section.iconName;
    else return undefined;
  }
  function getSectionName(sectionId: string): string | undefined {
    const section: any = sections?.find((section) => section.id === sectionId);

    if (section) return section.name;
    else return undefined;
  }
  return (
    <div className='flex py-3 text-xs overflow-x-auto scrollbar-none items-center'>
      <div className='flex items-center pe-3 gap-1'>
        {time && (
          <div className='flex items-center gap-1'>
            <ClockSvg width='15' height='15' fill={true} />
            <p>{time}</p>
          </div>
        )}
        {sectionId && (
          <div className='flex items-center'>
            <div className='transform scale-[0.69] h-6 '>
              {getSectionIconName(sectionId) && (
                <SVGComponent iconName={getSectionIconName(sectionId)!} />
              )}
            </div>
            {getSectionName(sectionId) && (
              <p className='mt-0.5'>{getSectionName(sectionId)}</p>
            )}
          </div>
        )}
      </div>

      {isPriority && (
        <div className='flex items-center pe-3 gap-1'>
          <PriositySVG />
          <p>{translations?.priority}</p>
        </div>
      )}
      {status === TaskStatus.INITIATED && (
        <div className='flex items-center pe-3 gap-1'>
          <FlagSvg />
          {!hidePriority ? (
            <p>{translations?.initiated}</p>
          ) : (
            <p>{actualStartTime}</p>
          )}
        </div>
      )}

      {checklist && (
        <div className='pe-3'>
          <CheckBoxReadSvg />
        </div>
      )}

      {status === TaskStatus.DONE && (
        <div className='flex items-center pe-3 gap-1'>
          <CheckCircleSvg width='15' height='15' />
          {actualStartTime && fetchFormattedTime(actualStartTime)}
          {'-'}
          {endTime && fetchFormattedTime(endTime)}
        </div>
      )}

      {estimatedTime && (
        <div
          className='pe-3 gap-1 mt-1'
          style={{ display: 'flex', whiteSpace: 'nowrap' }}
        >
          <EstimatedTimeIcon />
          <p style={{ display: 'inline-block', margin: 0 }}>{formattedTime}</p>
        </div>
      )}
    </div>
  );
}
