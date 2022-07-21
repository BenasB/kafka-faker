import { Message, MessageDataField } from "./messageTypes";

export interface SerializedSendMessage {
  topic: string;
  key?: string;
  timeStamp: Date;
  jsonString: string;
  jsonStringPretty: string;
}

type SerializedSendMessageValue =
  | string
  | object
  | SerializedSendMessageValue[];

// Converts data from message form to a json string for sending to kafka
const serializeMessageSend = (message: Message): SerializedSendMessage => {
  const reduceField = (
    result: Record<string, SerializedSendMessageValue>,
    field: MessageDataField
  ): Record<string, SerializedSendMessageValue> => {
    switch (field.valueType) {
      case "generation":
        result[field.name.value] = message.autoGeneration
          ? field.generate()
          : field.value;
        return result;

      case "object":
        result[field.name.value] = field.value.reduce<
          Record<string, SerializedSendMessageValue>
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
    Record<string, SerializedSendMessageValue>
  >(reduceField, {});

  return {
    topic: message.topic.value,
    key: message.key,
    timeStamp: new Date(),
    jsonString: JSON.stringify(dataObject),
    jsonStringPretty: JSON.stringify(dataObject, null, 2),
  };
};

export default serializeMessageSend;
