import React from "react";
import { MessageFormManagement } from "../../hooks/useMessageForm";
import MessageDataRow from "./MessageDataRow";
import { MessageDataField, MessageDataFieldArray } from "./messageTypes";

interface Props {
  dataField: MessageDataField;
  indices: number[];
}

const NestedDataFields: React.FC<Props & MessageFormManagement> = (props) => {
  const { dataField, indices } = props;

  let dataFields: MessageDataField[];
  let updatedIndices: number[];
  if (dataField.valueType === "object") {
    dataFields = dataField.value;
    updatedIndices = indices;
  } else if (dataField.valueType === "array") {
    const findResults = findObjectInArray(dataField);
    if (!findResults) return null;
    dataFields = findResults.dataFields;
    updatedIndices = Array.from(
      { length: indices.length + findResults.depth },
      (_, i) => indices[i] ?? 0
    );
  } else return null;

  return (
    <>
      {dataFields?.map((nestedDataField, nestedIndex) => (
        <MessageDataRow
          {...props}
          dataField={nestedDataField}
          indices={[...updatedIndices, nestedIndex]}
          key={
            updatedIndices.reduce<string>(
              (result, num) => result + num + ",",
              ""
            ) + nestedIndex
          }
        />
      ))}
    </>
  );
};

const findObjectInArray = (
  arrayDataField: MessageDataFieldArray
): { dataFields: MessageDataField[]; depth: number } | null => {
  if (arrayDataField.value.valueType === "array") {
    const results = findObjectInArray(arrayDataField.value);
    if (!results) return null;

    return {
      dataFields: results.dataFields,
      depth: results.depth + 1,
    };
  }
  if (arrayDataField.value.valueType === "object")
    return {
      dataFields: arrayDataField.value.value,
      depth: 1,
    };

  return null;
};

export default NestedDataFields;
