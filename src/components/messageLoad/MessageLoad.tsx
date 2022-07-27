import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const MessageLoad: React.FC = () => {
  return (
    <OverlayTrigger overlay={<Tooltip>Load message schema</Tooltip>}>
      <Button variant="outline-secondary" size="sm">
        <i className="bi bi-file-earmark-arrow-down"></i>
      </Button>
    </OverlayTrigger>
  );
};

export default MessageLoad;
