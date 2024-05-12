import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  showModal: boolean;
  className?: string;
}

export default function Modal({
  children,
  showModal: showModal,
  className,
}: ModalProps) {
  return (
    <div
      id='default-modal'
      className={classNames(
        `fixed inset-0 flex justify-center items-center z-10 bg-black bg-opacity-80 w-full mx-auto`,
        { 'hidden ': !showModal }
      )}
    >
      <div className={`bg-dark p-3 rounded-lg shadow-lg ${className}`}>
        {children}
      </div>
    </div>
  );
}
