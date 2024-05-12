'use server';

import { ClientSession } from '@/constants/constants';
import { authOptions } from '@/utils/AuthOptions';
import { getServerSession } from 'next-auth';

export async function getHeaders() {
  const session: ClientSession | null = await getServerSession(authOptions);

  return {
    Authorization: `Bearer ${session?.accessToken}`,
  };
}

export async function getHeadersWithType() {
  const session: ClientSession | null = await getServerSession(authOptions);

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.accessToken}`,
  };
}
