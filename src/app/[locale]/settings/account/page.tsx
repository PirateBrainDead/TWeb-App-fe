import PasswordChange from '@/components/molecules/PasswordChange';
import SettingHeader from '@/components/molecules/SettingTab';
import React from 'react';

const page = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='h-[10%]'>
        <SettingHeader selectedTab='account' />
      </div>

      <div className='h-full flex flex-col items-center justify-center text-white '>
        <div className='flex w-1/2 h-[90%] rounded-lg justify-center items-center'>
          <PasswordChange />
        </div>
      </div>
    </div>
  );
};

export default page;
