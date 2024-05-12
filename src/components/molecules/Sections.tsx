'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Section } from '@/dto/Sections.dto';
import SVGComponent from '@/components/atoms/GetSectionSvg';
import TickSVG from '@/components/atoms/svg/Tick';
import CustomButton from '@/components//atoms/Button';
import { ErrorResponse } from '@/dto/ErrorResponse.dto';
import { toast } from 'react-toastify';
import { deleteSection, editSection } from '@/server/Sections';
import Modal from '@/components/molecules/Modal';
import AddSection from '@/components/molecules/AddSection';
import { Translations } from '@/constants/constants';
import { sectionsData } from '@/context/SectionContext';
import ConfirmationModal from '@/components/molecules/ConfirmationModal';
import RenameIcon from '@/components/atoms/svg/RenameIcon';
import CrossSvg from '@/components/atoms/svg/Cross';

interface SectionsInterface {
  sections: Array<Section>;
  translations: Translations;
}

export default function Sections(props: SectionsInterface) {
  const [isRename, setIsRename] = useState(false);
  const [selectedRenameSection, setSelectedRenameSection] = useState<Section>({
    iconName: '',
    id: '',
    name: '',
    plannedDays: [],
  });
  const [inputValue, setInputValue] = useState('');
  const [renameError, setRenameError] = useState({
    error: false,
    message: '',
  });

  const [allSections, setAllSections] = useState(props.sections);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [reload, setReload] = useState(false);

  const context = useContext(sectionsData);
  const { sections, setSections } = context;

  const filterSections = useCallback(() => {
    const filteredSections = allSections.filter(
      (section) => !sections.includes(section.id)
    );
    setAllSections(filteredSections);
  }, [reload]);

  useEffect(() => {
    filterSections();
  }, [filterSections]);

  useEffect(() => {
    setAllSections(props.sections);
  }, [props.sections]);

  const toggleSectionSelection = (sectionId: string) => {
    if (selectedSections.includes(sectionId)) {
      setSelectedSections(selectedSections.filter((id) => id !== sectionId));
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  const handleConfirmationModal = () => {
    if (selectedSections.length === 0) {
      toast(props.translations.noSectionSelected, { type: 'warning' });
    } else {
      setShowConfirmationModal(true);
    }
  };

  const deleteSections = async () => {
    try {
      setSections(selectedSections);
      const response: boolean | ErrorResponse =
        await deleteSection(selectedSections);
      if (typeof response === 'boolean') {
        toast(props.translations.deleteInProcess, { type: 'warning' });
        setReload(!reload);
      } else {
        toast(props.translations.errorDeletingSection, { type: 'error' });
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
    setSelectedSections([]);
    setShowConfirmationModal(false);
  };

  function handleModalOpen() {
    setShowModal(true);
  }
  const handleRename = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const renameSection = async (name: string, section: Section) => {
    const data = {
      id: section.id,
      name: name,
      plannedDays: section.plannedDays,
      iconName: section.iconName,
    };
    const response: boolean | ErrorResponse = await editSection(data);
    if (typeof response === 'boolean') {
      toast(props.translations.sectionRenamedSuccessfully, { type: 'success' });
    } else {
      const erros = response.message.split('.');
      erros.forEach(function (part) {
        toast(props.translations[part], { type: 'error' });
      });
    }
  };
  return (
    <>
      <ConfirmationModal
        type='danger'
        showModal={showConfirmationModal}
        title={props.translations.areYouSure}
        description={props.translations.modalTitle}
        handleCancellation={() => {
          setShowConfirmationModal(false);
        }}
        handleConfirmation={() => {
          deleteSections();
        }}
        cancelText={props.translations.modalCancelTitle}
        confirmText={props.translations.modalDeleteTitle}
      />
      <div className='h-3/4 w-2/5 text-white overflow-y-auto scrollbar-none'>
        <div className='flex flex-col'>
          <div>
            {allSections.length > 0 ? (
              allSections.map((section, index) => (
                <>
                  {isRename && selectedRenameSection.id === section.id && (
                    <>
                      <div className='flex w-full relative'>
                        <input
                          autoComplete='off'
                          type='text'
                          value={inputValue}
                          onChange={handleRename}
                          className=' p-3 mt-4 border border-gray-500 rounded-md bg-transparent w-full'
                          maxLength={25}
                        />
                        <span
                          className='mt-1 absolute right-9 top-6 cursor-pointer'
                          onClick={() => {
                            const sectionNames = allSections.map((s) =>
                              s.name.toUpperCase()
                            );
                            if (
                              sectionNames.includes(inputValue.toUpperCase())
                            ) {
                              setRenameError({
                                error: true,
                                message:
                                  props.translations.sectionAlreadyExists,
                              });
                            } else if (inputValue === '') {
                              setRenameError({
                                error: true,
                                message:
                                  props.translations.sectionCannotBeEmpty,
                              });
                            } else {
                              setIsRename(false);
                              renameSection(inputValue, selectedRenameSection);
                              setSelectedRenameSection({} as Section);
                              setRenameError({
                                error: false,
                                message: '',
                              });
                            }
                          }}
                        >
                          <TickSVG />
                        </span>
                        <span
                          className='mt-1 absolute right-4 top-7 cursor-pointer'
                          onClick={() => {
                            setIsRename(false);
                            setSelectedRenameSection({} as Section);
                            setRenameError({
                              error: false,
                              message: '',
                            });
                          }}
                        >
                          <CrossSvg size={15} />
                        </span>
                      </div>
                      {renameError.error && (
                        <p className='text-red-500 text-sm mt-1'>
                          {renameError.message}
                        </p>
                      )}
                    </>
                  )}
                  <div
                    key={index}
                    className={`p-3 mt-4 border border-gray-500 rounded-md cursor-pointer bg-${
                      selectedSections.includes(section.id)
                        ? ' bg-primary'
                        : 'dark-80'
                    } ${
                      isRename && selectedRenameSection.id === section.id
                        ? 'hidden'
                        : 'block'
                    } `}
                  >
                    <div className='relative'>
                      <div
                        className='flex justify-between'
                        onClick={() => toggleSectionSelection(section.id)}
                      >
                        <div className='flex gap-2'>
                          {selectedRenameSection.id !== section.id && (
                            <>
                              <SVGComponent iconName={section.iconName} />
                              <span className='font-medium'>
                                {section.name.length > 17
                                  ? `${section.name.substring(0, 17)}...`
                                  : section.name}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className='flex absolute top-0 right-0 cursor-pointer'>
                        {selectedSections.includes(section.id) ? (
                          <TickSVG />
                        ) : (
                          <span
                            onClick={() => {
                              setIsRename(true);
                              setSelectedRenameSection(section);
                              setInputValue(section.name);
                            }}
                          >
                            <RenameIcon />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <span className='flex flex-col justify-center items-center text-lg font-semibold'>
                {props.translations.emptySectionTitle}
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <Modal className='h-3/4 w-3/12 min-w-[26.75rem]' showModal={showModal}>
          <AddSection
            setShowModal={setShowModal}
            sections={props.sections}
            translations={props.translations}
          />
        </Modal>
      </div>

      <div className='flex w-2/5'>
        <CustomButton
          color='primary'
          size='md'
          className=' mt-4 w-9/12'
          onClick={handleModalOpen}
        >
          {props.translations.buttonAdd}
        </CustomButton>
        <CustomButton
          color='danger'
          size='md'
          className='ml-4 mt-4 w-9/12'
          onClick={handleConfirmationModal}
        >
          {props.translations.buttonDelete}
        </CustomButton>
      </div>
    </>
  );
}
