import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MessageFormManagement } from "../../hooks/useMessageForm";

export const messageDataFieldTypes = ["custom", "object"] as const;

type MessageDataFieldCommon = {
  key: string;
};

type MessageDataFieldCustom = MessageDataFieldCommon & {
  valueType: typeof messageDataFieldTypes[0];
  value: string;
};

type MessageDataFieldObject = MessageDataFieldCommon & {
  valueType: typeof messageDataFieldTypes[1];
  value: MessageDataField[];
};

type MessageDataField = MessageDataFieldCustom | MessageDataFieldObject;

export interface Message {
  topic: string;
  data: MessageDataField[];
}

const MessageForm: React.FC<MessageFormManagement> = ({
  message,
  addMessageDataField,
  updateTopic,
  updateMessageDataKey,
  updateMessageDataCustomValue,
  updateMessageDataType,
}) => {
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
          <Row key={index} className={"mb-3"}>
            <Col>
              <Form.Control
                type="text"
                value={dataField.key}
                onChange={(e) => updateMessageDataKey(e.target.value, index)}
              />
            </Col>
            <Col>
              <Form.Select
                onChange={(e) =>
                  updateMessageDataType(
                    messageDataFieldTypes.find((t) => t === e.target.value) ||
                      messageDataFieldTypes[0],
                    index
                  )
                }
              >
                {messageDataFieldTypes.map((m) => (
                  <option key={m} value={m}>
                    {m.toFirstUpperCase()}
                  </option>
                ))}
              </Form.Select>
            </Col>
            {dataField.valueType === "custom" && (
              <Col>
                <Form.Control
                  type="text"
                  value={dataField.value}
                  onChange={(e) =>
                    updateMessageDataCustomValue(e.target.value, index)
                  }
                />
              </Col>
            )}
          </Row>
        ))}
        <Row sm={5} className={"justify-content-center"}>
          <Button variant="primary" onClick={() => addMessageDataField()}>
            Add field
          </Button>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
