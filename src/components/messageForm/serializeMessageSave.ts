/* eslint-disable no-case-declarations */
import {
  Message,
  MessageDataField,
  MessageDataFieldArray,
  MessageDataFieldCustom,
  MessageDataFieldGeneration,
  MessageDataFieldObject,
} from "./messageTypes";

// Recreate message types but with only the properties that need to be saved
// (only the properties that are used to recreate state)
type SaveMessageDataFieldCommon = {
  name: string;
};

export type SaveMessageDataFieldCustom = SaveMessageDataFieldCommon &
  Pick<MessageDataFieldCustom, "value" | "valueType">;

export type SaveMessageDataFieldObject = SaveMessageDataFieldCommon &
  Pick<MessageDataFieldObject, "valueType"> & {
    value: SaveMessageDataField[];
  };

export type SaveMessageDataFieldArray = SaveMessageDataFieldCommon &
  Pick<MessageDataFieldArray, "count" | "valueType"> & {
    value: SaveMessageDataField;
  };

export type SaveMessageDataFieldGeneration = SaveMessageDataFieldCommon &
  Pick<MessageDataFieldGeneration, "generationType" | "value" | "valueType">;

export type SaveMessageDataField =
  | SaveMessageDataFieldCustom
  | SaveMessageDataFieldObject
  | SaveMessageDataFieldArray
  | SaveMessageDataFieldGeneration;

export type SerializedSaveMessage = Pick<Message, "key" | "autoGeneration"> & {
  topic: string;
  data: SaveMessageDataField[];
};

// Converts data from message form to an object used to recreate message form state
const serializeMessageSave = (message: Message): SerializedSaveMessage => {
  const mapField = (field: MessageDataField): SaveMessageDataField => {
    const mapGeneration = (
      field: MessageDataFieldGeneration
    ): SaveMessageDataFieldGeneration => ({
      name: field.name.value,
      valueType: field.valueType,
      generationType: field.generationType,
      value: field.value,
    });

    const mapCustom = (
      field: MessageDataFieldCustom
    ): SaveMessageDataFieldCustom => ({
      name: field.name.value,
      valueType: field.valueType,
      value: field.value,
    });

    const mapObject = (
      field: MessageDataFieldObject
    ): SaveMessageDataFieldObject => ({
      name: field.name.value,
      valueType: field.valueType,
      value: field.value.map(mapField),
    });

    const mapArray = (
      field: MessageDataFieldArray
    ): SaveMessageDataFieldArray => ({
      name: field.name.value,
      valueType: field.valueType,
      count: field.count,
      value: field.value.map(mapField)[0],
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

  const data = message.data.map<SaveMessageDataField>(mapField);

  return {
    topic: message.topic.value,
    key: message.key,
    autoGeneration: message.autoGeneration,
    data,
  };
};

export default serializeMessageSave;
