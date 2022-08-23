import React, { useState } from "react";
import {
  Col,
  Form,
  Button,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import generalMessageDataFieldTypeData from "../../data/generalMessageDataFieldTypeData";
import generationFunctions from "../../data/generationFunctions";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import MessageDataFieldTypeModal from "../messageDataFieldTypeModal/MessageDataFieldTypeModal";
import { MessageDataFieldSpecific } from "./messageTypes";

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

  const [showTypeModal, setShowTypeModal] = useState<boolean>(false);

  return (
    <>
      <Col xs={"auto"}>
        <Button
          variant="outline-primary"
          onClick={() => setShowTypeModal(true)}
        >
          {generalMessageDataFieldTypeData.find(
            (d) => d.type === dataField.valueType
          )?.displayName ||
            (dataField.valueType === "generation" &&
              generationFunctions.find(
                (f) => f.type === dataField.generationType
              )?.displayName) ||
            dataField.valueType.toNonCamelCase()}
        </Button>
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
      <MessageDataFieldTypeModal
        dataField={dataField}
        show={showTypeModal}
        turnOff={() => setShowTypeModal(false)}
        indices={indices}
        updateMessageDataType={updateMessageDataType}
      />
    </>
  );
};

export default MessageDataRowTypeSpecific;
