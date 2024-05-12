'use client';

import { useSectionSocket } from '@/sockets/useSectionSocket';
import { useTaskSocket } from '@/sockets/useTaskSocket';
import { useTaskTemplateSocket } from '@/sockets/useTaskTemplateSocket';
const SocketProvider = ({ children }: any) => {
  useSectionSocket();
  useTaskSocket();
  useTaskTemplateSocket();
  return children;
};

export default SocketProvider;
