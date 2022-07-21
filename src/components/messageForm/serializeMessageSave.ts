import {
  Message,
  MessageDataField,
  MessageDataFieldArray,
  MessageDataFieldCustom,
  MessageDataFieldGeneration,
  MessageDataFieldObject,
  MessageDataFieldSpecific,
} from "./messageTypes";

// Recreate message types but with only the properties that need to be saved
// (only the properties that are used to recreate state)
type SaveMessageDataFieldCommon = {
  name: string;
};

export type SaveMessageDataFieldCustom = Pick<
  MessageDataFieldCustom,
  "value" | "valueType"
>;

export type SaveMessageDataFieldObject = Pick<
  MessageDataFieldObject,
  "valueType"
> & {
  value: SaveMessageDataField[];
};

export type SaveMessageDataFieldArray = Pick<
  MessageDataFieldArray,
  "count" | "valueType"
> & {
  value: SaveMessageDataFieldSpecific;
};

export type SaveMessageDataFieldGeneration = Pick<
  MessageDataFieldGeneration,
  "generationType" | "value" | "valueType"
>;

export type SaveMessageDataFieldSpecific =
  | SaveMessageDataFieldCustom
  | SaveMessageDataFieldObject
  | SaveMessageDataFieldArray
  | SaveMessageDataFieldGeneration;

export type SaveMessageDataField = SaveMessageDataFieldCommon &
  SaveMessageDataFieldSpecific;

export type SerializedSaveMessage = Pick<Message, "key" | "autoGeneration"> & {
  topic: string;
  data: SaveMessageDataField[];
};

// Converts data from message form to an object used to recreate message form state
const serializeMessageSave = (message: Message): SerializedSaveMessage => {
  const mapSpecificField = (
    field: MessageDataFieldSpecific
  ): SaveMessageDataFieldSpecific => {
    const mapGeneration = (
      field: MessageDataFieldGeneration
    ): SaveMessageDataFieldGeneration => ({
      valueType: field.valueType,
      generationType: field.generationType,
      value: field.value,
    });

    const mapCustom = (
      field: MessageDataFieldCustom
    ): SaveMessageDataFieldCustom => ({
      valueType: field.valueType,
      value: field.value,
    });

    const mapObject = (
      field: MessageDataFieldObject
    ): SaveMessageDataFieldObject => ({
      valueType: field.valueType,
      value: field.value.map(mapField),
    });

    const mapArray = (
      field: MessageDataFieldArray
    ): SaveMessageDataFieldArray => ({
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

  const mapField = (field: MessageDataField): SaveMessageDataField => {
    const common: SaveMessageDataFieldCommon = {
      name: field.name.value,
    };

    return { ...common, ...mapSpecificField(field) };
  };

  const data = message.data.map<SaveMessageDataField>(mapField);

  return {
    topic: message.topic.value,
    key: message.key,
    autoGeneration: message.autoGeneration,
    data,
  };
};

export default serializeMessageSave;
