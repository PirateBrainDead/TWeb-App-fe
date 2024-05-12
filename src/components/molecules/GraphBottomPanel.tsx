import { Translations } from '@/constants/constants';
import React from 'react';

interface Props {
  data: { color: string; name: string; isSelected: boolean }[];
  setData: React.Dispatch<React.SetStateAction<any>>;
  GraphBottomTranslations: Translations;
}

export default function GraphBottomPanel(props: Props) {
  return (
    <div className='flex cursor-pointer'>
      {props.data.map(({ color, name, isSelected }: any) => (
        <div
          key={name}
          className='flex items-center mb-4 mx-1'
          onClick={() => {
            props.setData((prev: any) =>
              prev.map((item: any) => {
                if (item.name === name) {
                  return { ...item, isSelected: !item.isSelected };
                }
                return item;
              })
            );
          }}
        >
          <div
            className='p-2 rounded-full mr-2'
            style={
              isSelected
                ? { backgroundColor: color }
                : {
                    outlineOffset: `-2px`,
                    outline: `2px solid ${color}`,
                  }
            }
          ></div>
          <p className='text-sm text-dark-60'>
            {props.GraphBottomTranslations[name]}
          </p>
        </div>
      ))}
    </div>
  );
}
