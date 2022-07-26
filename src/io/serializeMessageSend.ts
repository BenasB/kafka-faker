import {
  Message,
  MessageDataField,
  MessageDataFieldSpecific,
} from "../components/messageForm/messageTypes";

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
  const reduceSpecificField = (
    result: Record<string, SerializedSendMessageValue>,
    specificField: MessageDataFieldSpecific,
    name: string
  ): Record<string, SerializedSendMessageValue> => {
    switch (specificField.valueType) {
      case "generation":
        result[name] = message.autoGeneration
          ? specificField.generate()
          : specificField.value;
        return result;

      case "object":
        result[name] = specificField.value.reduce<
          Record<string, SerializedSendMessageValue>
        >(reduceField, {});
        return result;

      case "array":
        result[name] = Array.from(
          { length: specificField.count },
          () => reduceSpecificField({}, specificField.value, name)[name]
        );
        return result;

      case "custom":
      default:
        result[name] = specificField.value;
        return result;
    }
  };
  const reduceField = (
    result: Record<string, SerializedSendMessageValue>,
    field: MessageDataField
  ): Record<string, SerializedSendMessageValue> => {
    return reduceSpecificField(result, field, field.name.value);
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
