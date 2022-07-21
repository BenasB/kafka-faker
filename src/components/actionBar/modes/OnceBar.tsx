import React from "react";
import { Button } from "react-bootstrap";
import useShake from "../../../hooks/useShake";
import { KafkaMessage } from "../../tabs/SendTab";

const OnceBar: React.FC<KafkaMessage> = ({ send, canSend }) => {
  const { shakeClass, setShaking } = useShake();

  return (
    <div className="d-flex flex-row justify-content-end flex-fill">
      <Button
        className={`px-4 ${shakeClass}`}
        variant="success"
        onClick={() => (!canSend() ? setShaking(true) : send())}
        onAnimationEnd={() => setShaking(false)}
      >
        Send
      </Button>
    </div>
  );
};

export default OnceBar;
