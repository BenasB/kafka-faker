import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { ToastActions } from "../../../hooks/useToasts";

const RepeatBar: React.FC<ToastActions> = ({
  addNewToast,
  removeToastFromList,
}) => {
  const defaultIntervalSeconds = 5;
  const [intervalSeconds, setIntervalSeconds] = useState<number>(
    defaultIntervalSeconds
  );
  const [running, setRunning] = useState<boolean>(false);

  let interval: NodeJS.Timer;
  useEffect(() => {
    if (running) {
      addNewToast({
        text: "Hello world from repeat",
        timeStamp: new Date(),
        onClose: removeToastFromList,
      });
      interval = setInterval(() => {
        addNewToast({
          text: "Hello world from repeat",
          timeStamp: new Date(),
          onClose: removeToastFromList,
        });
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
          className={"px-4"}
          variant="success"
          onClick={() => setRunning(true)}
        >
          Start
        </Button>
      )}
    </div>
  );
};

export default RepeatBar;
