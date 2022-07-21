import generationFunctions from "../../data/generationFunctions";
import validationFunctions from "../../data/validationFunctions";
import {
  Message,
  MessageDataField,
  MessageDataFieldArray,
  MessageDataFieldCustom,
  MessageDataFieldGeneration,
  MessageDataFieldObject,
} from "./messageTypes";
import {
  SaveMessageDataField,
  SaveMessageDataFieldArray,
  SaveMessageDataFieldCustom,
  SaveMessageDataFieldGeneration,
  SaveMessageDataFieldObject,
  SerializedSaveMessage,
} from "./serializeMessageSave";

// Converts data from a message save to message form state
// Reverses the changes made to the message form state by serializeMessageSave function
const deserializeMessageSave = (
  messageSave: SerializedSaveMessage
): Message => {
  const mapField = (
    field: SaveMessageDataField,
    depth: number
  ): MessageDataField => {
    const mapGeneration = (
      field: SaveMessageDataFieldGeneration,
      depth: number
    ): MessageDataFieldGeneration => {
      let generationFunction = generationFunctions.find(
        (t) => t.type === field.generationType
      )?.function;
      if (!generationFunction) {
        const functionReplacement = generationFunctions[0];
        generationFunction = functionReplacement.function;
        console.error(
          `Could not locate a generation function of type ${field.generationType}.
           Replacing that function by the default generation type ${functionReplacement.type}`
        );
      }

      return {
        valueType: "generation",
        depth,
        name: {
          value: field.name,
          validate: validationFunctions.nameValidation,
        },
        generate: generationFunction,
        generationType: field.generationType,
        value: field.value,
      };
    };

    const mapCustom = (
      field: SaveMessageDataFieldCustom,
      depth: number
    ): MessageDataFieldCustom => ({
      valueType: "custom",
      depth,
      name: {
        value: field.name,
        validate: validationFunctions.nameValidation,
      },
      value: field.value,
    });

    const mapObject = (
      field: SaveMessageDataFieldObject,
      depth: number
    ): MessageDataFieldObject => ({
      valueType: "object",
      depth,
      name: {
        value: field.name,
        validate: validationFunctions.nameValidation,
      },
      value: field.value.map((nestedField) => mapField(nestedField, depth + 1)),
    });

    const mapArray = (
      field: SaveMessageDataFieldArray,
      depth: number
    ): MessageDataFieldArray => ({
      valueType: "array",
      depth,
      name: {
        value: field.name,
        validate: validationFunctions.nameValidation,
      },
      count: field.count,
      value: [mapField(field.value, depth)],
    });

    switch (field.valueType) {
      case "generation":
        return mapGeneration(field, depth);

      case "object":
        return mapObject(field, depth);

      case "custom":
        return mapCustom(field, depth);

      case "array":
        return mapArray(field, depth);
    }
  };

  const data = messageSave.data.map<MessageDataField>((field) =>
    mapField(field, 0)
  );

  return {
    topic: {
      value: messageSave.topic,
      validate: validationFunctions.topicValidation,
    },
    key: messageSave.key,
    autoGeneration: messageSave.autoGeneration,
    data,
  };
};

export default deserializeMessageSave;
