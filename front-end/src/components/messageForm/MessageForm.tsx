import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Stack,
  Popover,
} from "react-bootstrap";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import MessageDataRow from "./MessageDataRow";
import ValidationErrorMessage from "./ValidationErrorMessage";

const MessageForm: React.FC<MessageFormManagement> = (props) => {
  const {
    message,
    addMessageDataField,
    updateTopic,
    updateKey,
    toggleAutoGeneration,
    regenerateAllMessageDataFields,
    removeAllMessageDataFields,
  } = props;

  const [showDeleteConfirmationModal, setShowDeleteConfimationModal] =
    useState<boolean>(false);

  return (
    <Form
      as={Stack}
      onSubmit={(e) => e.preventDefault()}
      noValidate
      gap={3}
      autoComplete={"off"}
    >
      <Form.Group>
        <div className={"d-flex"}>
          <Form.Label column sm={2}>
            Topic
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Topic"
              value={message.topic.value}
              onChange={(e) => updateTopic(e.target.value)}
              isInvalid={!!message.topic.errorMessages}
            />
            <ValidationErrorMessage {...message.topic} />
          </Col>
        </div>
      </Form.Group>
      <Form.Group>
        <div className={"d-flex"}>
          <Form.Label column sm={2}>
            Key
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Key (optional)"
              value={message.key}
              onChange={(e) => updateKey(e.target.value)}
            />
          </Col>
        </div>
      </Form.Group>
      <Form.Group as={Stack} gap={3}>
        <div className="d-flex justify-content-between">
          <Row>
            <Col>
              <h4>Data</h4>
            </Col>
            {!message.autoGeneration && message.data.length > 0 && (
              <Col>
                <OverlayTrigger
                  overlay={
                    <Popover className="p-2">
                      Regenerate all generation fields
                    </Popover>
                  }
                >
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => regenerateAllMessageDataFields()}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </Button>
                </OverlayTrigger>
              </Col>
            )}
            {message.data.length > 0 && (
              <>
                <Col>
                  <OverlayTrigger
                    overlay={
                      <Popover className="p-2">Delete all fields</Popover>
                    }
                  >
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => setShowDeleteConfimationModal(true)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </OverlayTrigger>
                </Col>
                <DeleteConfirmationModal
                  show={showDeleteConfirmationModal}
                  setShow={setShowDeleteConfimationModal}
                  onConfirm={removeAllMessageDataFields}
                />
              </>
            )}
          </Row>
          <OverlayTrigger
            overlay={
              <Popover className="p-2 text-center">
                Automatically regenerate data when sending a message
              </Popover>
            }
          >
            <Form.Check
              type="switch"
              label="Auto generation"
              id="auto-generation-switch"
              checked={message.autoGeneration}
              onChange={() => toggleAutoGeneration()}
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
        <div className={"d-flex justify-content-center my-3 w-100"}>
          <Button
            variant="primary"
            onClick={() => addMessageDataField()}
            className={"px-5"}
          >
            Add field
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
