import React from "react";
import { Card } from "react-bootstrap";
import { messageDataFieldGenerationTypes } from "../../data/generationFunctions";
import { messageDataFieldTypes } from "../messageForm/messageTypes";

interface Props {
  indices: number[];
  updateMessageDataType: (
    newType:
      | typeof messageDataFieldTypes[number]
      | typeof messageDataFieldGenerationTypes[number],
    messageDataFieldIndices: number[]
  ) => void;
  turnOff: () => void;
  type:
    | typeof messageDataFieldTypes[number]
    | typeof messageDataFieldGenerationTypes[number];
  displayName: string;
  description: React.ReactNode;
  active: boolean;
}

const GenerationTypeSelectionCard: React.FC<Props> = ({
  indices,
  updateMessageDataType,
  turnOff,
  type,
  displayName,
  description,
  active,
}) => {
  return (
    <Card
      role="button"
      style={{ width: "16rem" }}
      onClick={() => {
        updateMessageDataType(type, indices);
        turnOff();
      }}
      bg={active ? "light" : ""}
    >
      <Card.Body>
        <Card.Title>{displayName}</Card.Title>
        <Card.Text className={"text-muted"}>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GenerationTypeSelectionCard;
