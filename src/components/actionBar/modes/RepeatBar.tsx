import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import useShake from "../../../hooks/useShake";
import { KafkaMessage } from "../../tabs/SendTab";

const RepeatBar: React.FC<KafkaMessage> = ({ send, canSend }) => {
  const defaultIntervalSeconds = 5;
  const [intervalSeconds, setIntervalSeconds] = useState<number>(
    defaultIntervalSeconds
  );
  const [running, setRunning] = useState<boolean>(false);

  const { shakeClass, setShaking } = useShake();

  let interval: NodeJS.Timer;
  useEffect(() => {
    if (running) {
      send();
      interval = setInterval(() => {
        send();
      }, intervalSeconds * 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="d-flex flex-row justify-content-between flex-fill">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col xs={8}>
            <InputGroup>
              <InputGroup.Text>Every</InputGroup.Text>
              <FormControl
                defaultValue={defaultIntervalSeconds}
                type="number"
                min="1"
                disabled={running}
                onChange={(e) => setIntervalSeconds(+e.target.value)}
              />
              <InputGroup.Text>seconds</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
      </Form>
      {running ? (
        <Button
          className={"px-4"}
          variant="danger"
          onClick={() => setRunning(false)}
        >
          Stop
        </Button>
      ) : (
        <Button
          className={`px-4 ${shakeClass}`}
          variant="success"
          onClick={() => (!canSend() ? setShaking(true) : setRunning(true))}
          onAnimationEnd={() => setShaking(false)}
        >
          Start
        </Button>
      )}
    </div>
  );
};

export default RepeatBar;
