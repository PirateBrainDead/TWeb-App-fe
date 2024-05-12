'use server';

import { TaskTemplate } from '@/dto/Tasks.dto';
import { get, post, put, remove } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { ApiRoutes, Pages } from '@/constants/constants';

export const getTaskTemplates = async () => {
  try {
    const response = await get(ApiRoutes.TASK_TEMPLATES);
    revalidatePath(Pages.TASKS);
    return response.json();
  } catch (error: any) {
    throw error;
  }
};
export const createTaskTemplate = async (data: TaskTemplate) => {
  try {
    const response = await post(ApiRoutes.TASK_TEMPLATES, data);
    revalidatePath(Pages.TASKS);
    return response.json();
  } catch (error: any) {
    throw error;
  }
};

export const deleteTaskTemplate = async (id: string) => {
  try {
    const response = await remove(`${ApiRoutes.TASK_TEMPLATES}?id=${id}`);
    revalidatePath(Pages.TASKS);
    return response.json();
  } catch (error: any) {
    throw error;
  }
};
export const updateTaskTemplate = async (data: TaskTemplate) => {
  try {
    const response = await put(ApiRoutes.TASK_TEMPLATES, data);
    revalidatePath(Pages.TASKS);
    return response.json();
  } catch (error: any) {
    throw error;
  }
};
