import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import MessageDataRowTypeSpecific from "./MessageDataRowTypeSpecific";
import { MessageDataField } from "./messageTypes";
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
      <Row style={{ marginLeft: 30 * dataField.depth + "px" }}>
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
        <MessageDataRowTypeSpecific {...props} />
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

export default MessageDataRow;
