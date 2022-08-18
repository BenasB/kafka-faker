import React from "react";
import { Col, Modal, Nav, Row, Stack, Tab } from "react-bootstrap";
import {
  generationGroups,
  messageDataFieldGenerationGroups,
  messageDataFieldGenerationTypes,
} from "../../data/generationFunctions";
import { messageDataFieldTypes } from "../messageForm/messageTypes";
import GenerationTypeSelectionCard from "./GenerationTypeSelectionCard";

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

const MessageDataFieldTypeModal: React.FC<Props> = (props) => {
  const { show, turnOff } = props;

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
                        <GenerationTypeSelectionCard
                          {...props}
                          generationFunction={generationFunction}
                          key={generationFunction.type}
                        />
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
