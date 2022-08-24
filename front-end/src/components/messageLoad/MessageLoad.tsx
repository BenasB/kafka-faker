import React, { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Message } from "../messageForm/messageTypes";
import MessageLoadModal from "./MessageLoadModal";

export interface MessageLoadProps {
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
}

const MessageLoad: React.FC<MessageLoadProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <OverlayTrigger
        overlay={<Popover className="p-2">Load message schema</Popover>}
      >
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-file-earmark-arrow-down"></i>
        </Button>
      </OverlayTrigger>
      <MessageLoadModal
        show={showModal}
        turnOff={() => setShowModal(false)}
        {...props}
      />
    </>
  );
};

export default MessageLoad;
