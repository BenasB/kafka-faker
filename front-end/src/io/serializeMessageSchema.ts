import {
  Message,
  MessageDataField,
  MessageDataFieldArray,
  MessageDataFieldCustom,
  MessageDataFieldGeneration,
  MessageDataFieldObject,
  MessageDataFieldSpecific,
} from "../components/messageForm/messageTypes";

// Recreate message types but with only the properties that need to be saved
// (only the properties that are used to recreate state)
type MessageSchemaDataFieldCommon = {
  name: string;
};

export type MessageSchemaDataFieldCustom = Pick<
  MessageDataFieldCustom,
  "value" | "valueType"
>;

export type MessageSchemaDataFieldObject = Pick<
  MessageDataFieldObject,
  "valueType"
> & {
  value: MessageSchemaDataField[];
};

export type MessageSchemaDataFieldArray = Pick<
  MessageDataFieldArray,
  "count" | "valueType"
> & {
  value: MessageSchemaDataFieldSpecific;
};

export type MessageSchemaDataFieldGeneration = Pick<
  MessageDataFieldGeneration,
  "generationType" | "value" | "valueType"
>;

export type MessageSchemaDataFieldSpecific =
  | MessageSchemaDataFieldCustom
  | MessageSchemaDataFieldObject
  | MessageSchemaDataFieldArray
  | MessageSchemaDataFieldGeneration;

export type MessageSchemaDataField = MessageSchemaDataFieldCommon &
  MessageSchemaDataFieldSpecific;

export type MessageSchema = Pick<Message, "key" | "autoGeneration"> & {
  topic: string;
  data: MessageSchemaDataField[];
};

// Converts data from message form to an object used to recreate message form state
const serializeMessageSchema = (message: Message): MessageSchema => {
  const mapSpecificField = (
    field: MessageDataFieldSpecific
  ): MessageSchemaDataFieldSpecific => {
    const mapGeneration = (
      field: MessageDataFieldGeneration
    ): MessageSchemaDataFieldGeneration => ({
      valueType: field.valueType,
      generationType: field.generationType,
      value: field.value,
    });

    const mapCustom = (
      field: MessageDataFieldCustom
    ): MessageSchemaDataFieldCustom => ({
      valueType: field.valueType,
      value: field.value,
    });

    const mapObject = (
      field: MessageDataFieldObject
    ): MessageSchemaDataFieldObject => ({
      valueType: field.valueType,
      value: field.value.map(mapField),
    });

    const mapArray = (
      field: MessageDataFieldArray
    ): MessageSchemaDataFieldArray => ({
      valueType: field.valueType,
      count: field.count,
      value: mapSpecificField(field.value),
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

  const mapField = (field: MessageDataField): MessageSchemaDataField => {
    const common: MessageSchemaDataFieldCommon = {
      name: field.name.value,
    };

    return { ...common, ...mapSpecificField(field) };
  };

  const data = message.data.map<MessageSchemaDataField>(mapField);

  return {
    topic: message.topic.value,
    key: message.key,
    autoGeneration: message.autoGeneration,
    data,
  };
};

export default serializeMessageSchema;
