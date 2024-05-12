import { useState, useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Props {
  url: string;
}
export const useSocket = ({ url }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const ws = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url, { transports: ['websocket'] });

    socket.on('connect', () => {
      setIsReady(true);
    });
    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        socket.connect();
      }
      setIsReady(false);
    });

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [url]);

  return { isReady, socket: ws.current };
};
