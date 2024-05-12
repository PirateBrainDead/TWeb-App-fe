'use server';

import { ApiRoutes, Pages, Response } from '@/constants/constants';
import { Section } from '@/dto/Sections.dto';
import { verifyErrorResponse } from '@/utils/Common';
import { get, post, put, remove } from '@/utils/api';
import { revalidatePath } from 'next/cache';

export async function getSections(): Promise<Section[]> {
  try {
    const response = await get(ApiRoutes.SECTIONS);
    revalidatePath(Pages.SETTINGS);
    return response.json();
  } catch (error: any) {
    return error.response.data.message;
  }
}

export async function addSection(formData: Section): Promise<Response> {
  try {
    const response = await post(ApiRoutes.SECTIONS, formData);
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

export async function deleteSection(sectionsList: any): Promise<Response> {
  try {
    const response = await remove(ApiRoutes.SECTIONS, sectionsList);
    if (response.ok) {
      return true;
    } else {
      const parsedResponse = await response.json();
      throw new Error(JSON.stringify(parsedResponse));
    }
  } catch (error: any) {
    return verifyErrorResponse(error.message);
  }
}

export async function editSection(data: Section): Promise<Response> {
  try {
    const response = await put(ApiRoutes.SECTIONS, {
      sectionId: data.id,
      name: data.name,
    });
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
