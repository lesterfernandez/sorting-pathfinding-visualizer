import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { ConfigureModalContext } from "./ConfigureModalContext";

interface Props {
  modalRef: React.Ref<HTMLDivElement>;
  toggleModal: () => void;
}

export function ConfigureModal({ toggleModal, modalRef }: Props) {
  const { Modal } = useContext(ConfigureModalContext);
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
        <Modal toggleModal={toggleModal} />
      </div>
    </div>,
    document.body
  );
}
