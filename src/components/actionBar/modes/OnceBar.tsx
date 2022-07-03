import React from "react";
import { Button } from "react-bootstrap";
import { KafkaMessage } from "../../tabs/SendTab";

const OnceBar: React.FC<KafkaMessage> = ({ send }) => {
  return (
    <div className="d-flex flex-row justify-content-end flex-fill">
      <Button className={"px-4"} variant="success" onClick={() => send()}>
        Send
      </Button>
    </div>
  );
};

export default OnceBar;
