import React from 'react';
import Modal, { useModal } from './ui/Modal.jsx';
import ContactF from './ui/ContactF.jsx';
import { X, Send } from "lucide-react";
import Button from './ui/Button.jsx';

// Wrapper to bridge the Modal context to ContactF
function ContactFormWrapper() {
  const { close } = useModal();

  const closeBtn = (
    <button
      type="button"
      id="modal-close-btn"
      onClick={close}
      className="p-2 text-carbon-1400 hover:bg-carbon-100 dark:hover:bg-carbon-800 duration-300 rounded-sm"
    >
      <X size="1.125rem" />
    </button>
  );

  return <ContactF closeBtn={closeBtn} onCancel={close} />;
}

export default function ContactModal() {
  return (
    <Modal>
      <Modal.Open opens="contact">
        <Button className="max-[330px]:w-full">
          <Send size="1.25rem" />
          &nbsp;Contact Me
        </Button>
      </Modal.Open>

      <Modal.Window name="contact">
        <ContactFormWrapper />
      </Modal.Window>
    </Modal>
  );
}
