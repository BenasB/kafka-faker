import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const MessageSave: React.FC = () => {
  return (
    <OverlayTrigger overlay={<Tooltip>Save message schema</Tooltip>}>
      <Button variant="outline-secondary" size="sm">
        <i className="bi bi-file-earmark-arrow-up"></i>
      </Button>
    </OverlayTrigger>
  );
};

export default MessageSave;
