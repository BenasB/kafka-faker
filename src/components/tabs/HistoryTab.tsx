import React from "react";
import { Accordion, Row } from "react-bootstrap";
import { SerializedMessage } from "../messageForm/serializeMessage";

interface Props {
  messageHistory: SerializedMessage[];
}

const HistoryTab: React.FC<Props> = ({ messageHistory }) => {
  return (
    <div>
      <Accordion flush alwaysOpen>
        {messageHistory.map((message) => (
          <Accordion.Item
            eventKey={message.timeStamp.getTime().toString()}
            key={message.timeStamp.getTime()}
          >
            <Accordion.Header>
              <div className="d-flex justify-content-between w-100 pe-5">
                <div>{message.timeStamp.toLocaleTimeString()}</div>
                <div>Sent</div>
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
