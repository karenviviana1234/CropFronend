import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function ModalMessage({ label, isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center ">
        <ModalContent className="p-4">
          <ModalBody>
            <label> {label} </label>
          </ModalBody>
          <ModalFooter className="justify-center">
            <Button onClick={onClose} className="inline-flex items-center justify-center py-2 px-4 bg-[#39A800] text-white font-semibold rounded-md">
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}