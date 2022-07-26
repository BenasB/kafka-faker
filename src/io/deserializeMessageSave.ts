import generationFunctions from "../data/generationFunctions";
import validationFunctions from "../data/validationFunctions";
import {
  Message,
  MessageDataField,
  MessageDataFieldArray,
  MessageDataFieldCommon,
  MessageDataFieldCustom,
  MessageDataFieldGeneration,
  MessageDataFieldObject,
  MessageDataFieldSpecific,
} from "../components/messageForm/messageTypes";
import {
  SaveMessageDataField,
  SaveMessageDataFieldArray,
  SaveMessageDataFieldCustom,
  SaveMessageDataFieldGeneration,
  SaveMessageDataFieldObject,
  SaveMessageDataFieldSpecific,
  SerializedSaveMessage,
} from "./serializeMessageSave";

// Converts data from a message save to message form state
// Reverses the changes made to the message form state by serializeMessageSave function
const deserializeMessageSave = (
  messageSave: SerializedSaveMessage
): Message => {
  const mapSpecificField = (
    field: SaveMessageDataFieldSpecific,
    depth: number
  ): MessageDataFieldSpecific => {
    const mapGeneration = (
      field: SaveMessageDataFieldGeneration
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
        generate: generationFunction,
        generationType: field.generationType,
        value: field.value,
      };
    };

    const mapCustom = (
      field: SaveMessageDataFieldCustom
    ): MessageDataFieldCustom => ({
      valueType: "custom",
      value: field.value,
    });

    const mapObject = (
      field: SaveMessageDataFieldObject
    ): MessageDataFieldObject => ({
      valueType: "object",
      value: field.value.map((nestedField) => mapField(nestedField, depth + 1)),
    });

    const mapArray = (
      field: SaveMessageDataFieldArray
    ): MessageDataFieldArray => ({
      valueType: "array",
      count: field.count,
      value: mapSpecificField(field.value, depth),
    });

    switch (field.valueType) {
      case "generation":
        return mapGeneration(field);

      case "object":
        return mapObject(field);

      case "custom":
        return mapCustom(field);

      case "array":
        return mapArray(field);
    }
  };

  const mapField = (
    field: SaveMessageDataField,
    depth: number
  ): MessageDataField => {
    const common: MessageDataFieldCommon = {
      depth,
      name: {
        value: field.name,
        validate: validationFunctions.nameValidation,
      },
    };

    return { ...common, ...mapSpecificField(field, depth) };
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
