import { useState } from "react";
import hookHelpers from "../components/messageForm/hookHelpers";
import {
  Message,
  messageDataFieldTypes,
  MessageDataField,
  MessageDataFieldGeneration,
} from "../components/messageForm/messageTypes";
import generationFunctions, {
  GenerationFunction,
  messageDataFieldGenerationTypes,
} from "../data/generationFunctions";

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

  const { updateMessageDataField, updateAllMessageFields } =
    hookHelpers(setMessage);

  const getNewDataField = (parentDepth: number): MessageDataField => ({
    key: "",
    valueType: "custom",
    value: "",
    depth: parentDepth + 1,
  });

  // Adds a new message data field to the first/main parent element
  const addMessageDataField = () => {
    setMessage((prevState) => ({
      ...prevState,
      data: [...prevState.data, getNewDataField(-1)],
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
      generationFunction: GenerationFunction
    ): MessageDataFieldGeneration => ({
      ...fieldData,
      valueType: "generation",
      generationType:
        messageDataFieldGenerationTypes.find((t) => t === newType) ||
        messageDataFieldGenerationTypes[0],
      generate: generationFunction.function,
      value: generationFunction.function(),
    });

    updateMessageDataField(messageDataFieldIndices, (fieldData) => {
      if (messageDataFieldGenerationTypes.find((t) => t === newType)) {
        return generationField(
          fieldData,
          generationFunctions.find((t) => t.type === newType) ||
            generationFunctions[0]
        );
      } else if (messageDataFieldTypes.find((t) => t === newType)) {
        switch (newType) {
          case "object":
            return {
              ...fieldData,
              valueType: newType,
              value: [],
            };

          case "custom":
            return {
              ...fieldData,
              valueType: newType,
              value: "",
            };
        }
      }

      return fieldData;
    });
  };

  // Adds a new message data field to an already existing message data field of type object
  const addMessageDataObjectField = (messageDataFieldIndices: number[]) =>
    updateMessageDataField(messageDataFieldIndices, (fieldData) => {
      if (fieldData.valueType !== "object") return fieldData;

      return {
        ...fieldData,
        value: [...fieldData.value, getNewDataField(fieldData.depth)],
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
