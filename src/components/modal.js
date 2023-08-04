import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Modals({
  buttonClass,
  buttonText,
  className,
  modalTitle,
  modalBody,
  closeButtonLabel,
  understoodButtonLabel,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className={buttonClass} onClick={handleShow} variant="danger">
        {buttonText}
      </Button>

      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={className}
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="daner" className="topnav-btn" onClick={handleClose}>
            {closeButtonLabel}
          </Button>
          <Button variant="danger" className="topnav-btn">
            {understoodButtonLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
