import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import {
  MessageDataField,
  messageDataFieldTypes,
} from "../../hooks/useMessageForm";

interface Props {
  dataField: MessageDataField;
  indices: number[];
}

const MessageDataRow: React.FC<Props & MessageFormManagement> = (props) => {
  const { dataField, indices } = props;
  const {
    updateMessageDataKey,
    updateMessageDataType,
    updateMessageDataCustomValue,
    addMessageDataObjectField,
    removeMessageDataField,
  } = props;

  return (
    <>
      <Row
        className={`mb-3`}
        style={{ marginLeft: 30 * dataField.depth + "px" }}
      >
        <Col xs={3}>
          <Form.Control
            type="text"
            value={dataField.key}
            placeholder="Name"
            onChange={(e) => updateMessageDataKey(e.target.value, indices)}
          />
        </Col>
        <Col xs={3}>
          <Form.Select
            onChange={(e) =>
              updateMessageDataType(
                messageDataFieldTypes.find((t) => t === e.target.value) ||
                  messageDataFieldTypes[0],
                indices
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
                updateMessageDataCustomValue(e.target.value, indices)
              }
              placeholder="Value"
            />
          </Col>
        )}
        {dataField.valueType === "object" && (
          <Col>
            <Button
              variant="primary"
              onClick={() => addMessageDataObjectField(indices)}
            >
              Add field to object
            </Button>
          </Col>
        )}
        <Col xs="auto">
          <Button
            variant="outline-danger"
            onClick={() => removeMessageDataField(indices)}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </Col>
      </Row>
      {dataField.valueType === "object" &&
        dataField.value.map((nestedDataField, nestedIndex) => (
          <MessageDataRow
            {...props}
            dataField={nestedDataField}
            indices={[...indices, nestedIndex]}
            key={
              indices.reduce<string>((result, num) => result + num, "") +
              nestedIndex
            }
          />
        ))}
    </>
  );
};

export default MessageDataRow;
