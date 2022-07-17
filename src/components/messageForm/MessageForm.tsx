import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Tooltip,
  OverlayTrigger,
  Stack,
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
      <Form.Group as={Row}>
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
      </Form.Group>
      <Form.Group as={Row}>
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
                  overlay={<Tooltip>Regenerate all generation fields</Tooltip>}
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
                    overlay={<Tooltip>Delete all fields</Tooltip>}
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
              <Tooltip>
                Automatically regenerate data when sending a message
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
        <Row sm={5} className={"justify-content-center my-3"}>
          <Button variant="primary" onClick={() => addMessageDataField()}>
            Add field
          </Button>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
