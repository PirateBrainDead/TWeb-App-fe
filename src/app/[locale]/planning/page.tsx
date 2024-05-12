import TasksPage from '@/app/[locale]/tasks/page';
import { PageProps } from '@/dto/PageProps';

export default async function Page(props: PageProps) {
  return <TasksPage {...props} />;
}
