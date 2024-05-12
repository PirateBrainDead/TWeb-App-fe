'use client';
import React, { useContext, useEffect, useState } from 'react';
import ArrowSvg from '../atoms/svg/Arrow';
import TextArea from '../atoms/TextArea';
import Toggle from '../atoms/Toggle';
import CustomButton from '../atoms/Button';
import NoticeItem from './NoticeItem';
import { ErrorResponse } from '@/dto/ErrorResponse.dto';
import { addNotice, fetchNotices } from '@/server/Notices';
import { Translations } from '@/constants/constants';
import { toast } from 'react-toastify';
import Loading from '@/app/[locale]/signin/loading';
import { Notice } from '@/dto/Notices.dto';
import { NotificationContext } from '@/context/NotificationContext';
interface Props {
  translations: Translations;
  setNoticesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManageNotices = (props: Props) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [revalidate, setRevalidate] = useState(false);
  const [loadingNotices, setLoadingNotices] = useState(false);

  const { notices: noticesData } = useContext(NotificationContext);
  const getNotices = async () => {
    setLoadingNotices(true);
    try {
      const response = await fetchNotices();
      setNotices(response.reverse());
      setLoadingNotices(false);
    } catch (error: any) {}
  };
  useEffect(() => {
    setNotices(noticesData);
  }, [noticesData]);

  useEffect(() => {
    getNotices();
  }, [revalidate]);

  const [formData, setFormData] = useState({
    message: '',
    isToggled: false,
  });
  const [loading, setLoading] = useState(false);

  const [activeStates, setActiveStates] = useState(
    Array(notices.length).fill(false)
  );

  const handleSectionClick = (index: number) => {
    const newActiveStates = new Array(activeStates.length).fill(false);
    newActiveStates[index] = !activeStates[index];
    setActiveStates(newActiveStates);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (value.length <= 400) {
      setFormData((prevData) => ({
        ...prevData,
        message: value,
      }));
    }
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      isToggled: event.target.checked,
    }));
  };

  const createNewNotice = async () => {
    setLoading(true);
    const data = {
      description: formData.message,
      prioritize: formData.isToggled,
      id: '',
    };

    try {
      const response: boolean | ErrorResponse = await addNotice(data);
      if (typeof response === 'boolean') {
        toast(props.translations.noticeAdded, { type: 'success' });
        setRevalidate(!revalidate);
      } else {
        toast(props.translations[response.message], { type: 'error' });
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
    setFormData({
      message: '',
      isToggled: false,
    });
    setLoading(false);
  };

  return (
    <div className='flex text-white h-full gap-0 w-full'>
      <div
        className='cursor-pointer'
        onClick={() => {
          props.setNoticesModal(false);
        }}
      >
        <ArrowSvg height={14} width={14} />
      </div>
      <div className='flex justify-between w-full'>
        <div className='w-1/2 pr-3 overflow-y-auto scrollbar-none mr-4'>
          <div className='flex justify-center h-[5%] '>
            <span className='text-lg font-bold'>
              {props.translations.noticesTitle}
            </span>
          </div>
          <div className='flex flex-col justify-between items-center pt-10 h-[95%]'>
            <div className='w-full h-[60%]'>
              <TextArea
                placeholder={props.translations.messageToHQPlaceholder}
                value={formData.message}
                maxLength={400}
                onChange={handleChange}
                color='bg-dark'
              />
            </div>

            <div className='w-full h-[30%] '>
              <div className='w-full flex justify-center'>
                <Toggle
                  name={props.translations.prioritizeNoticeCheckbox}
                  label={props.translations.prioritizeNoticeCheckbox}
                  onChange={handleToggleChange}
                  value={formData.isToggled}
                />
              </div>
              <p className='text-dark-40 text-xs mt-2 flex justify-center'>
                {props.translations.prioritizeNoticeDescription}
              </p>
              <div className='w-full mt-2'>
                <CustomButton
                  color={!formData.message ? 'default' : 'primary'}
                  variant='contained'
                  size='md'
                  className='rounded-3xl'
                  onClick={createNewNotice}
                  disabled={!formData.message}
                >
                  {!loading ? props.translations.sendNoticeButton : <Loading />}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>

        <div className='w-[0.09rem] ml-2 overflow-y-hidden bg-gradient-to-t from-dark  via-dark-80  to-dark' />

        <div className='w-1/2 flex-col pl-4'>
          <h2 className='text-white text-lg font-bold pb-6 flex justify-center h-[10%]'>
            {props.translations.sentNotices}
          </h2>
          <div className='block h-[90%] overflow-y-auto scrollbar-none'>
            {loadingNotices ? (
              <Loading />
            ) : (
              <>
                {notices.length > 0 ? (
                  notices.map((notice: any, index: any) => (
                    <NoticeItem
                      key={notice.id}
                      notice={notice}
                      translations={props.translations}
                      handleSectionClick={handleSectionClick}
                      activeStates={activeStates}
                      index={index}
                    />
                  ))
                ) : (
                  <p className='flex justify-center'>
                    {props.translations.noData}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageNotices;
