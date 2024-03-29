import { useState } from "react";
import hookHelpers, {
  iterateAllMessageFields,
} from "../components/messageForm/hookHelpers";
import {
  Message,
  messageDataFieldTypes,
  MessageDataField,
  ValidatedInput,
  MessageDataFieldSpecific,
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
  addMessageDataNestedField: (
    messageDataFieldIndices: number[],
    parentDepth: number
  ) => void;
  removeMessageDataField: (messageDataFieldIndices: number[]) => void;
  removeAllMessageDataFields: () => void;
  regenerateMessageDataFieldGeneration: (
    messageDataFieldIndices: number[]
  ) => void;
  regenerateAllMessageDataFields: () => void;
  checkValidation: () => boolean;

  // Only use for message schema io
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
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
      generationType: typeof messageDataFieldGenerationTypes[number]
    ): MessageDataField => {
      const generationFunction: GenerationFunction =
        generationFunctions.find((f) => f.type === generationType) ||
        generationFunctions[0];

      return {
        ...fieldData,
        valueType: "generation",
        generationType,
        generate: generationFunction.function,
        value: generationFunction.function(),
        displayName: generationFunction.displayName,
        generationGroup: generationFunction.group,
      };
    };

    updateMessageDataField(messageDataFieldIndices, (fieldData) => {
      if (messageDataFieldGenerationTypes.find((t) => t === newType)) {
        return generationField(
          fieldData,
          messageDataFieldGenerationTypes.find((t) => t === newType) ||
            messageDataFieldGenerationTypes[0]
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
              value: {
                valueType: "custom",
                value: "",
              },
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

  // Adds a new message data field to an already existing message data field
  const addMessageDataNestedField = (
    messageDataFieldIndices: number[],
    parentDepth: number
  ) =>
    updateMessageDataField(messageDataFieldIndices, (fieldData) => {
      if (fieldData.valueType !== "object") return fieldData;

      return {
        ...fieldData,
        value: [...fieldData.value, getNewDataField(parentDepth)],
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
    updateAllMessageFields(
      (fieldData) => fieldData,
      (fieldData) => {
        if (fieldData.valueType !== "generation") return fieldData;

        return {
          ...fieldData,
          value: fieldData.generate(),
        };
      }
    );

  // Revalidates all form components and returns true if no errors found
  const checkValidation = () => {
    let isValid = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateValidation = (property: ValidatedInput<any>) => ({
      ...property,
      errorMessages: property.validate(property.value),
    });

    const findAnyErrorInSpecific = (
      fieldData: MessageDataFieldSpecific
    ): boolean => {
      switch (fieldData.valueType) {
        case "array":
          return findAnyErrorInSpecific(fieldData.value);

        case "object":
          return fieldData.value.some(findAnyErrorsInCommon);

        // If there are field specific validated values, add cases here

        default:
          return false;
      }
    };

    const findAnyErrorsInCommon = (fieldData: MessageDataField): boolean => {
      return (
        !!updateValidation(fieldData.name).errorMessages ||
        findAnyErrorInSpecific(fieldData)
      );
    };

    // Check if valid in current state
    if (updateValidation(message.topic).errorMessages) isValid = false;
    if (message.data.some(findAnyErrorsInCommon)) isValid = false;

    // Update validation for all
    setMessage((prevState) => ({
      ...prevState,
      topic: updateValidation(prevState.topic),
      data: iterateAllMessageFields(
        message.data,
        (fieldData) => ({
          ...fieldData,
          name: updateValidation(fieldData.name),
        }),
        (fieldData) => fieldData
      ),
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
    setMessage,
  };
};

export default useMessageForm;
