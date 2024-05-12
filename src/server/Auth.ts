'use server';
import { ApiRoutes, Response } from '@/constants/constants';
import { ChangePassword } from '@/dto/ChangePassword.dto';
import { CurrentUser, SignIn } from '@/dto/User.dto';
import { verifyErrorResponse } from '@/utils/Common';
import { patch, post } from '@/utils/api';

export async function signInUser(user: SignIn): Promise<CurrentUser> {
  try {
    const response = await post(ApiRoutes.LOGIN, user);
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function changePassword(
  formData: ChangePassword
): Promise<Response> {
  const data = {
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword,
    newRepeatPassword: formData.newRepeatPassword,
  };

  try {
    const response = await patch(ApiRoutes.CHANGE_PASSWORD, data);

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
