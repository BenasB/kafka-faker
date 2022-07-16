import React from "react";
import { MessageDataField, Message } from "./messageTypes";

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

// Helper to iterate recursively through all of message data fields
export const iterateAllMessageFields = (
  dataFields: MessageDataField[],
  fieldUpdate: (fieldData: MessageDataField) => MessageDataField
): MessageDataField[] => {
  return dataFields
    .map<MessageDataField>((dataField) => {
      const updatedField = fieldUpdate(dataField);

      if (
        dataField.valueType === "object" &&
        updatedField.valueType === "object"
      )
        return {
          ...updatedField,
          value: iterateAllMessageFields(dataField.value, fieldUpdate),
        };

      return updatedField;
    })
    .filter((d) => !d.toDelete);
};

const hookHelpers = (
  setMessage: React.Dispatch<React.SetStateAction<Message>>
) => {
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

  // Reusable function to update multiple fields at once
  const updateAllMessageFields = (
    fieldUpdate: (fieldData: MessageDataField) => MessageDataField
  ): void => {
    setMessage((prevState) => ({
      ...prevState,
      data: iterateAllMessageFields(prevState.data, fieldUpdate),
    }));
  };

  return {
    updateMessageDataField,
    updateAllMessageFields,
  };
};

export default hookHelpers;
