import generationFunctions, {
  messageDataFieldGenerationTypes,
} from "../data/generationFunctions";
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
  MessageSchemaDataField,
  MessageSchemaDataFieldArray,
  MessageSchemaDataFieldCustom,
  MessageSchemaDataFieldGeneration,
  MessageSchemaDataFieldObject,
  MessageSchemaDataFieldSpecific,
  MessageSchema,
} from "./serializeMessageSchema";

// Converts data from a message save to message form state
// Reverses the changes made to the message form state by serializeMessageSave function
const deserializeMessageSchema = (messageSave: MessageSchema): Message => {
  const mapSpecificField = (
    field: MessageSchemaDataFieldSpecific,
    depth: number
  ): MessageDataFieldSpecific => {
    const mapGeneration = (
      field: MessageSchemaDataFieldGeneration
    ): MessageDataFieldGeneration => {
      const generationType =
        messageDataFieldGenerationTypes.find(
          (t) => t === field.generationType
        ) || messageDataFieldGenerationTypes[0];

      if (generationType !== field.generationType) {
        console.error(
          `Could not locate a generation function of type ${field.generationType}.
               Replacing that function by the default generation type ${generationType}`
        );
      }

      return {
        valueType: "generation",
        generationType,
        generate: generationFunctions[generationType],
        value: field.value,
      };
    };

    const mapCustom = (
      field: MessageSchemaDataFieldCustom
    ): MessageDataFieldCustom => ({
      valueType: "custom",
      value: field.value,
    });

    const mapObject = (
      field: MessageSchemaDataFieldObject
    ): MessageDataFieldObject => ({
      valueType: "object",
      value: field.value.map((nestedField) => mapField(nestedField, depth + 1)),
    });

    const mapArray = (
      field: MessageSchemaDataFieldArray
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
    field: MessageSchemaDataField,
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

export default deserializeMessageSchema;
