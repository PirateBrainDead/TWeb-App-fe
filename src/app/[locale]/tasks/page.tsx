import React, { Suspense } from 'react';
import { Task } from '@/dto/Tasks.dto';
import { getSections } from '@/server/Sections';
import { getTaskTemplates } from '@/server/TaskTemplates';
import { Section } from '@/dto/Sections.dto';
import { getTranslations } from 'next-intl/server';
import Loading from '@/app/[locale]/tasks/loading';
import { PageProps } from '@/dto/PageProps';
import { sortList } from '@/constants/constants';
import TaskClientData from '@/components/organisms/TaskClientData';
import { fetchMonths } from '@/utils/Date';
export default async function TasksPage({ searchParams }: PageProps) {
  const sections: Section[] = await getSections();
  const templates: Task[] = await getTaskTemplates();
  sortList(templates);
  const t = await getTranslations('Tasks');
  const modalTranslations = await getTranslations('Modal');
  const weekDays = await getTranslations('WeekDays');
  const toastMessage = await getTranslations('ToastMessages');
  const tNotices = await getTranslations('NoticeModal');
  const tViewer = await getTranslations('TaskViewer');

  const translations = {
    descriptionLabelInput: t('descriptionLabelInput'),
    taskNameLabelInput: t('taskNameLabelInput'),
    newTaskSectionTitle: t('newTaskSectionTitle'),
    newTaskDayTitle: t('newTaskDayTitle'),
    prioritizeTitle: t('prioritizeTitle'),
    daysSectionHeading: t('daysSectionHeading'),
    emptyTasksTitle: t('emptyTasksTitle'),
    repeatUntilLabel: t('repeatUntilLabel'),
    timePickerLabel: t('timePickerLabel'),
    updateTaskTitle: t('updateTaskTitle'),
    createTaskTitle: t('createTaskTitle'),
    createTaskTemplateTitle: t('createTaskTemplateTitle'),
    insertImage: t('insertImage'),
    sectionRequired: t('sectionRequired'),
    dayRequired: t('dayRequired'),
    taskNameRequired: t('taskNameRequired'),
    taskDescriptionRequired: t('taskDescriptionRequired'),
    taskArkiv: t('taskArkiv'),
    week: t('week'),
    finishedTasks: t('finishedTasks'),
    activeTasks: t('activeTasks'),
    editTask: t('editTask'),
    deleteTask: t('deleteTask'),
    backToPlanning: t('backToPlanning'),
    descriptionMaxLength: t('descriptionMaxLength'),
    publishDateLabel: t('publishDateLabel'),
    showMore: t('showMore'),
    dePrioritizeTitle: t('dePrioritizeTitle'),
    taskArchive: t('taskArchive'),
    estimatedTime: t('estimatedTime'),
    initiated: t('initiated'),
    checkList: t('checkList'),
    addAPhoto: t('addAPhoto'),
    errorUploadingImage: t('errorUploadingImage'),
    errorImageSize: t('errorImageSize'),
    imageFormat: t('imageFormat'),
    imageLimit: t('imageLimit'),
    pastDate: t('pastDate'),
    monday: weekDays('monday'),
    tuesday: weekDays('tuesday'),
    wednesday: weekDays('wednesday'),
    thursday: weekDays('thursday'),
    friday: weekDays('friday'),
    saturday: weekDays('saturday'),
    sunday: weekDays('sunday'),
    modalTitle: modalTranslations('modalTitle'),
    modalDeleteDescription: modalTranslations('modalDeleteDescription'),
    modalCancelText: modalTranslations('modalCancelText'),
    modalConfirmText: modalTranslations('modalConfirmText'),
    FlashMessageCreateTask: toastMessage('FlashMessageCreateTask'),
    'task-in-provided-status-cant-be-deleted': toastMessage(
      'task-in-provided-status-cant-be-deleted'
    ),
    'minimal allowed date for startDate ': toastMessage(
      'minimal allowed date for startDate '
    ),
    'endDate should be greater than or equal startDate': toastMessage(
      'endDate should be greater than or equal startDate'
    ),
    'endDate must be a valid ISO 8601 date string': toastMessage(
      'endDate must be a valid ISO 8601 date string'
    ),
    FlashMessageUpdateTask: toastMessage('FlashMessageUpdateTask'),
    FlashMessageDeletedTask: toastMessage('FlashMessageDeletedTask'),
    FlashMessageAddTemplate: toastMessage('FlashMessageAddTemplate'),
    FlashMessageUpdateTemplate: toastMessage('FlashMessageUpdateTemplate'),
    FlashMessageDeleteTemplate: toastMessage('FlashMessageDeleteTemplate'),
    noticesTitle: tNotices('noticesTitle'),
    headerNewNotice: tNotices('headerNewNotice'),
    messageToHQLabel: tNotices('messageToHQLabel'),
    messageToHQPlaceholder: tNotices('messageToHQPlaceholder'),
    prioritizeNoticeCheckbox: tNotices('prioritizeNoticeCheckbox'),
    sendNoticeButton: tNotices('sendNoticeButton'),
    prioritizeNoticeDescription: tNotices('prioritizeNoticeDescription'),
    sentNotices: tNotices('sentNotices'),
    readLabel: tNotices('readLabel'),
    priority: tNotices('priority'),
    noticeAdded: tNotices('noticeAdded'),
    noData: tNotices('noData'),
    'description should not be empty': tNotices(
      'description should not be empty'
    ),
    description: tViewer('description'),
    taskAttachments: tViewer('taskAttachments'),
    informationHq: tViewer('informationHq'),
    comment: tViewer('comment'),
    noAttachment: tViewer('noAttachment'),
    noComment: tViewer('noComment'),
    commentHq: tNotices('commentHq'),
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className='w-full max-h-screen overflow-hidden bg-taskBackground mt-[4rem]'>
          <TaskClientData
            searchParams={searchParams}
            sections={sections}
            translations={translations}
            templates={templates}
            months={fetchMonths()}
          />
        </div>
      </Suspense>
    </>
  );
}
