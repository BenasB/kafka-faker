import React from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import MessageDataRow from "./MessageDataRow";

const MessageForm: React.FC<MessageFormManagement> = (props) => {
  const { message, addMessageDataField, updateTopic, toggleAutoGeneration } =
    props;

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Topic
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Topic"
            onChange={(e) => updateTopic(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group>
        <div className="d-flex justify-content-between my-2">
          <Form.Label>Data</Form.Label>
          <OverlayTrigger
            overlay={
              <Tooltip>
                Automatically generate data when sending a message
              </Tooltip>
            }
          >
            <Form.Check
              type="switch"
              label="Auto generation"
              value={message.autoGeneration.toString()}
              onClick={() => toggleAutoGeneration()}
            />
          </OverlayTrigger>
        </div>
        {message.data.map((dataField, index) => (
          <MessageDataRow
            {...props}
            dataField={dataField}
            indices={[index]}
            key={index}
          />
        ))}
        <Row sm={5} className={"justify-content-center mb-3"}>
          <Button variant="primary" onClick={() => addMessageDataField()}>
            Add field
          </Button>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
