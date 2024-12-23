import React from 'react';
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { CloseButton } from '@headlessui/react'
import { Text, Icons, IconButton } from '..';

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export const Modal = ({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={onClose}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex mt-28 justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border border-white/10"
            >
              <IconButton.X
                className="absolute top-4 right-4"
                onClick={onClose}
              />
              {title && <Text.H3 className="mb-4">{title}</Text.H3>}
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  );
};
