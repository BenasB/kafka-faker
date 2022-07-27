import {
  Message,
  MessageDataFieldCommon,
  MessageDataFieldCustom,
  MessageDataFieldGeneration,
} from "../components/messageForm/messageTypes";
import generationFunctions from "../data/generationFunctions";
import validationFunctions from "../data/validationFunctions";
import deserializeMessageSave from "./deserializeMessageSave";
import serializeMessageSave from "./serializeMessageSave";

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

const genericGenerationDataField: MessageDataFieldGeneration = {
  valueType: "generation",
  generationType: "date",
  generate: generationFunctions.date,
  value: generationFunctions.date(),
};

const genericCustomDataField: MessageDataFieldCustom = {
  valueType: "custom",
  value: "Hello World!",
};

test("Empty data", () => {
  const messageToSave: Message = genericMessageWithNoData;

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
});

test("One data field", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [{ ...genericCommonDataField, ...genericCustomDataField }],
  };

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
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

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
});

test("Generation data field", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [
      {
        ...genericCommonDataField,
        ...genericGenerationDataField,
      },
    ],
  };

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
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

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
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

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
});

test("Object data field no children", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [
      {
        ...genericCommonDataField,
        valueType: "object",
        value: [],
      },
    ],
  };

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
});

test("Object data field single child", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [
      {
        ...genericCommonDataField,
        valueType: "object",
        value: [
          { ...genericCommonDataField, ...genericCustomDataField, depth: 1 },
        ],
      },
    ],
  };

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
});

test("Object data field multiple children", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [
      {
        ...genericCommonDataField,
        valueType: "object",
        value: [
          { ...genericCommonDataField, ...genericCustomDataField, depth: 1 },
          {
            ...genericCommonDataField,
            ...genericGenerationDataField,
            depth: 1,
          },
          { ...genericCommonDataField, ...genericCustomDataField, depth: 1 },
        ],
      },
    ],
  };

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
});

test("Array data field with object inside", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [
      {
        ...genericCommonDataField,
        valueType: "array",
        value: {
          valueType: "object",
          value: [
            { ...genericCommonDataField, ...genericCustomDataField, depth: 1 },
            {
              ...genericCommonDataField,
              ...genericGenerationDataField,
              depth: 1,
            },
            { ...genericCommonDataField, ...genericCustomDataField, depth: 1 },
          ],
        },
        count: 5,
      },
    ],
  };

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
});

test("Array data field with object inside with array inside", () => {
  const messageToSave: Message = {
    ...genericMessageWithNoData,
    data: [
      {
        ...genericCommonDataField,
        valueType: "array",
        value: {
          valueType: "object",
          value: [
            {
              ...genericCommonDataField,
              ...genericGenerationDataField,
              depth: 1,
            },
            {
              ...genericCommonDataField,
              valueType: "array",
              value: genericGenerationDataField,
              count: 5,
              depth: 1,
            },
            { ...genericCommonDataField, ...genericCustomDataField, depth: 1 },
          ],
        },
        count: 5,
      },
    ],
  };

  expect(
    deserializeMessageSave(serializeMessageSave(messageToSave))
  ).toStrictEqual(messageToSave);
});

export {};
