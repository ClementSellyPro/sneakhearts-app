"use client";

import { Dispatch, SetStateAction } from "react";
import Button from "../ui/Button";

interface ModalConfirmationProps {
  message: string;
  onConfirmation: () => void;
  setAction: Dispatch<SetStateAction<boolean>>;
}

export default function ModalConfirmation({
  message,
  onConfirmation,
  setAction,
}: ModalConfirmationProps) {
  function closeModal() {
    setAction(false);
  }

  return (
    <div className="fixed inset-0 h-screen bg-black/25" onClick={closeModal}>
      <div className="flex justify-center items-center h-screen">
        <div className=" flex flex-col gap-4 items-center p-8 rounded-xl bg-white">
          <p>{message}</p>
          <div className="flex gap-4">
            <Button type="button" onClick={closeModal} secondary>
              Non
            </Button>
            <Button type="button" onClick={onConfirmation}>
              Oui
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
