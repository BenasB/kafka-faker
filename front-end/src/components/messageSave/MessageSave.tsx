import React, { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Message } from "../messageForm/messageTypes";
import MessageSaveModal from "./MessageSaveModal";

export interface MessageSaveProps {
  message: Message;
}

const MessageSave: React.FC<MessageSaveProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <OverlayTrigger
        overlay={<Popover className="p-2">Save message schema</Popover>}
      >
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-file-earmark-arrow-up"></i>
        </Button>
      </OverlayTrigger>
      <MessageSaveModal
        show={showModal}
        turnOff={() => setShowModal(false)}
        {...props}
      />
    </>
  );
};

export default MessageSave;
