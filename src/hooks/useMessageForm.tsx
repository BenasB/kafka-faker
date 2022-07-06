import { useState } from "react";
import {
  Message,
  MessageDataField,
  messageDataFieldTypes,
} from "../components/messageForm/MessageForm";

export interface MessageFormManagement {
  message: Message;
  addMessageDataField: () => void;
  updateTopic: (newTopic: string) => void;
  updateMessageDataKey: (
    newKey: string,
    messageDataFieldIndices: number[]
  ) => void;
  updateMessageDataCustomValue: (
    newValue: string,
    messageDataFieldIndices: number[]
  ) => void;
  updateMessageDataType: (
    newType: typeof messageDataFieldTypes[number],
    messageDataFieldIndices: number[]
  ) => void;
  addMessageDataObjectField: (messageDataFieldIndices: number[]) => void;
}

const useMessageForm: () => MessageFormManagement = () => {
  const [message, setMessage] = useState<Message>({
    topic: "",
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

  // Helper used to iterate recursively through the object, find and update a field
  const findAndUpdateField = (
    dataFields: MessageDataField[],
    indices: number[],
    fieldUpdate: (fieldData: MessageDataField) => MessageDataField,
    indexCount = 1
  ): MessageDataField[] => {
    return dataFields.map<MessageDataField>((dataField, i) => {
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
    });
  };

  const updateMessageDataKey = (
    newKey: string,
    messageDataFieldIndices: number[]
  ) => {
    setMessage((prevState) => ({
      ...prevState,
      data: findAndUpdateField(
        prevState.data,
        messageDataFieldIndices,
        (fieldData) => ({
          ...fieldData,
          key: newKey,
        })
      ),
    }));
  };

  const updateMessageDataCustomValue = (
    newValue: string,
    messageDataFieldIndices: number[]
  ) => {
    setMessage((prevState) => ({
      ...prevState,
      data: findAndUpdateField(
        prevState.data,
        messageDataFieldIndices,
        (fieldData) => {
          if (fieldData.valueType !== "custom") return fieldData;

          return {
            ...fieldData,
            value: newValue,
          };
        }
      ),
    }));
  };

  const updateMessageDataType = (
    newType: typeof messageDataFieldTypes[number],
    messageDataFieldIndices: number[]
  ) => {
    setMessage((prevState) => ({
      ...prevState,
      data: findAndUpdateField(
        prevState.data,
        messageDataFieldIndices,
        (fieldData) => {
          switch (newType) {
            case "object":
              return {
                ...fieldData,
                valueType: newType,
                value: [],
              };

            case "custom":
            default:
              return {
                ...fieldData,
                valueType: newType,
                value: "",
              };
          }
        }
      ),
    }));
  };

  const addMessageDataObjectField = (messageDataFieldIndices: number[]) => {
    setMessage((prevState) => ({
      ...prevState,
      data: findAndUpdateField(
        prevState.data,
        messageDataFieldIndices,
        (fieldData) => {
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
        }
      ),
    }));
  };

  return {
    message,
    addMessageDataField,
    updateTopic,
    updateMessageDataKey,
    updateMessageDataCustomValue,
    updateMessageDataType,
    addMessageDataObjectField,
  };
};

export default useMessageForm;
