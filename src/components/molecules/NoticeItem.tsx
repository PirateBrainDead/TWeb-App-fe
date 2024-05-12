'use client';
import { Notice, UpdateNoticeDto } from '@/dto/Notices.dto';
import PriositySVG from '../atoms/svg/Priority';
import ReadTickSvg from '../atoms/svg/ReadTick';
import React, { useContext, useState } from 'react';
import { COLORS, Translations } from '@/constants/constants';
import classNames from 'classnames';
import CommentSvg from '../atoms/svg/Comment';
import NoticeAlertSvg from '../atoms/svg/NoticeAlert';
import { updateNotice } from '@/server/Notices';
import { toast } from 'react-toastify';
import { NotificationContext } from '@/context/NotificationContext';

interface Props {
  notice: Notice;
  translations: Translations;
  activeStates: boolean[];
  handleSectionClick?: (index: number) => void;
  index: number;
}

export default function NoticeItem({
  notice,
  translations,
  index,
  handleSectionClick,
  activeStates,
}: Props) {
  const { notification, setNotication, setNewNoticeNotification } =
    useContext(NotificationContext);
  const [showNotification, setShowNotification] = useState(
    !notice.isReadbyManager
  );
  const description =
    notice.description.length > 120
      ? notice.description.substring(0, 120) + '...'
      : notice.description;

  const [showComments, setShowComments] = useState(false);
  const handleComments = async () => {
    if (!notice.isReadbyManager) {
      try {
        const data: UpdateNoticeDto = {
          id: notice.id,
          isReadbyManager: true,
        };
        await updateNotice(data);
        setNewNoticeNotification(false);
        setShowNotification(!setShowNotification);
        setNotication(!notification);
      } catch (error: any) {
        toast(error.message, { type: 'error' });
      }
    }
    setShowComments(!showComments);
  };

  return (
    <>
      <div
        className={classNames(
          'text-white p-2 cursor-pointer w-full',
          {
            'text-white rounded-lg border-dark-60 border px-3  pt-2 my-2 transition-all duration-500 ease-in-out':
              activeStates[index],
          },
          {
            'transition-all duration-150 ease-in-out': !activeStates[index],
          }
        )}
        onClick={() => {
          if (handleSectionClick && !activeStates[index]) {
            handleSectionClick(index);
          }
        }}
      >
        <p className='border-none align-top focus:ring-0 placeholder-transparent text-xs break-words min-h-[3rem] whitespace-pre-line '>
          {activeStates[index] ? notice.description : description}
          {!activeStates[index] && notice.description.length > 120 && (
            <span className='cursor-pointer text-primary ps-1 text-xs'>
              {translations.showMore}
            </span>
          )}
        </p>
        <div className='flex py-2'>
          <div
            className={`flex items-center pe-3 gap-1 text-xs ${
              !notice.prioritize && 'text-dark-60'
            }`}
          >
            <PriositySVG
              color={notice.prioritize ? undefined : COLORS.DARK[60]}
            />
            {translations.priority}
          </div>
          <div
            className={`flex items-center pe-3 gap-1 text-xs ${
              notice.isReadbyHQ ? COLORS.DARK[10] : 'text-dark-60'
            }`}
          >
            <ReadTickSvg
              color={
                notice.isReadbyHQ ? COLORS.PRIMARY.DEFAULT : COLORS.DARK[60]
              }
            />
            {translations.readLabel}
          </div>

          <button
            className={`flex items-center pe-3 gap-1 text-xs text-white`}
            onClick={handleComments}
          >
            <div className='relative'>
              <CommentSvg />
              {showNotification && (
                <div className='absolute top-0 right-0'>
                  <NoticeAlertSvg />
                </div>
              )}
            </div>

            {translations.comment}
          </button>
        </div>

        <div
          className={`w-full ${
            showComments ? 'h-[10rem] overflow-y-scroll scrollbar-none' : ''
          } `}
        >
          {showComments && (
            <span className='text-xs'>{translations.commentHq}</span>
          )}
          {showComments && notice.comments?.length ? (
            notice.comments.map((comment, index) => {
              return (
                <div
                  key={index}
                  className='bg-dark-80 p-3 border border-gray-400 rounded-tl-xl rounded-br-xl mt-2 flex'
                >
                  <p className='text-xs break-words whitespace-pre-line w-full'>
                    {comment}
                  </p>
                </div>
              );
            })
          ) : (
            <p className='text-white flex justify-center text-xs mt-2'>
              {showComments && translations.noComment}
            </p>
          )}
        </div>
      </div>

      <div className='h-[0.1rem] w-full bg-dark-80 ml-2'></div>
    </>
  );
}
