import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import useToasts from "../../hooks/useToasts";

const ActionBar: React.FC = () => {
  const modes = ["once", "repeat"] as const;
  const [mode, setMode] = useState<typeof modes[number]>("once");

  const { addNewToast, removeToastFromList, toastDisplay } = useToasts();

  return (
    <>
      <div className="position-sticky bottom-0 border-top py-3 bg-white">
        <div className="d-flex flex-row justify-content-between">
          <Form>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Select
                  onChange={(e) =>
                    setMode(modes.find((m) => m === e.target.value) || modes[0])
                  }
                >
                  {modes.map((m) => (
                    <option key={m} value={m}>
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              {mode === "repeat" && (
                <Col xs={6}>
                  <InputGroup>
                    <InputGroup.Text>Every</InputGroup.Text>
                    <FormControl placeholder="x" type="number" min="1" />
                    <InputGroup.Text>seconds</InputGroup.Text>
                  </InputGroup>
                </Col>
              )}
            </Row>
          </Form>
          {mode === "once" && (
            <Button
              className={"px-4"}
              variant="success"
              onClick={() => {
                addNewToast({
                  text: "Hello world",
                  timeStamp: new Date(),
                  onClose: removeToastFromList,
                });
              }}
            >
              Send
            </Button>
          )}
          {mode === "repeat" && (
            <>
              <Button className={"px-4"} variant="success">
                Start
              </Button>
            </>
          )}
        </div>
      </div>
      {toastDisplay}
    </>
  );
};

export default ActionBar;
