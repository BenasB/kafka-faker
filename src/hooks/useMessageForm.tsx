import { useState } from "react";

export const messageDataFieldTypes = ["custom", "object"] as const;

export const messageDataFieldGenerationTypes = [
  "name",
  "date",
  "location",
] as const;

// Common shared properties between all message data field types
type MessageDataFieldCommon = {
  key: string;
  depth: number;
  toDelete?: boolean;
};

type MessageDataFieldCustom = MessageDataFieldCommon & {
  valueType: typeof messageDataFieldTypes[0];
  value: string;
};

type MessageDataFieldObject = MessageDataFieldCommon & {
  valueType: typeof messageDataFieldTypes[1];
  value: MessageDataField[];
};

type MessageDataFieldGeneration = MessageDataFieldCommon & {
  valueType: "generation";
  generationType: typeof messageDataFieldGenerationTypes[number];
  generate: () => string;
  value: string;
};

export type MessageDataField =
  | MessageDataFieldCustom
  | MessageDataFieldObject
  | MessageDataFieldGeneration;

// State interface
export interface Message {
  topic: string;
  autoGeneration: boolean;
  data: MessageDataField[];
}

// The hook returns this interface
// Necessary functions and data to manage the message form
export interface MessageFormManagement {
  message: Message;
  addMessageDataField: () => void;
  updateTopic: (newTopic: string) => void;
  toggleAutoGeneration: () => void;
  updateMessageDataKey: (
    newKey: string,
    messageDataFieldIndices: number[]
  ) => void;
  updateMessageDataCustomValue: (
    newValue: string,
    messageDataFieldIndices: number[]
  ) => void;
  updateMessageDataType: (
    newType:
      | typeof messageDataFieldTypes[number]
      | typeof messageDataFieldGenerationTypes[number],
    messageDataFieldIndices: number[]
  ) => void;
  addMessageDataObjectField: (messageDataFieldIndices: number[]) => void;
  removeMessageDataField: (messageDataFieldIndices: number[]) => void;
  removeAllMessageDataFields: () => void;
  regenerateMessageDataFieldGeneration: (
    messageDataFieldIndices: number[]
  ) => void;
  regenerateAllMessageDataFields: () => void;
}

const useMessageForm: () => MessageFormManagement = () => {
  const [message, setMessage] = useState<Message>({
    topic: "",
    autoGeneration: false,
    data: [],
  });

  // Adds a new message data field to the first/main parent element
  const addMessageDataField = () => {
    setMessage((prevState) => ({
      ...prevState,
      data: [
        ...prevState.data,
        {
          key: "",
          valueType: "custom",
          value: "",
          depth: 0,
        },
      ],
    }));
  };

  const updateTopic = (newTopic: string) => {
    setMessage((prevState) => ({
      ...prevState,
      topic: newTopic,
    }));
  };

  const toggleAutoGeneration = () => {
    setMessage((prevState) => ({
      ...prevState,
      autoGeneration: !prevState.autoGeneration,
    }));
  };

  // Helper used to iterate recursively through the message data object, find and update a field
  const findAndUpdateField = (
    dataFields: MessageDataField[],
    indices: number[],
    fieldUpdate: (fieldData: MessageDataField) => MessageDataField,
    indexCount = 1
  ): MessageDataField[] => {
    return dataFields
      .map<MessageDataField>((dataField, i) => {
        if (
          indexCount !== indices.length &&
          i === indices[indexCount - 1] &&
          dataField.valueType === "object"
        )
          return {
            ...dataField,
            value: findAndUpdateField(
              dataField.value,
              indices,
              fieldUpdate,
              indexCount + 1
            ),
          };

        if (indexCount === indices.length && i === indices[indexCount - 1])
          return fieldUpdate(dataField);

        return dataField;
      })
      .filter((d) => !d.toDelete);
  };

  // Reusable function to update a single field
  const updateMessageDataField = (
    indices: number[],
    fieldUpdate: (fieldData: MessageDataField) => MessageDataField
  ): void => {
    setMessage((prevState) => ({
      ...prevState,
      data: findAndUpdateField(prevState.data, indices, fieldUpdate),
    }));
  };

  // Helper to iterate recursively through all of message data fields
  const iterateAllMessageFields = (
    dataFields: MessageDataField[],
    fieldUpdate: (fieldData: MessageDataField) => MessageDataField
  ): MessageDataField[] => {
    return dataFields
      .map<MessageDataField>((dataField) => {
        if (dataField.valueType === "object")
          return {
            ...dataField,
            value: iterateAllMessageFields(dataField.value, fieldUpdate),
          };

        return fieldUpdate(dataField);
      })
      .filter((d) => !d.toDelete);
  };

  // Reusable function to update multiple fields at once
  const updateAllMessageFields = (
    fieldUpdate: (fieldData: MessageDataField) => MessageDataField
  ): void => {
    setMessage((prevState) => ({
      ...prevState,
      data: iterateAllMessageFields(prevState.data, fieldUpdate),
    }));
  };

  const updateMessageDataKey = (
    newKey: string,
    messageDataFieldIndices: number[]
  ) =>
    updateMessageDataField(messageDataFieldIndices, (fieldData) => ({
      ...fieldData,
      key: newKey,
    }));

  const updateMessageDataCustomValue = (
    newValue: string,
    messageDataFieldIndices: number[]
  ) =>
    updateMessageDataField(messageDataFieldIndices, (fieldData) => {
      if (fieldData.valueType !== "custom") return fieldData;

      return {
        ...fieldData,
        value: newValue,
      };
    });

  const updateMessageDataType = (
    newType:
      | typeof messageDataFieldTypes[number]
      | typeof messageDataFieldGenerationTypes[number],
    messageDataFieldIndices: number[]
  ) => {
    const generationField = (
      fieldData: MessageDataField,
      generate: () => string
    ): MessageDataFieldGeneration => ({
      ...fieldData,
      valueType: "generation",
      generationType:
        messageDataFieldGenerationTypes.find((t) => t === newType) ||
        messageDataFieldGenerationTypes[0],
      generate,
      value: generate(),
    });

    updateMessageDataField(messageDataFieldIndices, (fieldData) => {
      switch (newType) {
        case "object":
          return {
            ...fieldData,
            valueType: newType,
            value: [],
          };

        case "name":
          return generationField(
            fieldData,
            () => "Benas" + Math.floor(Math.random() * 100)
          );

        case "date":
          return generationField(
            fieldData,
            () => "Date" + Math.floor(Math.random() * 100)
          );

        case "location":
          return generationField(
            fieldData,
            () => "Location" + Math.floor(Math.random() * 100)
          );

        case "custom":
        default:
          return {
            ...fieldData,
            valueType: newType,
            value: "",
          };
      }
    });
  };

  // Adds a new message data field to an already existing message data field of type object
  const addMessageDataObjectField = (messageDataFieldIndices: number[]) =>
    updateMessageDataField(messageDataFieldIndices, (fieldData) => {
      if (fieldData.valueType !== "object") return fieldData;

      return {
        ...fieldData,
        value: [
          ...fieldData.value,
          {
            key: "",
            valueType: "custom",
            value: "",
            depth: fieldData.depth + 1,
          },
        ],
      };
    });

  const removeMessageDataField = (messageDataFieldIndices: number[]) =>
    updateMessageDataField(messageDataFieldIndices, (fieldData) => ({
      ...fieldData,
      toDelete: true,
    }));

  const removeAllMessageDataFields = () => {
    setMessage((prevState) => ({
      ...prevState,
      data: [],
    }));
  };

  const regenerateMessageDataFieldGeneration = (
    messageDataFieldIndices: number[]
  ) =>
    updateMessageDataField(messageDataFieldIndices, (fieldData) => {
      if (fieldData.valueType !== "generation") return fieldData;

      return {
        ...fieldData,
        value: fieldData.generate(),
      };
    });

  const regenerateAllMessageDataFields = () =>
    updateAllMessageFields((fieldData) => {
      if (fieldData.valueType !== "generation") return fieldData;

      return {
        ...fieldData,
        value: fieldData.generate(),
      };
    });

  return {
    message,
    addMessageDataField,
    updateTopic,
    toggleAutoGeneration,
    updateMessageDataKey,
    updateMessageDataCustomValue,
    updateMessageDataType,
    addMessageDataObjectField,
    removeMessageDataField,
    regenerateMessageDataFieldGeneration,
    regenerateAllMessageDataFields,
    removeAllMessageDataFields,
  };
};

export default useMessageForm;
