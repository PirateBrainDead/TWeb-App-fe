import classNames from 'classnames';
import { Translations } from '@/constants/constants';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  active: boolean;
  setActiveState: Dispatch<SetStateAction<boolean>>;
  translations: Translations;
}
export default function Tab({ translations, active, setActiveState }: Props) {
  return (
    <>
      <div className=' ml-[-1rem] w-1/2 flex justify-center items-center gap-5 mt-3 mb-2 font-bold text-sm'>
        <button
          className={classNames('w-32 text-center py-1', {
            'border-b-2 border-primary': active,
          })}
          onClick={() => {
            setActiveState(true);
          }}
        >
          <p
            className={classNames({
              'text-dark-20': active,
              'text-dark-60': !active,
            })}
          >
            {translations.activeTasks}
          </p>
        </button>
      </div>
    </>
  );
}
