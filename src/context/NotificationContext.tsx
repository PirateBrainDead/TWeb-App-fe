'use client';
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Notice } from '@/dto/Notices.dto';
interface NotificationContextType {
  notification: boolean;
  newNoticeNotification: boolean;
  setNewNoticeNotification: Dispatch<SetStateAction<boolean>>;
  setNotication: Dispatch<SetStateAction<boolean>>;
  notices: Notice[];
  setNotices: Dispatch<SetStateAction<Notice[]>>;
}

interface Props {
  children: React.ReactNode;
}

export const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType
);

function NotificationContextWrapper({ children }: Props) {
  const [notification, setNotication] = useState<boolean>(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [newNoticeNotification, setNewNoticeNotification] = useState(false);
  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotication,
        notices,
        setNotices,
        newNoticeNotification,
        setNewNoticeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextWrapper;
