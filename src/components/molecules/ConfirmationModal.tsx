import { COLORS } from '@/constants/constants';
import CustomButton from '@/components/atoms/Button';
import PriositySVG from '@/components/atoms/svg/Priority';
import Modal from '@/components/molecules/Modal';
import CheckIconSVG from '@/components/atoms/svg/CheckIcon';

interface ConfirmationModalProps {
  title: string;
  description: string;
  type?: 'danger' | 'warning' | 'primary';
  showModal: boolean;
  handleCancellation: () => void;
  handleConfirmation: () => void;
  cancelText?: string;
  confirmText?: string;
}

export default function ConfirmationModal({
  type = 'primary',
  title,
  description,
  showModal,
  handleConfirmation,
  handleCancellation,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmationModalProps) {
  let color;
  let icon;
  let tw_color;

  switch (type) {
    case 'danger':
      color = COLORS.DANGER.DEFAULT;
      icon = <PriositySVG height={'20'} width={'21'} color={color} />;
      tw_color = 'text-danger';
      break;
    case 'warning':
      color = COLORS.WARNING.DEFAULT;
      icon = <PriositySVG height={'20'} width={'21'} color={color} />;
      tw_color = 'text-warning';
      break;
    case 'primary':
      color = COLORS.PRIMARY.DEFAULT;
      icon = <CheckIconSVG height={'20'} width={'21'} color={color} />;
      tw_color = 'text-primary';
      break;
  }

  return (
    <Modal className='w-3/12' showModal={showModal}>
      <div className='flex items-center justify-center gap-2'>
        {icon}
        <p className={'text-xl font-bold ' + tw_color}>{title}</p>
      </div>
      <p className='text-white text-center mt-4'>{description}</p>
      <div className='flex mt-10 gap-3'>
        <CustomButton onClick={handleCancellation}>{cancelText}</CustomButton>
        <CustomButton color={type} onClick={handleConfirmation}>
          {confirmText}
        </CustomButton>
      </div>
    </Modal>
  );
}
