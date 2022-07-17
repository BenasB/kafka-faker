import { useState } from "react";
import hookHelpers, {
  iterateAllMessageFields,
} from "../components/messageForm/hookHelpers";
import {
  Message,
  messageDataFieldTypes,
  MessageDataField,
  MessageDataFieldGeneration,
  ValidatedInput,
} from "../components/messageForm/messageTypes";
import generationFunctions, {
  GenerationFunction,
  messageDataFieldGenerationTypes,
} from "../data/generationFunctions";
import validationFunctions from "../data/validationFunctions";

// The hook returns this interface
// Necessary functions and data to manage the message form
export interface MessageFormManagement {
  message: Message;
  addMessageDataField: () => void;
  updateTopic: (newTopic: string) => void;
  updateKey: (newKey: string) => void;
  toggleAutoGeneration: () => void;
  updateMessageDataName: (
    newName: string,
    messageDataFieldIndices: number[]
  ) => void;
  updateMessageDataCustomValue: (
    newValue: string,
    messageDataFieldIndices: number[]
  ) => void;
  updateMessageDataArrayCount: (
    newCount: number,
    messageDataFieldIndices: number[]
  ) => void;
  updateMessageDataType: (
    newType:
      | typeof messageDataFieldTypes[number]
      | typeof messageDataFieldGenerationTypes[number],
    messageDataFieldIndices: number[]
  ) => void;
  addMessageDataNestedField: (messageDataFieldIndices: number[]) => void;
  removeMessageDataField: (messageDataFieldIndices: number[]) => void;
  removeAllMessageDataFields: () => void;
  regenerateMessageDataFieldGeneration: (
    messageDataFieldIndices: number[]
  ) => void;
  regenerateAllMessageDataFields: () => void;
  checkValidation: () => boolean;
}

const useMessageForm: () => MessageFormManagement = () => {
  const [message, setMessage] = useState<Message>({
    topic: {
      value: "",
      validate: validationFunctions.topicValidation,
    },
    autoGeneration: false,
    key: "",
    data: [],
  });

  const { updateMessageDataField, updateAllMessageFields } =
    hookHelpers(setMessage);

  const getNewDataField = (parentDepth: number): MessageDataField => ({
    name: {
      value: "",
      validate: validationFunctions.nameValidation,
    },
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
      topic: {
        ...prevState.topic,
        value: newTopic,
        errorMessages: prevState.topic.validate(newTopic),
      },
    }));
  };

  const updateKey = (newKey: string) => {
    setMessage((prevState) => ({
      ...prevState,
      key: newKey,
    }));
  };

  const toggleAutoGeneration = () => {
    setMessage((prevState) => ({
      ...prevState,
      autoGeneration: !prevState.autoGeneration,
    }));
  };

  const updateMessageDataName = (
    newName: string,
    messageDataFieldIndices: number[]
  ) =>
    updateMessageDataField(messageDataFieldIndices, (fieldData) => ({
      ...fieldData,
      name: {
        ...fieldData.name,
        value: newName,
        errorMessages: fieldData.name.validate(newName),
      },
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

  const updateMessageDataArrayCount = (
    newCount: number,
    messageDataFieldIndices: number[]
  ) =>
    updateMessageDataField(messageDataFieldIndices, (fieldData) => {
      if (fieldData.valueType !== "array") return fieldData;

      return {
        ...fieldData,
        count: newCount,
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

          case "array":
            return {
              ...fieldData,
              valueType: newType,
              count: 1,
              value: [
                {
                  ...getNewDataField(fieldData.depth - 1),
                  name: {
                    value: fieldData.name.value,
                    validate: () => undefined,
                  },
                },
              ],
            };

          default:
            return {
              ...fieldData,
              valueType: "custom",
              value: "",
            };
        }
      }

      return fieldData;
    });
  };

  // Adds a new message data field to an already existing message data field (object or array)
  const addMessageDataNestedField = (messageDataFieldIndices: number[]) =>
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

  // Revalidates all form components and returns true if no errors found
  const checkValidation = () => {
    let isValid = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateValidation = (property: ValidatedInput<any>) => ({
      ...property,
      errorMessages: property.validate(property.value),
    });

    const findAnyErrors = (fieldData: MessageDataField): boolean => {
      switch (fieldData.valueType) {
        case "array":
        case "object":
          return (
            !!updateValidation(fieldData.name).errorMessages ||
            fieldData.value.some(findAnyErrors)
          );

        default:
          return !!updateValidation(fieldData.name).errorMessages;
      }
    };

    // Check if valid in current state
    if (updateValidation(message.topic).errorMessages) isValid = false;
    if (message.data.some(findAnyErrors)) isValid = false;

    // Update validation for all
    setMessage((prevState) => ({
      ...prevState,
      topic: updateValidation(prevState.topic),
      data: iterateAllMessageFields(message.data, (fieldData) => {
        switch (fieldData.valueType) {
          // If there are ValidatedInput<T> on other MessageDataField types
          // besides the basic MessageDataFieldCommon, write cases here and
          // update their validation.
          default:
            return {
              ...fieldData,
              name: updateValidation(fieldData.name),
            };
        }
      }),
    }));

    return isValid;
  };

  return {
    message,
    addMessageDataField,
    updateTopic,
    updateKey,
    toggleAutoGeneration,
    updateMessageDataName,
    updateMessageDataCustomValue,
    updateMessageDataArrayCount,
    updateMessageDataType,
    addMessageDataNestedField,
    removeMessageDataField,
    regenerateMessageDataFieldGeneration,
    regenerateAllMessageDataFields,
    removeAllMessageDataFields,
    checkValidation,
  };
};

export default useMessageForm;
