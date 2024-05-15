import React from 'react';
import { Modal } from 'react-bootstrap';

function ModalBody({ children, type }) {
  return (
    <Modal.Body>
      <p>{children}</p>
      <input type={type} className="form-control mb-4" />
    </Modal.Body>
  );
}

export default ModalBody;
