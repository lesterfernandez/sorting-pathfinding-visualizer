import React from "react";
import { createPortal } from "react-dom";

interface Props {
  modal: JSX.Element;
  modalRef: React.Ref<HTMLDivElement>;
  toggleModal: () => void;
}

export function ConfigureModal({ modal, toggleModal, modalRef }: Props) {
  return createPortal(
    <div
      className="fixed inset-0 hidden bg-gray-700 bg-opacity-30"
      onClick={toggleModal}
      ref={modalRef}
    >
      <div
        className="absolute inset-0 m-auto flex h-[60vh] w-5/6 max-w-xl flex-col rounded bg-white text-center shadow"
        onClick={e => void e.stopPropagation()}
      >
        <div className="flex w-full items-center border-b-2 p-2 px-4">
          <h2 className="text-lg">Algorithm Settings</h2>
          <button
            className="ml-auto grid h-full select-none place-items-center rounded-lg text-lg hover:text-blue-500"
            type="button"
            onClick={toggleModal}
          >
            X
          </button>
        </div>
        <div className="flex-grow overflow-y-scroll">{modal}</div>
        <div className="flex h-14 w-full items-center border-t-2 px-4">
          <button
            type="button"
            className="my-2 ml-auto select-none rounded-md bg-blue-200 p-2 px-4 hover:bg-blue-300"
            onClick={() => void toggleModal()}
          >
            Ok
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
