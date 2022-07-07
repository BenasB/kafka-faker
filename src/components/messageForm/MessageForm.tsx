import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import MessageDataRow from "./MessageDataRow";

const MessageForm: React.FC<MessageFormManagement> = (props) => {
  const { message, addMessageDataField, updateTopic } = props;

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
        <Form.Label>Data</Form.Label>
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
