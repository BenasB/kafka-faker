import React from "react";
import { Col, Modal, Nav, Row, Tab } from "react-bootstrap";
import generalMessageDataFieldTypeData from "../../data/generalMessageDataFieldTypeData";
import {
  generationGroups,
  messageDataFieldGenerationGroups,
  messageDataFieldGenerationTypes,
} from "../../data/generationFunctions";
import { messageDataFieldTypes } from "../messageForm/messageTypes";
import GenerationTypeSelectionCard from "./GenerationTypeSelectionCard";
import GenerationTypeSelectionPane from "./GenerationTypeSelectionPane";

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
  const generalGroup = "general";

  return (
    <Modal show={show} onHide={turnOff} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Change data field type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container defaultActiveKey={generalGroup}>
          <Row>
            <Col sm={9}>
              <Tab.Content>
                <GenerationTypeSelectionPane eventKey={generalGroup}>
                  {generalMessageDataFieldTypeData.map(
                    (generalFieldTypeData) => (
                      <GenerationTypeSelectionCard
                        updateMessageDataType={updateMessageDataType}
                        turnOff={turnOff}
                        indices={indices}
                        displayName={generalFieldTypeData.displayName}
                        description={generalFieldTypeData.description}
                        type={generalFieldTypeData.type}
                        key={generalFieldTypeData.type}
                      />
                    )
                  )}
                </GenerationTypeSelectionPane>
                {generationGroups.map((generationGroup) => (
                  <GenerationTypeSelectionPane
                    eventKey={generationGroup.group}
                    key={generationGroup.group}
                  >
                    {generationGroup.functions.map((generationFunction) => (
                      <GenerationTypeSelectionCard
                        updateMessageDataType={updateMessageDataType}
                        turnOff={turnOff}
                        indices={indices}
                        displayName={generationFunction.displayName}
                        description={
                          <>
                            <i className="bi bi-chevron-right"> </i>
                            {generationFunction.function()}
                          </>
                        }
                        type={generationFunction.type}
                        key={generationFunction.type}
                      />
                    ))}
                  </GenerationTypeSelectionPane>
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
                <Nav.Item role="button">
                  <Nav.Link eventKey={generalGroup}>
                    {generalGroup.toFirstUpperCase()}
                  </Nav.Link>
                </Nav.Item>
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
