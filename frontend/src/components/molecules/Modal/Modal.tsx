import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../../atoms";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  open: boolean;
  onClose?: () => void;
  mainActionText: string;
  secondaryActionText?: string;
  handleMainAction: () => void;
  handleSecondaryAction?: () => void;
}

export const Modal: React.FC<IModalProps> = ({
  onClose = () => {},
  title,
  open,
  children,
  mainActionText,
  secondaryActionText,
  handleMainAction,
  handleSecondaryAction,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                {children}
                <div className="mt-4 flex justify-end space-x-2">
                  {secondaryActionText && (
                    <Button variant="secondary" onClick={handleSecondaryAction}>
                      {secondaryActionText}
                    </Button>
                  )}
                  <Button type="button" onClick={handleMainAction}>
                    {mainActionText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
