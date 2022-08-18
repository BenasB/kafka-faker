import React from "react";
import { Card } from "react-bootstrap";
import {
  GenerationFunction,
  messageDataFieldGenerationTypes,
} from "../../data/generationFunctions";
import { messageDataFieldTypes } from "../messageForm/messageTypes";

interface Props {
  indices: number[];
  updateMessageDataType: (
    newType:
      | typeof messageDataFieldTypes[number]
      | typeof messageDataFieldGenerationTypes[number],
    messageDataFieldIndices: number[]
  ) => void;
  generationFunction: GenerationFunction;
  turnOff: () => void;
}

const GenerationTypeSelectionCard: React.FC<Props> = ({
  indices,
  updateMessageDataType,
  generationFunction,
  turnOff,
}) => {
  return (
    <Card
      role="button"
      style={{ width: "18rem" }}
      key={generationFunction.type}
      onClick={() => {
        updateMessageDataType(generationFunction.type, indices);
        turnOff();
      }}
    >
      <Card.Body>
        <Card.Title>{generationFunction.type.toNonCamelCase()}</Card.Title>
        <Card.Text className={"text-muted"}>
          <i className="bi bi-chevron-right"> </i>
          {generationFunction.function()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GenerationTypeSelectionCard;
