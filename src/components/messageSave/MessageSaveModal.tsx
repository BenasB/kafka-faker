import React, { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Dropdown,
  DropdownButton,
  InputGroup,
} from "react-bootstrap";
import serializeMessageSchema from "../../io/serializeMessageSchema";
import demoSchemas from "../messageLoad/demoSchemas";
import { MessageSaveProps } from "./MessageSave";

interface Props {
  show: boolean;
  turnOff: () => void;
}

const MessageSaveModal: React.FC<Props & MessageSaveProps> = ({
  show,
  turnOff,
  message,
}) => {
  const [schemaName, setSchemaName] = useState<string>("");

  return (
    <Modal show={show} onHide={turnOff}>
      <Modal.Header closeButton>
        <Modal.Title>Save message schema</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()} noValidate>
          <InputGroup className="mb-3">
            <Form.Control
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
            />
            <DropdownButton variant="outline-secondary" title="" align="end">
              {demoSchemas.map((existingSchema) => (
                <Dropdown.Item
                  key={existingSchema.title}
                  onClick={() => setSchemaName(existingSchema.title)}
                >
                  {existingSchema.title}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={turnOff}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            console.log(
              `Saving ${schemaName} schema:`,
              JSON.stringify(serializeMessageSchema(message))
            );

            const existingSchema = demoSchemas.find(
              (s) => s.title === schemaName
            );

            if (existingSchema) {
              existingSchema.jsonString = JSON.stringify(
                serializeMessageSchema(message)
              );
            } else {
              demoSchemas.push({
                title: schemaName,
                jsonString: JSON.stringify(serializeMessageSchema(message)),
              });
            }
            turnOff();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageSaveModal;
