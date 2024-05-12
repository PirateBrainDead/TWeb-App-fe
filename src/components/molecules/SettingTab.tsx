import Link from 'next/link';
import React from 'react';
import KeySvg from '../atoms/svg/Key';
import { getTranslations } from 'next-intl/server';
import { Pages } from '@/constants/constants';
import ListSvg from '../atoms/svg/List';

interface Props {
  selectedTab: string;
}

const SettingTab = async ({ selectedTab }: Props) => {
  const t = await getTranslations('Settings');

  const getLinkStyle = (tab: string) => {
    return tab === selectedTab ? 'border-b-4 border-primary-60 pb-4' : '';
  };

  return (
    <div className='flex justify-center text-white  '>
      <div className='flex justify-around px-4 w-6/12'>
        <Link href={Pages.ACCOUNT}>
          <div className={`flex items-center ${getLinkStyle('account')}`}>
            <div className=' bg-primary p-2 rounded-lg'>
              <KeySvg />
            </div>
            <span className='ml-2 font-medium text-lg'>{t('account')}</span>
          </div>
        </Link>

        <Link href={Pages.DEPARTMENT}>
          <div className={`flex items-center ${getLinkStyle('department')}`}>
            <div className=' bg-warning p-2 rounded-lg'>
              <ListSvg />
            </div>
            <span className=' ml-2 font-medium'>{t('manageDepartments')}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SettingTab;
