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
  fieldCommonUpdate: (
    fieldData: MessageDataFieldCommon
  ) => MessageDataFieldCommon,
  fieldSpecificUpdate: (
    fieldData: MessageDataFieldSpecific
  ) => MessageDataFieldSpecific,
  indexCount = 1
): MessageDataField[] => {
  const mapSpecificField = (
    specificDataField: MessageDataFieldSpecific,
    i: number,
    indexCount: number
  ): MessageDataFieldSpecific => {
    if (indexCount !== indices.length && i === indices[indexCount - 1]) {
      if (specificDataField.valueType === "object")
        return {
          ...specificDataField,
          value: specificDataField.value
            .map<MessageDataField>((nestedField, i) =>
              mapField(nestedField, i, indexCount + 1)
            )
            .filter((d) => !d.toDelete),
        };

      if (specificDataField.valueType === "array")
        return {
          ...specificDataField,
          value: mapSpecificField(specificDataField.value, 0, indexCount + 1),
        };
    }

    if (indexCount === indices.length && i === indices[indexCount - 1])
      return fieldSpecificUpdate(specificDataField);

    return specificDataField;
  };

  const mapField = (
    dataField: MessageDataField,
    i: number,
    indexCount: number
  ): MessageDataField => {
    if (indexCount !== indices.length && i === indices[indexCount - 1]) {
      return { ...dataField, ...mapSpecificField(dataField, i, indexCount) };
    }

    if (indexCount === indices.length && i === indices[indexCount - 1]) {
      const afterCommonUpdate = {
        ...dataField,
        ...fieldCommonUpdate(dataField),
      };

      return {
        ...afterCommonUpdate,
        ...fieldSpecificUpdate(afterCommonUpdate),
      };
    }

    return dataField;
  };

  return dataFields
    .map<MessageDataField>((dataField, i) => mapField(dataField, i, indexCount))
    .filter((d) => !d.toDelete);
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
    fieldCommonUpdate: (
      fieldData: MessageDataFieldCommon
    ) => MessageDataFieldCommon,
    fieldSpecificUpdate: (
      fieldData: MessageDataFieldSpecific
    ) => MessageDataFieldSpecific
  ): void => {
    setMessage((prevState) => ({
      ...prevState,
      data: findAndUpdateField(
        prevState.data,
        indices,
        fieldCommonUpdate,
        fieldSpecificUpdate
      ),
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
