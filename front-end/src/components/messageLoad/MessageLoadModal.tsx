import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import deserializeMessageSchema from "../../io/deserializeMessageSchema";
import { MessageLoadProps } from "./MessageLoad";
import backEndClient, { BackEndSchemaModel } from "../../io/backEndClient";
import demoSchemas from "../../data/demoSchemas";

interface Props {
  show: boolean;
  turnOff: () => void;
}

const MessageLoadModal: React.FC<Props & MessageLoadProps> = ({
  show,
  turnOff,
  setMessage,
}) => {
  const backEnd = backEndClient;
  const [schemaList, setSchemaList] = useState<BackEndSchemaModel[]>([]);

  const [selectedSchema, setSelectedSchema] = useState<
    BackEndSchemaModel | undefined
  >(schemaList[0]);

  const refreshSchemas = () => {
    // In demo use demoSchemas
    if (!process.env.REACT_APP_BACK_END_URL) {
      setSchemaList(demoSchemas);
      setSelectedSchema(demoSchemas[0]);
      return;
    }

    refreshSchemasFromBackEnd().catch(() => {
      setSchemaList([]);
      setSelectedSchema(undefined);
    });
  };

  const refreshSchemasFromBackEnd = async () => {
    const allSchemasResponse = await backEnd.getAllSchemas();
    setSchemaList(allSchemasResponse.data);
    setSelectedSchema(allSchemasResponse.data[0]);
  };

  useEffect(refreshSchemas, [show]);

  return (
    <Modal show={show} onHide={turnOff}>
      <Modal.Header closeButton>
        <Modal.Title>Load message schema</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedSchema && schemaList.length > 0 ? (
          <Form onSubmit={(e) => e.preventDefault()} noValidate>
            <Form.Select
              autoFocus
              defaultValue={selectedSchema.title}
              onChange={(e) =>
                setSelectedSchema(
                  schemaList.find((s) => s.title === e.target.value) ||
                    selectedSchema
                )
              }
            >
              {schemaList.map((schema) => (
                <option value={schema.title} key={schema.title}>
                  {schema.title}
                </option>
              ))}
            </Form.Select>
          </Form>
        ) : (
          <div>No schemas yet!</div>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <div>
          {selectedSchema && (
            <Button
              variant="outline-danger"
              onClick={() => {
                if (!process.env.REACT_APP_BACK_END_URL) {
                  demoSchemas.splice(demoSchemas.indexOf(selectedSchema), 1);
                  refreshSchemas();
                  return;
                }

                backEnd.deleteSchema(selectedSchema.title).then(refreshSchemas);
              }}
            >
              <i className="bi bi-trash"></i>
            </Button>
          )}
        </div>
        <Stack direction="horizontal" gap={2}>
          <Button variant="secondary" onClick={turnOff}>
            Close
          </Button>
          {selectedSchema && (
            <Button
              variant="primary"
              onClick={() => {
                setMessage(
                  deserializeMessageSchema(
                    JSON.parse(selectedSchema.jsonString)
                  )
                );
                turnOff();
              }}
            >
              Load
            </Button>
          )}
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageLoadModal;
