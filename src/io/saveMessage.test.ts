import {
  Message,
  MessageDataFieldCommon,
  MessageDataFieldCustom,
} from "../components/messageForm/messageTypes";
import validationFunctions from "../data/validationFunctions";
import deserializeMessageSave from "./deserializeMessageSave";
import serializeMessageSave, {
  SerializedSaveMessage,
} from "./serializeMessageSave";

const genericMessageWithNoData: Message = {
  topic: {
    value: "Test topic",
    validate: validationFunctions.topicValidation,
  },
  autoGeneration: false,
  key: "Test key that is optional",
  data: [],
};

const genericCommonDataField: MessageDataFieldCommon = {
  name: {
    value: "my field",
    validate: validationFunctions.nameValidation,
  },
  depth: 0,
};

const genericCustomDataField: MessageDataFieldCustom = {
  valueType: "custom",
  value: "Hello World!",
};

test("Empty data", () => {
  const messageToSave: Message = genericMessageWithNoData;

  const serializedMessage: SerializedSaveMessage =
    serializeMessageSave(messageToSave);

  const deserializedMessage: Message =
    deserializeMessageSave(serializedMessage);

  expect(deserializedMessage).toStrictEqual(messageToSave);
});

test("One data field", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [{ ...genericCommonDataField, ...genericCustomDataField }],
  };

  const serializedMessage: SerializedSaveMessage =
    serializeMessageSave(messageToSave);

  const deserializedMessage: Message =
    deserializeMessageSave(serializedMessage);

  expect(deserializedMessage).toStrictEqual(messageToSave);
});

test("Multiple data fields", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [
      { ...genericCommonDataField, ...genericCustomDataField },
      { ...genericCommonDataField, ...genericCustomDataField },
      { ...genericCommonDataField, ...genericCustomDataField },
    ],
  };

  const serializedMessage: SerializedSaveMessage =
    serializeMessageSave(messageToSave);

  const deserializedMessage: Message =
    deserializeMessageSave(serializedMessage);

  expect(deserializedMessage).toStrictEqual(messageToSave);
});

test("Array data field", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [
      {
        ...genericCommonDataField,
        valueType: "array",
        value: genericCustomDataField,
        count: 4,
      },
    ],
  };

  const serializedMessage: SerializedSaveMessage =
    serializeMessageSave(messageToSave);

  const deserializedMessage: Message =
    deserializeMessageSave(serializedMessage);

  expect(deserializedMessage).toStrictEqual(messageToSave);
});

test("Array data field count 0", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [
      {
        ...genericCommonDataField,
        valueType: "array",
        value: genericCustomDataField,
        count: 0,
      },
    ],
  };

  const serializedMessage: SerializedSaveMessage =
    serializeMessageSave(messageToSave);

  const deserializedMessage: Message =
    deserializeMessageSave(serializedMessage);

  expect(deserializedMessage).toStrictEqual(messageToSave);
});

export {};
