'use client';
import React, { useState } from 'react';
import LogOutSvg from '../atoms/svg/LogOut';
import { signOut } from 'next-auth/react';
import ConfirmationModal from './ConfirmationModal';
import { Translations } from '@/constants/constants';

interface Props {
  translations: Translations;
}

export default function Logout(props: Props) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/signin',
    });
  };
  return (
    <>
      <ConfirmationModal
        type='primary'
        showModal={showConfirmationModal}
        title={props.translations.areYouSure}
        description={props.translations.modalTitleLogout}
        handleCancellation={() => {
          setShowConfirmationModal(false);
        }}
        handleConfirmation={() => {
          handleSignOut();
        }}
        cancelText={props.translations.modalCancelTitle}
        confirmText={props.translations.yes}
      />

      <div>
        <button
          className='flex items-center'
          onClick={() => setShowConfirmationModal(true)}
        >
          <div className=' bg-primary p-2 rounded-lg'>
            <LogOutSvg />
          </div>
          <span className='font-medium ml-3 text-white text-md'>
            {props.translations.logoutTitle}
          </span>
        </button>
      </div>
    </>
  );
}
