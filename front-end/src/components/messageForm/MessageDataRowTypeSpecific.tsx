import React from "react";
import {
  Col,
  Form,
  Button,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { messageDataFieldGenerationTypes } from "../../data/generationFunctions";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import {
  MessageDataFieldSpecific,
  messageDataFieldTypes,
} from "./messageTypes";

interface Props {
  dataField: MessageDataFieldSpecific;
  indices: number[];
  depth: number;
}

const MessageDataRowTypeSpecific: React.FC<Props & MessageFormManagement> = (
  props
) => {
  const {
    dataField,
    indices,
    depth,
    message,
    updateMessageDataType,
    updateMessageDataCustomValue,
    updateMessageDataArrayCount,
    addMessageDataNestedField,
    regenerateMessageDataFieldGeneration,
  } = props;

  return (
    <>
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
      {dataField.valueType === "array" && (
        <Col xs={2}>
          <OverlayTrigger overlay={<Tooltip>Array element count</Tooltip>}>
            <FormControl
              type="number"
              min="0"
              value={dataField.count}
              onChange={(e) =>
                updateMessageDataArrayCount(+e.target.value, indices)
              }
            />
          </OverlayTrigger>
        </Col>
      )}
      {dataField.valueType === "array" && (
        <MessageDataRowTypeSpecific
          {...props}
          dataField={dataField.value}
          indices={[...indices, 0]}
        />
      )}
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
            onClick={() => addMessageDataNestedField(indices, depth)}
          >
            Add field to {dataField.valueType}
          </Button>
        </Col>
      )}
      {dataField.valueType === "generation" && !message.autoGeneration && (
        <>
          <Col>
            <Form.Control type="text" value={dataField.value} disabled={true} />
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
    </>
  );
};

export default MessageDataRowTypeSpecific;
