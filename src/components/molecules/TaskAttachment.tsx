'use client';
import React, { useState } from 'react';
import CrossSvg from '../atoms/svg/Cross';
import {
  ApiRoutes,
  Translations,
  extractFileName,
} from '@/constants/constants';

interface Props {
  attachments: string[];
  translations: Translations;
}

export default function TaskAttachment({ attachments, translations }: Props) {
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const src = event.currentTarget.src;
    setSelectedImageSrc(src);
    setShowModal(!showModal);
  };
  return (
    <>
      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 overflow-y-auto'>
          <div className='relative h-[92%] w-full flex items-center justify-center'>
            <img
              src={selectedImageSrc || ''}
              alt={extractFileName(selectedImageSrc || '')}
              className='max-w-full max-h-full cursor-pointer'
              onClick={() => {
                setShowModal(!showModal);
              }}
            />
          </div>
          <div
            onClick={() => {
              setShowModal(!showModal);
            }}
            className='fixed top-0 right-0 mt-4 mr-4 cursor-pointer text-white'
          >
            <CrossSvg size={30} />
          </div>
        </div>
      )}

      <div className='flex items-center rounded-md h-36 overflow-x-auto scrollbar-none w-11/12'>
        <div className='flex gap-2 w-full'>
          {attachments && attachments.length > 0 ? (
            attachments.map((image: any, index: any) => (
              <div
                className='w-24 h-24 overflow-hidden flex justify-center items-center text-white mt-2 relative rounded-xl cursor-pointer'
                key={index}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${ApiRoutes.IMAGE_URL}${image}`}
                  alt={extractFileName(selectedImageSrc || '')}
                  className='rounded-xl cursor-pointer w-full h-full object-cover'
                  onClick={handleImageClick}
                />
              </div>
            ))
          ) : (
            // Todo add translation
            <p className='flex justify-center text-xs w-full'>
              {translations.noAttachment}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
