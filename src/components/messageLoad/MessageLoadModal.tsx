import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import deserializeMessageSchema from "../../io/deserializeMessageSchema";
import demoSchemas, { Schema } from "./demoSchemas";
import { MessageLoadProps } from "./MessageLoad";

interface Props extends MessageLoadProps {
  show: boolean;
  turnOff: () => void;
}

const MessageLoadModal: React.FC<Props> = ({ show, turnOff, setMessage }) => {
  const defaultSchema = demoSchemas[0];
  const [selectedSchema, setSelectedSchema] = useState<Schema>(defaultSchema);

  useEffect(() => {
    setSelectedSchema(defaultSchema);
  }, [show]);

  return (
    <Modal show={show} onHide={turnOff}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()} noValidate>
          <Form.Select
            autoFocus
            defaultValue={selectedSchema.title}
            onChange={(e) =>
              setSelectedSchema(
                demoSchemas.find((s) => s.title === e.target.value) ||
                  selectedSchema
              )
            }
          >
            {demoSchemas.map((schema) => (
              <option value={schema.title} key={schema.title}>
                {schema.title}
              </option>
            ))}
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={turnOff}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setMessage(
              deserializeMessageSchema(JSON.parse(selectedSchema.jsonString))
            );
            turnOff();
          }}
        >
          Load
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageLoadModal;
