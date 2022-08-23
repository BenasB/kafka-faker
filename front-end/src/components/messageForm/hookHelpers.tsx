import React from "react";
import {
  MessageDataField,
  Message,
  MessageDataFieldCommon,
  MessageDataFieldSpecific,
} from "./messageTypes";

// Helper used to iterate recursively through the message data object, find and update a field
const findAndUpdateField = (
  dataFields: MessageDataField[],
  indices: number[],
  fieldUpdate: (fieldData: MessageDataField) => MessageDataField,
  depthIndex = 1
): MessageDataField[] => {
  const sliceIndex = indices[depthIndex - 1];
  const sliceIndexField = dataFields[sliceIndex];
  if (depthIndex !== indices.length) {
    // not yet at item, need to dig deeper
    switch (sliceIndexField.valueType) {
      case "object":
        return [
          ...dataFields.slice(0, sliceIndex),
          {
            ...sliceIndexField,
            value: findAndUpdateField(
              sliceIndexField.value,
              indices,
              fieldUpdate,
              depthIndex + 1
            ),
          },
          ...dataFields.slice(sliceIndex + 1),
        ].filter((d) => !d.toDelete);

      case "array":
        return [
          ...dataFields.slice(0, sliceIndex),
          {
            ...sliceIndexField,
            value: findAndUpdateField(
              // Array values are specific only (not a full field),
              // so add on common properties from the array to its value
              [{ ...sliceIndexField, ...sliceIndexField.value }],
              indices,
              fieldUpdate,
              depthIndex + 1
            )[0],
          },
          ...dataFields.slice(sliceIndex + 1),
        ].filter((d) => !d.toDelete);

      default:
        return [];
    }
  } else {
    // At item
    return [
      ...dataFields.slice(0, sliceIndex),
      fieldUpdate(sliceIndexField),
      ...dataFields.slice(sliceIndex + 1),
    ].filter((d) => !d.toDelete);
  }
};

// Helper to iterate recursively through all of message data fields
export const iterateAllMessageFields = (
  dataFields: MessageDataField[],
  fieldCommonUpdate: (
    fieldData: MessageDataFieldCommon
  ) => MessageDataFieldCommon,
  fieldSpecificUpdate: (
    fieldData: MessageDataFieldSpecific
  ) => MessageDataFieldSpecific
): MessageDataField[] => {
  const mapSpecificField = (
    specificDataField: MessageDataFieldSpecific
  ): MessageDataFieldSpecific => {
    const updatedSpecificDataField = fieldSpecificUpdate(specificDataField);

    if (updatedSpecificDataField.valueType === "object")
      return {
        ...updatedSpecificDataField,
        value: updatedSpecificDataField.value
          .map<MessageDataField>(mapField)
          .filter((d) => !d.toDelete),
      };

    if (updatedSpecificDataField.valueType === "array")
      return {
        ...updatedSpecificDataField,
        value: mapSpecificField(updatedSpecificDataField.value),
      };

    return updatedSpecificDataField;
  };

  const mapField = (dataField: MessageDataField): MessageDataField => {
    const afterCommonUpdate = {
      ...dataField,
      ...fieldCommonUpdate(dataField),
    };

    return {
      ...afterCommonUpdate,
      ...mapSpecificField(afterCommonUpdate),
    };
  };

  return dataFields.map<MessageDataField>(mapField).filter((d) => !d.toDelete);
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
    fieldCommonUpdate: (
      fieldData: MessageDataFieldCommon
    ) => MessageDataFieldCommon,
    fieldSpecificUpdate: (
      fieldData: MessageDataFieldSpecific
    ) => MessageDataFieldSpecific
  ): void => {
    setMessage((prevState) => ({
      ...prevState,
      data: iterateAllMessageFields(
        prevState.data,
        fieldCommonUpdate,
        fieldSpecificUpdate
      ),
    }));
  };

  return {
    updateMessageDataField,
    updateAllMessageFields,
  };
};

export default hookHelpers;
