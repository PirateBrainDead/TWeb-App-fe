import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/AuthOptions';
import { ClientSession } from '@/constants/constants';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getHeaders() {
  const session: ClientSession | null = await getServerSession(authOptions);

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.accessToken}`,
  };
}

// POST Request
export const post = async (path: any, data: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });
  return response;
};

// GET Request
export const get = async (path: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();

  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
  });
  return response;
};

// PUT Request
export const put = async (path: any, data: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();

  const response = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data),
  });
  return response;
};

// DELETE Request
export const remove = async (path: any, body?: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();

  const response = await fetch(url, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify(body),
  });
  return response;
};

// PATCH Request
export const patch = async (path: any, data: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();

  const response = await fetch(url, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(data),
  });
  return response;
};
