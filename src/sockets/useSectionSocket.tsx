'use client';
import {
  EventSyncStatus,
  SOCKET_PATH,
  SocketSections,
} from '@/constants/socket';
import { useSocket } from './useSocket';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { ClientSession } from '@/constants/constants';
import { getSections } from '@/server/Sections';

export const useSectionSocket = () => {
  const { data: session } = useSession({
    required: false,
  });
  const storeId = (session as ClientSession)?.LoginUser.storeId;

  const { socket: sectionSocket } = useSocket({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/sections`,
  });

  useEffect(() => {
    sectionSocket?.on(
      SOCKET_PATH.SECTIONS.DELETED(storeId),
      async (data: SocketSections) => {
        if (data.syncStatus === EventSyncStatus.DELETED) {
          toast('Delete Successfull!', { type: 'success' });
          await getSections();
          return;
        }
      }
    );
  }, [sectionSocket, storeId]);

  useEffect(() => {
    sectionSocket?.on(
      SOCKET_PATH.SECTIONS.DELETED(storeId),
      async (data: SocketSections) => {
        if (data.syncStatus === EventSyncStatus.DELETE_FAILED) {
          toast('Deletion failed/raderingen misslyckades', { type: 'error' });
          await getSections();
          return;
        }
      }
    );
  }, [sectionSocket, storeId]);

  useEffect(() => {
    sectionSocket?.on(
      SOCKET_PATH.SECTIONS.CHANGES(storeId),
      async (data: SocketSections) => {
        if (data.syncStatus === EventSyncStatus.CREATED) {
          await getSections();
          return;
        }
      }
    );
  }, [sectionSocket, storeId]);
};
