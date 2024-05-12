import React, { useContext, useEffect, useState } from 'react';
import NoticesSvg from './svg/NoticesSvg';
import NoticeAlertSvg from './svg/NoticeAlert';
import { Notice } from '@/dto/Notices.dto';
import { fetchNotices } from '@/server/Notices';
import { NotificationContext } from '@/context/NotificationContext';

export default function NoticeToggle() {
  const [notices, setNotices] = useState<Notice[]>([]);

  const { notification, newNoticeNotification } =
    useContext(NotificationContext);

  const getNotices = async () => {
    try {
      const response = await fetchNotices();
      setNotices(response);
    } catch (error: any) {}
  };

  useEffect(() => {
    getNotices();
  }, [notification]);

  function areAllReadByManager(): boolean {
    if (notices.length === 0) {
      return false;
    }
    for (const notice of notices) {
      if (!notice.isReadbyManager) {
        return false;
      }
    }
    return true;
  }

  return (
    <div>
      <NoticesSvg width={25} height={25} />
      {!areAllReadByManager() && notices.length > 0 && (
        <div className='absolute top-0 right-0'>
          <NoticeAlertSvg />
        </div>
      )}

      {newNoticeNotification && (
        <div className='absolute top-0 right-0'>
          <NoticeAlertSvg />
        </div>
      )}
    </div>
  );
}
