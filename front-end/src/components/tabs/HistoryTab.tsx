import React from "react";
import { Accordion, Alert, Row } from "react-bootstrap";
import { SerializedSendMessage } from "../../io/serializeMessageSend";

export interface HistoryMessage extends SerializedSendMessage {
  isSuccess: boolean;
}

interface Props {
  messageHistory: HistoryMessage[];
}

const HistoryTab: React.FC<Props> = ({ messageHistory }) => {
  if (messageHistory.length === 0)
    return (
      <Alert
        variant="light"
        className="m-auto text-center bg-transparent border-0"
      >
        <Alert.Heading>
          <i className="bi bi-info-square"></i>
        </Alert.Heading>
        <p>No messages sent yet!</p>
      </Alert>
    );

  return (
    <div className="mb-3">
      <Alert variant="light">
        <Alert.Heading className="text-center">
          <i className="bi bi-info-square"></i>
        </Alert.Heading>
        <p>
          This is your session&apos;s message history. If you refresh the page,
          the session will be reset and the message history will be emptied.
          Click on a message to see its details.
        </p>
      </Alert>
      <Accordion flush alwaysOpen className={"border-start border-end"}>
        {messageHistory.map((message) => (
          <Accordion.Item
            eventKey={message.timeStamp.getTime().toString()}
            key={message.timeStamp.getTime()}
          >
            <Accordion.Header>
              <div className="d-flex justify-content-between w-100 pe-5">
                <div>{message.timeStamp.toLocaleTimeString()}</div>
                <div>{message.isSuccess ? "Sent" : "Failed"}</div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Row>Topic: {message.topic}</Row>
              {message.key && <Row>Key: {message.key}</Row>}
              <Row>Data:</Row>
              <Row>
                <pre className="bg-light p-2 rounded">
                  {message.jsonStringPretty}
                </pre>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default HistoryTab;
