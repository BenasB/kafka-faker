import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import MessageDataRowTypeSpecific from "./MessageDataRowTypeSpecific";
import {
  Message,
  MessageDataField,
  MessageDataFieldSpecific,
} from "./messageTypes";
import NestedDataFields from "./NestedDataFields";
import ValidationErrorMessage from "./ValidationErrorMessage";

interface Props {
  dataField: MessageDataField;
  indices: number[];
}

const MessageDataRow: React.FC<Props & MessageFormManagement> = (props) => {
  const { dataField, indices, updateMessageDataName, removeMessageDataField } =
    props;

  return (
    <>
      <Row
        style={{ paddingLeft: 30 * dataField.depth + "px" }}
        className={"w-100"}
      >
        <Col xs={3}>
          <Form.Control
            type="text"
            value={dataField.name.value}
            placeholder="Name"
            onChange={(e) => updateMessageDataName(e.target.value, indices)}
            isInvalid={!!dataField.name.errorMessages}
          />
          <ValidationErrorMessage {...dataField.name} />
        </Col>
        <MessageDataRowTypeSpecific {...props} depth={dataField.depth} />
        <Col xs="auto">
          <Button
            variant="outline-danger"
            onClick={() => removeMessageDataField(indices)}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </Col>
      </Row>
      <NestedDataFields {...props} />
    </>
  );
};

// Comparing function to significantly increase the performace by using memoization
// Determines if the row should re-render
const areEqualForMemo: (
  prevField: MessageDataField,
  prevMessage: Message,
  currField: MessageDataField,
  currMessage: Message
) => boolean = (prevField, prevMessage, currField, currMessage) => {
  const areEqualBasedOnFieldType: (
    prevSpecific: MessageDataFieldSpecific,
    currSpecific: MessageDataFieldSpecific
  ) => boolean = (prevSpecific, currSpecific) => {
    if (prevSpecific.valueType !== currSpecific.valueType) return false;

    if (
      prevSpecific.valueType === "object" &&
      currSpecific.valueType === "object"
    ) {
      return (
        prevSpecific.value.length === currSpecific.value.length &&
        currSpecific.value.every((s, index) =>
          areEqualForMemo(
            prevSpecific.value[index],
            prevMessage,
            s,
            currMessage
          )
        )
      );
    } else if (
      prevSpecific.valueType === "array" &&
      currSpecific.valueType === "array"
    ) {
      return (
        prevSpecific.count === currSpecific.count &&
        areEqualBasedOnFieldType(prevSpecific.value, currSpecific.value)
      );
    } else if (
      prevSpecific.valueType === "generation" &&
      currSpecific.valueType === "generation"
    ) {
      return prevMessage.autoGeneration === currMessage.autoGeneration;
    }

    return prevSpecific.value === currSpecific.value;
  };

  return (
    prevField.name.value === currField.name.value &&
    prevField.name.errorMessages === currField.name.errorMessages &&
    areEqualBasedOnFieldType(prevField, currField)
  );
};

export default React.memo(MessageDataRow, (prevProps, currProps) =>
  areEqualForMemo(
    prevProps.dataField,
    prevProps.message,
    currProps.dataField,
    currProps.message
  )
);
