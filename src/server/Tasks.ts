'use server';
import { CreateTask, DeleteTask, Task, UpdateTask } from '@/dto/Tasks.dto';
import { ApiRoutes } from '@/constants/constants';
import { get, post, put, remove } from '@/utils/api';
import { fetchFormattedDate } from '@/utils/Date';

export const getTasksByDate = async (date: any): Promise<Task[]> => {
  try {
    const response = await get(
      `${ApiRoutes.TASKS}?date=${fetchFormattedDate(date)}`
    );
    return response.json();
  } catch (error: any) {
    throw error;
  }
};
export const createNewTask = async (data: CreateTask) => {
  try {
    const response = await post(ApiRoutes.TASKS, data);
    return response.json();
  } catch (error: any) {
    throw error;
  }
};

export const getRepeatableTasks = async (date: any) => {
  try {
    const response = await get(
      `${ApiRoutes.TASKS_REPEATABLE}?date=${fetchFormattedDate(date)}`
    );
    return response.json();
  } catch (error: any) {
    return error;
  }
};

export const deleteTask = async (data: DeleteTask) => {
  try {
    const response = await remove(
      `${ApiRoutes.TASKS}?id=${data.id}&date=${data.date}&allEvents=${data.allEvents}`
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};
export const updateTask = async (data: UpdateTask) => {
  try {
    const response = await put(ApiRoutes.TASKS, data);
    return response.json();
  } catch (error) {
    throw error;
  }
};
