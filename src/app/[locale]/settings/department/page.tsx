import Sections from '@/components/molecules/Sections';
import SettingHeader from '@/components/molecules/SettingTab';
import { Section } from '@/dto/Sections.dto';
import { getSections } from '@/server/Sections';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import Loading from '../../tasks/loading';

const page = async () => {
  const sections: Section[] = await getSections();
  const t = await getTranslations('Settings');

  const translations = {
    manageDepartments: t('manageDepartments'),
    departmentName: t('departmentName'),
    selectDepartmentIcon: t('selectDepartmentIcon'),
    buttonSaveChanges: t('buttonSaveChanges'),
    sectionAdded: t('sectionAdded'),
    // This for handling error from backend
    'name should not be empty': t('name should not be empty'),
    'iconName should not be empty': t('iconName should not be empty'),
    'section-with-provided-name-already-exist': t(
      'section-with-provided-name-already-exist'
    ),
    buttonAdd: t('buttonAdd'),
    buttonDelete: t('buttonDelete'),
    deleteInProcess: t('deleteInProcess'),
    errorDeletingSection: t('errorDeletingSection'),
    sectionDeletionComplete: t('sectionDeletionComplete'),
    modalTitle: t('modalTitle'),
    areYouSure: t('areYouSure'),
    modalCancelTitle: t('modalCancelTitle'),
    modalDeleteTitle: t('modalDeleteTitle'),
    noSectionSelected: t('noSectionSelected'),
    sectionAlreadyExists: t('sectionAlreadyExists'),
    sectionCannotBeEmpty: t('sectionCannotBeEmpty'),
    sectionRenamedSuccessfully: t('sectionRenamedSuccessfully'),
    emptySectionTitle: t('emptySectionTitle'),
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className='flex flex-col h-full '>
        <div className='h-[10%]'>
          <SettingHeader selectedTab='department' />
        </div>

        <div className=' h-full flex flex-col items-center pt-5'>
          <div className='flex flex-col w-1/2 h-[85%] rounded-lg justify-center items-center'>
            <Sections sections={sections} translations={translations} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default page;
