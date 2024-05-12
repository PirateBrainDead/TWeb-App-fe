'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import PasswordInput from '../atoms/PasswordInput';
import CustomButton from '../atoms/Button';
import { changePassword } from '@/server/Auth';
import { Translations } from '@/constants/constants';
import { ErrorResponse } from '@/dto/ErrorResponse.dto';
import { toast } from 'react-toastify';

// Define interface for form errors
interface FormErrors {
  [key: string]: string | undefined;
  oldPassword?: string;
  newPassword?: string;
  newRepeatPassword?: string;
}

const passwordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
  newRepeatPassword: z.string().min(8),
});
interface Props {
  translations: Translations;
}

export default function PasswordForm(props: Props) {
  const [formValues, setFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    newRepeatPassword: '',
  });
  const [buttonDisable, setButtonDisable] = useState(true);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevFormValues) => {
      const updatedValues = { ...prevFormValues, [name]: value };

      if (name === 'newPassword' || name === 'newRepeatPassword') {
        validatePasswordMatch(updatedValues);
      }

      return updatedValues;
    });
  };
  const validatePasswordMatch = (values: typeof formValues) => {
    if (values.newPassword !== values.newRepeatPassword) {
      setButtonDisable(true);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        newRepeatPassword:
          props.translations[
            'newRepeatPassword and newPassword does not match'
          ],
      }));
    } else {
      if (values.newPassword === '' && values.newRepeatPassword === '') {
        setButtonDisable(true);
      } else {
        setButtonDisable(false);
      }

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        newRepeatPassword: undefined,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setFormErrors({});
      passwordSchema.parse(formValues);
      const response: boolean | ErrorResponse =
        await changePassword(formValues);

      if (typeof response === 'boolean') {
        toast(props.translations.passwordChanged, { type: 'success' });
        setFormValues({
          oldPassword: '',
          newPassword: '',
          newRepeatPassword: '',
        });
      } else {
        const errors = response.message.split('.');
        errors.forEach(function (part) {
          toast(props.translations[part], { type: 'error' });
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors = error.issues.reduce((acc, issue) => {
          const key = issue.path[0];
          if (typeof key === 'string') {
            acc[key] = props.translations[issue.message];
          }
          return acc;
        }, {} as FormErrors);

        setFormErrors(newErrors);
      } else {
        toast(error.message, { type: 'error' });
      }
    }
  };

  return (
    <div>
      <form className='flex flex-col items-center ' onSubmit={handleSubmit}>
        <PasswordInput
          type='password'
          name='oldPassword'
          placeholder={props.translations.settingsOldPasswordLabel}
          className='mt-8 w-full'
          error={formErrors.oldPassword}
          value={formValues.oldPassword}
          onChange={handleChange}
        />
        <PasswordInput
          type='password'
          name='newPassword'
          placeholder={props.translations.settingsNewPasswordLabel}
          className='mt-8 w-full'
          error={formErrors.newPassword}
          value={formValues.newPassword}
          onChange={handleChange}
        />
        <PasswordInput
          type='password'
          name='newRepeatPassword'
          placeholder={props.translations.settingsNewConfirmPasswordLabel}
          className='mt-8 w-full'
          error={formValues.newRepeatPassword && formErrors.newRepeatPassword}
          value={formValues.newRepeatPassword}
          onChange={handleChange}
        />
        <CustomButton
          color={buttonDisable ? 'default' : 'primary'}
          rounded={false}
          size='lg'
          type='submit'
          className='mt-7 w-2/4 rounded-md'
          disabled={buttonDisable}
        >
          {props.translations.buttonSaveChanges}
        </CustomButton>
      </form>
    </div>
  );
}
