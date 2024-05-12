import classNames from 'classnames';
import { capitalizeFirstLetter } from '@/constants/constants';

interface Props {
  label: string;
  icon?: string;
  active: boolean;
  onClick?: () => void;
  index?: number;
  color?: string;
}

export default function Chips(props: Props) {
  return (
    <>
      <div
        key={props.index}
        className={classNames(
          `flex py-1 px-4 3xl:px-7 3xl:py-3 mx-1 justify-center items-center rounded-[0.5rem] h-full${
            props.color ? ` bg-dark` : ' bg-dark-80'
          }`,
          {
            'bg-primary': props.active,
          }
        )}
      >
        <div>
          <p
            className={`text-xs 3xl:text-base w-auto whitespace-nowrap ${
              props.color ? `text-primary` : 'text-white'
            }  `}
          >
            {capitalizeFirstLetter(props.label)}
          </p>
        </div>
      </div>
    </>
  );
}
