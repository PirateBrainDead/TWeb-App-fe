'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import CustomButton from '@/components/atoms/Button';
import { AuthProvider, Translations } from '@/constants/constants';
import { useSearchParams } from 'next/navigation';
import { SignIn } from '@/dto/User.dto';
import VectorSvg from '../atoms/svg/Vector';
import { toast } from 'react-toastify';
import Loading from '@/app/[locale]/signin/loading';
import PasswordInputSignIn from '../atoms/PasswordInputSignIn';

interface Props {
  translations: Translations;
}

export default function LoginForm(props: Props) {
  const [credentials, setCredentials] = useState<SignIn>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get('callbackUrl');

  async function verifyLogin(e: { preventDefault: () => void }) {
    setLoading(true);
    e.preventDefault();
    const result = await signIn(AuthProvider.CREDENTIALS, {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
      callbackUrl: search ?? '/',
    });

    if (result) {
      if (result.error) {
        toast(props.translations.invalidCredentials, { type: 'error' });
        setLoading(false);
      } else if (result.url) {
        window.location.href = result.url;
      }
    }
  }

  const isLoginFormValid = credentials.username && credentials.password;
  return (
    <div>
      <form className='my-3 mx-10 text-white flex flex-col'>
        <div className='mt-2'>
          <label className='text-lg'>
            {props.translations.loginUsernameTitle}
          </label>
        </div>
        <input
          name='username'
          value={credentials.username}
          placeholder={props.translations.loginUsernameTitle}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              username: e.currentTarget.value,
            })
          }
          className='mt-2 bg-background w-full rounded-md h-12 autofill:caret-amber-50'
        ></input>

        <div className='mt-2'>
          <label className='text-lg'>
            {props.translations.loginPasswordTitle}
          </label>
        </div>

        <PasswordInputSignIn
          type={'password'}
          placeholder={props.translations.loginPasswordTitle}
          value={credentials.password}
          name='password'
          className='mt-2 w-full'
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.currentTarget.value,
            })
          }
        />

        <div className='mt-8 mb-2 w-full flex justify-center'>
          <CustomButton
            color={!isLoginFormValid ? 'default' : 'primary'}
            size='lg'
            onClick={verifyLogin}
            className='text-lg'
            type='submit'
            disabled={!isLoginFormValid}
          >
            {!loading && props.translations.login}

            {!loading ? <VectorSvg /> : <Loading />}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
