import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Button,
  Dropdown,
  DropdownButton,
  InputGroup,
} from "react-bootstrap";
import validationFunctions from "../../data/validationFunctions";
import serializeMessageSchema from "../../io/serializeMessageSchema";
import { ValidatedInput } from "../messageForm/messageTypes";
import ValidationErrorMessage from "../messageForm/ValidationErrorMessage";
import demoSchemas from "../../data/demoSchemas";
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
  const [schemaTitle, setSchemaTitle] = useState<ValidatedInput<string>>({
    value: "",
    validate: validationFunctions.schemaTitleValidation,
  });

  useEffect(() => {
    setSchemaTitle((prevState) => ({
      ...prevState,
      value: "",
      errorMessages: undefined,
    }));
  }, [show]);

  return (
    <Modal show={show} onHide={turnOff}>
      <Modal.Header closeButton>
        <Modal.Title>Save message schema</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()} noValidate>
          <InputGroup className="mb-3" hasValidation>
            <Form.Control
              value={schemaTitle.value}
              onChange={(e) =>
                setSchemaTitle((prevState) => ({
                  ...prevState,
                  value: e.target.value,
                  errorMessages: prevState.validate(e.target.value),
                }))
              }
              placeholder={"Title"}
              isInvalid={!!schemaTitle.errorMessages}
            />
            <DropdownButton variant="outline-secondary" title="" align="end">
              {demoSchemas.map((existingSchema) => (
                <Dropdown.Item
                  key={existingSchema.title}
                  onClick={() =>
                    setSchemaTitle((prevState) => ({
                      ...prevState,
                      value: existingSchema.title,
                      errorMessages: prevState.validate(existingSchema.title),
                    }))
                  }
                >
                  {existingSchema.title}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <ValidationErrorMessage {...schemaTitle} />
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
            if (schemaTitle.validate(schemaTitle.value)) {
              setSchemaTitle((prevState) => ({
                ...prevState,
                errorMessages: prevState.validate(prevState.value),
              }));
              return;
            }

            console.log(
              `Saving '${schemaTitle}' schema:`,
              JSON.stringify(serializeMessageSchema(message))
            );

            const existingSchema = demoSchemas.find(
              (s) => s.title === schemaTitle.value
            );

            if (existingSchema) {
              existingSchema.jsonString = JSON.stringify(
                serializeMessageSchema(message)
              );
            } else {
              demoSchemas.push({
                title: schemaTitle.value,
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
