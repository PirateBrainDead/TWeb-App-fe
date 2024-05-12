import { useTranslations } from 'next-intl';
import LoginForm from '@/components/organisms/LoginForm';

export default function SignInPage() {
  const t = useTranslations('Login');
  const translations = {
    loginUsernameTitle: t('loginUsernameTitle'),
    loginPasswordTitle: t('loginPasswordTitle'),
    forgotPassword: t('forgotPassword'),
    login: t('login'),
    invalidCredentials: t('invalidCredentials'),
  };

  return (
    <div className='h-screen flex flex-col m-auto w-full items-center justify-center min-w-[1248px] '>
      <div className='w-[32rem] mt-8 p-1 rounded-md'>
        <span className='flex justify-center text-white text-2xl pt-4'>
          TASK MANAGEMENT APP
        </span>
        <div className='w-full flex justify-center pt-2'></div>
        <LoginForm translations={translations} />
      </div>
    </div>
  );
}
