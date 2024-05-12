import Logout from '@/components/molecules/Logout';
import { getTranslations } from 'next-intl/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('Settings');

  const translations = {
    modalTitleLogout: t('modalTitleLogout'),
    areYouSure: t('areYouSure'),
    modalCancelTitle: t('modalCancelTitle'),
    yes: t('yes'),
    logoutTitle: t('logoutTitle'),
  };
  return (
    <div className='h-screen'>
      <div className=' text-white flex justify-between px-10 pt-5 h-[8%] mt-[4rem]'>
        <span className='text-2xl font-bold'>{t('headerSettings')}</span>
        <Logout translations={translations} />
      </div>

      <div className='h-[85%] mt-[2rem]'>{children}</div>
    </div>
  );
}
