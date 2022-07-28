import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<Props> = ({
  show,
  setShow,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete all fields</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are about to delete <b>all</b> of your data fields. Confirm?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm();
            setShow(false);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
