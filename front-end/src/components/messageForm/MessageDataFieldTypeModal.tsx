import React from "react";
import { Card, Col, Modal, Nav, Row, Stack, Tab } from "react-bootstrap";
import {
  generationGroups,
  messageDataFieldGenerationGroups,
  messageDataFieldGenerationTypes,
} from "../../data/generationFunctions";
import { messageDataFieldTypes } from "./messageTypes";

interface Props {
  show: boolean;
  turnOff: () => void;
  indices: number[];
  updateMessageDataType: (
    newType:
      | typeof messageDataFieldTypes[number]
      | typeof messageDataFieldGenerationTypes[number],
    messageDataFieldIndices: number[]
  ) => void;
}

const MessageDataFieldTypeModal: React.FC<Props> = ({
  show,
  turnOff,
  indices,
  updateMessageDataType,
}) => {
  return (
    <Modal show={show} onHide={turnOff} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Change data field type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container defaultActiveKey={messageDataFieldGenerationGroups[0]}>
          <Row>
            <Col sm={9}>
              <Tab.Content>
                {generationGroups.map((generationGroup) => (
                  <Tab.Pane
                    eventKey={generationGroup.group}
                    key={generationGroup.group}
                  >
                    <Stack
                      direction="horizontal"
                      gap={3}
                      className={"flex-wrap"}
                    >
                      {generationGroup.functions.map((generationFunction) => (
                        <Card
                          role="button"
                          style={{ width: "18rem" }}
                          key={generationFunction.type}
                          onClick={() => {
                            updateMessageDataType(
                              generationFunction.type,
                              indices
                            );
                            turnOff();
                          }}
                        >
                          <Card.Body>
                            <Card.Title>
                              {generationFunction.type.toNonCamelCase()}
                            </Card.Title>
                            <Card.Text className={"text-muted"}>
                              <i className="bi bi-chevron-right"> </i>
                              {generationFunction.function()}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      ))}
                    </Stack>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
            <Col sm={3}>
              <Nav
                variant="pills"
                className="flex-column flex-nowrap overflow-auto"
                navbarScroll
                style={{ maxHeight: "70vh" }}
              >
                {messageDataFieldGenerationGroups.map((group) => (
                  <Nav.Item key={group} role="button">
                    <Nav.Link eventKey={group}>
                      {group.toFirstUpperCase()}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default MessageDataFieldTypeModal;
