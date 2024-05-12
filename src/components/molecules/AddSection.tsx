import React, { useState } from 'react';
import ArrowSvg from '../atoms/svg/Arrow';
import TextInput from '../atoms/TextInput';
import CustomButton from '../atoms/Button';
import SvgComponent from '../atoms/GetSectionSvg';
import { SectionToFileName, Translations } from '@/constants/constants';
import { Section } from '@/dto/Sections.dto';
import { addSection } from '@/server/Sections';
import { ErrorResponse } from '@/dto/ErrorResponse.dto';
import { toast } from 'react-toastify';

interface AddSectionProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  sections: Section[];
  translations: Translations;
}

export default function AddSection({
  setShowModal,
  sections,
  translations,
}: AddSectionProps) {
  const [sectionData, setSectionData] = useState<{
    sectionName: string;
    selectedIcon: string;
  }>({
    sectionName: '',
    selectedIcon: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const hanldeModalClose = () => {
    setSectionData({ sectionName: '', selectedIcon: '' });
    setShowModal(false);
  };

  const checkAvailibility = (iconName: string) => {
    return sections.some((section) => section.iconName === iconName);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSectionName = event.target.value;
    setSectionData((prevState) => ({
      ...prevState,
      sectionName: newSectionName,
    }));

    // Update the disabled state based on the condition
    setIsButtonDisabled(!newSectionName || !sectionData.selectedIcon);
  };

  const createNewSection = async () => {
    const data = {
      name: sectionData.sectionName,
      iconName: sectionData.selectedIcon,
      id: '',
    };
    try {
      const response: boolean | ErrorResponse = await addSection(data);
      if (typeof response === 'boolean') {
        toast(translations.sectionAdded, { type: 'success' });
        hanldeModalClose();
      } else {
        const erros = response.message.split('.');
        erros.forEach(function (part) {
          toast(translations[part], { type: 'error' });
        });
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };

  const addIcon = (icon: string) => {
    if (!checkAvailibility(icon)) {
      setSectionData((prevState) => ({ ...prevState, selectedIcon: icon }));
      // Update the disabled state based on the condition
      setIsButtonDisabled(!sectionData.sectionName || !icon);
    }
  };

  const allSections = Object.keys(SectionToFileName);
  return (
    <div className='h-full flex flex-col justify-between text-white overflow-scroll scrollbar-none'>
      <div className='h-[93%]'>
        <div className='flex gap-[25%] h-[10%]' onClick={hanldeModalClose}>
          <ArrowSvg height={20} width={20} />
          <span className='text-md font-medium'>
            {translations.manageDepartments}
          </span>
        </div>
        <div className='h-[10%]'>
          <TextInput
            placeholder={translations.departmentName}
            value={sectionData.sectionName}
            onChange={handleNameChange}
            required
            color='bg-dark'
            maxLength={25}
          />
        </div>
        <div className='mt-4 flex flex-col justify-between h-[80%] overflow-y-auto scrollbar-none'>
          <div>
            <span className='text-md font-medium'>
              {translations.selectDepartmentIcon}
            </span>
            <div className='flex flex-wrap mt-2'>
              {allSections.map((icon, index) => {
                const isAvailable = checkAvailibility(icon);
                const bgColorClass = !isAvailable ? 'bg-dark-80' : 'bg-dark-40';
                const borderClass =
                  icon === sectionData.selectedIcon
                    ? 'border-2 border-blue-500'
                    : '';

                return (
                  <div
                    key={index}
                    className={`${bgColorClass} ${borderClass} rounded-md m-2 h-11 w-11 p-2`}
                    onClick={() => addIcon(icon)}
                  >
                    <SvgComponent iconName={icon} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className='h-[7%] mt-5'>
        <CustomButton
          color={
            sectionData.sectionName && sectionData.selectedIcon
              ? 'primary'
              : 'default'
          }
          size='md'
          onClick={createNewSection}
          disabled={isButtonDisabled}
        >
          {translations.buttonSaveChanges}
        </CustomButton>
      </div>
    </div>
  );
}
