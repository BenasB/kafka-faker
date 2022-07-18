import { Message, MessageDataField } from "./messageTypes";

interface SerializedMessage {
  topic: string;
  key?: string;
  jsonString: string;
}

type SerializedMessageValue = string | object | SerializedMessageValue[];

// Converts data from message form to a json string for sending to kafka
const serializeMessage = (message: Message): SerializedMessage => {
  const reduceField = (
    result: Record<string, SerializedMessageValue>,
    field: MessageDataField
  ): Record<string, SerializedMessageValue> => {
    switch (field.valueType) {
      case "generation":
        result[field.name.value] = message.autoGeneration
          ? field.generate()
          : field.value;
        return result;

      case "object":
        result[field.name.value] = field.value.reduce<
          Record<string, SerializedMessageValue>
        >(reduceField, {});
        return result;

      case "array":
        result[field.name.value] = Array.from(
          { length: field.count },
          () => reduceField({}, field.value[0])[field.value[0].name.value]
        );
        return result;

      case "custom":
      default:
        result[field.name.value] = field.value;
        return result;
    }
  };

  const dataObject = message.data.reduce<
    Record<string, SerializedMessageValue>
  >(reduceField, {});

  return {
    topic: message.topic.value,
    key: message.key,
    jsonString: JSON.stringify(dataObject, null, 2),
  };
};

export default serializeMessage;
