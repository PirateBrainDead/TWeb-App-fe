import React from 'react';
import { SectionToFileName } from '@/constants/constants';

interface Props {
  iconName: string;
}
const GetSectionSvg = ({ iconName }: Props) => {
  const fileName = SectionToFileName[iconName];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Icon = require(`./svg/sectionSvg/${fileName}.tsx`).default;

  return <Icon />;
};

export default GetSectionSvg;
