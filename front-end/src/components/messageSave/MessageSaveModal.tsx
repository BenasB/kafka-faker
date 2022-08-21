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
import backEndClient, { BackEndSchemaModel } from "../../io/backEndClient";

interface Props {
  show: boolean;
  turnOff: () => void;
}

const MessageSaveModal: React.FC<Props & MessageSaveProps> = ({
  show,
  turnOff,
  message,
}) => {
  const backEnd = backEndClient;

  const [schemaList, setSchemaList] = useState<BackEndSchemaModel[]>([]);
  const [schemaTitle, setSchemaTitle] = useState<ValidatedInput<string>>({
    value: "",
    validate: validationFunctions.schemaTitleValidation,
  });

  const refreshSchemas = () => {
    // In demo use demoSchemas
    if (!process.env.REACT_APP_BACK_END_URL) {
      setSchemaList(demoSchemas);
      return;
    }

    refreshSchemasFromBackEnd().catch(() => {
      setSchemaList([]);
    });
  };

  const refreshSchemasFromBackEnd = async () => {
    const allSchemasResponse = await backEnd.getAllSchemas();
    setSchemaList(allSchemasResponse.data);
  };

  useEffect(refreshSchemas, [show]);

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
            {schemaList.length > 0 && (
              <DropdownButton variant="outline-secondary" title="" align="end">
                {schemaList.map((existingSchema) => (
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
            )}
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
          onClick={async () => {
            if (schemaTitle.validate(schemaTitle.value)) {
              setSchemaTitle((prevState) => ({
                ...prevState,
                errorMessages: prevState.validate(prevState.value),
              }));
              return;
            }

            const backEndSchemaModel: BackEndSchemaModel = {
              title: schemaTitle.value,
              jsonString: JSON.stringify(
                serializeMessageSchema(message)
              ).escapeSpecialCharacters(),
            };

            // In demo use demoSchemas
            if (!process.env.REACT_APP_BACK_END_URL) {
              const existingSchema = demoSchemas.find(
                (s) => s.title === backEndSchemaModel.title
              );

              if (existingSchema)
                existingSchema.jsonString = backEndSchemaModel.jsonString;
              else demoSchemas.push(backEndSchemaModel);
            } else {
              await backEnd.upsertSchema(backEndSchemaModel);
            }

            turnOff();
          }}
        >
          {schemaList.find((s) => s.title === schemaTitle.value)
            ? "Update"
            : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageSaveModal;
