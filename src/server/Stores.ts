'use server';

import { ApiRoutes, Pages, Response } from '@/constants/constants';
import { Store } from '@/dto/Store.dto';
import { verifyErrorResponse } from '@/utils/Common';
import { get, put } from '@/utils/api';
import { revalidatePath } from 'next/cache';

export async function getStores(): Promise<Store> {
  try {
    const response = await get(ApiRoutes.GET_STORES);
    return response.json();
  } catch (error: any) {
    return error.response.data.message;
  }
}

export async function UpdateStores(formData: Store): Promise<Response> {
  const data = {
    leafletLink: formData.leafletLink,
  };
  try {
    const response = await put(ApiRoutes.UPDATE_STORES, data);
    if (response.ok) {
      revalidatePath(Pages.SETTINGS);
      return true;
    } else {
      const parsedResponse = await response.json();
      throw new Error(JSON.stringify(parsedResponse));
    }
  } catch (error: any) {
    return verifyErrorResponse(error.message);
  }
}
