import { useSession } from 'next-auth/react';
import { ClientSession } from '@/constants/constants';
import { useSocket } from '@/sockets/useSocket';
import { useEffect } from 'react';
import {
  EventSyncStatus,
  SOCKET_PATH,
  SocketTemplates,
} from '@/constants/socket';
import { getTaskTemplates } from '@/server/TaskTemplates';

export const useTaskTemplateSocket = () => {
  const { data: sessions } = useSession({ required: false });

  const userId = (sessions as ClientSession)?.LoginUser.userId;

  const { socket: templateSocket } = useSocket({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/task-templates`,
  });

  useEffect(() => {
    templateSocket?.on(
      SOCKET_PATH.TASK_TEMPLATES.CHANGES(userId),
      async (data: SocketTemplates) => {
        if (data.syncStatus === EventSyncStatus.CREATED) {
          await getTaskTemplates();
          return;
        }
        if (data.syncStatus === EventSyncStatus.DELETED && data.idForDelete) {
          await getTaskTemplates();
          return;
        }

        if (data.syncStatus === EventSyncStatus.UPDATED) {
          await getTaskTemplates();
        }
      }
    );
  }, [templateSocket, userId]);
};
