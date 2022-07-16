import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { messageDataFieldGenerationTypes } from "../../data/generationFunctions";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import { MessageDataField, messageDataFieldTypes } from "./messageTypes";

interface Props {
  dataField: MessageDataField;
  indices: number[];
}

const MessageDataRow: React.FC<Props & MessageFormManagement> = (props) => {
  const { dataField, indices, message } = props;
  const {
    updateMessageDataKey,
    updateMessageDataType,
    updateMessageDataCustomValue,
    addMessageDataObjectField,
    removeMessageDataField,
    regenerateMessageDataFieldGeneration,
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
            value={dataField.key.value}
            placeholder="Name"
            onChange={(e) => updateMessageDataKey(e.target.value, indices)}
            isInvalid={!!dataField.key.errorMessages}
          />
          <Form.Control.Feedback type="invalid">
            {dataField.key.errorMessages?.join(",")}
          </Form.Control.Feedback>
        </Col>
        <Col xs={2}>
          <Form.Select
            onChange={(e) =>
              updateMessageDataType(
                messageDataFieldGenerationTypes.find(
                  (t) => t === e.target.value
                ) ||
                  messageDataFieldTypes.find((t) => t === e.target.value) ||
                  messageDataFieldTypes[0],
                indices
              )
            }
            value={
              dataField.valueType === "generation"
                ? dataField.generationType
                : dataField.valueType
            }
          >
            {[...messageDataFieldGenerationTypes, ...messageDataFieldTypes].map(
              (m) => (
                <option key={m} value={m}>
                  {m.toFirstUpperCase()}
                </option>
              )
            )}
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
        {dataField.valueType === "generation" && !message.autoGeneration && (
          <>
            <Col>
              <Form.Control
                type="text"
                value={dataField.value}
                disabled={true}
              />
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-secondary"
                onClick={() => regenerateMessageDataFieldGeneration(indices)}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </Button>
            </Col>
          </>
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
