'use client';
import React, { useState } from 'react';
import SettingsSvg from '@/components/atoms/svg/Settings';
import Modal from '@/components/molecules/Modal';
import ManageNotices from '@/components/molecules/ManageNotices';
import { Translations } from '@/constants/constants';
import { ScheduleData } from '@/dto/Staff.dto';
import StaffSettingModal from '@/components/molecules/StaffSettingModal';
import NoticeToggle from '../atoms/NoticeToggle';

interface Props {
  translations: Translations;
  staff: ScheduleData;
  staffTranslations: Translations;
}

const HomeScreenModals = (props: Props) => {
  const [noticesModal, setNoticesModal] = useState<boolean>(false);
  const [staffModal, setStaffModal] = useState<boolean>(false);

  const handleNoticeModal = () => {
    setNoticesModal(!noticesModal);
  };

  const handleStaffModal = () => {
    setStaffModal(!staffModal);
  };

  return (
    <>
      <Modal showModal={staffModal} className='h-3/4 w-2/12 min-w-[24rem]'>
        <StaffSettingModal
          staff={props.staff}
          translations={props.staffTranslations}
          setStaffModal={setStaffModal}
        />
      </Modal>

      <Modal showModal={noticesModal} className='h-3/4 w-1/2 min-w-[40rem]'>
        {noticesModal && (
          <ManageNotices
            translations={props.translations}
            setNoticesModal={setNoticesModal}
          />
        )}
      </Modal>
      <div className='flex items-center gap-3 pt-2'>
        <div onClick={handleStaffModal} className=' cursor-pointer'>
          <SettingsSvg />
        </div>

        <div
          onClick={handleNoticeModal}
          className='flex items-center cursor-pointer relative'
        >
          <NoticeToggle />
        </div>
      </div>
    </>
  );
};

export default HomeScreenModals;
