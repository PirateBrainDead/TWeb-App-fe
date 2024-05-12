import { useSession } from 'next-auth/react';
import { ClientSession, currentDate, sortList } from '@/constants/constants';
import { useSocket } from '@/sockets/useSocket';
import { EventSyncStatus, SOCKET_PATH, SocketTasks } from '@/constants/socket';
import { getTasksByDate } from '@/server/Tasks';
import { useContext, useEffect } from 'react';
import { TaskContext } from '@/context/TaskContext';
import { toast } from 'react-toastify';

export const useTaskSocket = () => {
  const { data: session } = useSession({
    required: false,
  });
  const storeId = (session as ClientSession)?.LoginUser.storeId;

  const { socket: taskSocket } = useSocket({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,
  });

  const { setTasks, setRepeat } = useContext(TaskContext);
  useEffect(() => {
    try {
      const response = async () => {
        const data = await getTasksByDate(currentDate);
        if (data.statusCode !== 401) {
          sortList(data);
          setTasks(data);
        }
      };
      response();
    } catch (error: any) {
      toast('User is logged out!', { type: 'error' });
    }
  }, []);

  useEffect(() => {
    taskSocket?.on(
      SOCKET_PATH.TASKS.DAILY(storeId),
      async (data: SocketTasks) => {
        if (data.date !== currentDate) {
          return;
        }
        const { syncStatus, tasks, taskIdForDelete } = data;
        if (syncStatus === EventSyncStatus.CREATED) {
          setRepeat(Math.random());
          return;
        }
        if (taskIdForDelete) {
          setRepeat(Math.random());
        }
        if (tasks?.length) {
          setRepeat(Math.random());
        }
      }
    );
  }, [taskSocket, storeId]);

  useEffect(() => {
    taskSocket?.on(
      SOCKET_PATH.TASKS.REPEATABLE(storeId),
      async (data: SocketTasks) => {
        const { syncStatus, tasks, taskIdForDelete } = data;
        if (syncStatus === EventSyncStatus.CREATED && tasks?.length > 0) {
          setRepeat(Math.random());
          return;
        }
        if (!taskIdForDelete) {
          return;
        }
        if (syncStatus === EventSyncStatus.DELETED) {
          setRepeat(Math.random());
          return;
        }
      }
    );
  }, [taskSocket, storeId]);
};
