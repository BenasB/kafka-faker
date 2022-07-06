import { useState } from "react";
import {
  Message,
  messageDataFieldTypes,
} from "../components/messageForm/MessageForm";

export interface MessageFormManagement {
  message: Message;
  addMessageDataField: () => void;
  updateTopic: (newTopic: string) => void;
  updateMessageDataKey: (newKey: string, messageDataFieldIndex: number) => void;
  updateMessageDataCustomValue: (
    newValue: string,
    messageDataFieldIndex: number
  ) => void;
  updateMessageDataType: (
    newType: typeof messageDataFieldTypes[number],
    messageDataFieldIndex: number
  ) => void;
}

const useMessageForm: () => MessageFormManagement = () => {
  const [message, setMessage] = useState<Message>({
    topic: "",
    data: [],
  });

  const addMessageDataField = () => {
    setMessage((prevState) => ({
      ...prevState,
      data: [
        ...prevState.data,
        {
          key: "",
          valueType: "custom",
          value: "",
        },
      ],
    }));
  };

  const updateTopic = (newTopic: string) => {
    setMessage((prevState) => ({
      ...prevState,
      topic: newTopic,
    }));
  };

  const updateMessageDataKey = (
    newKey: string,
    messageDataFieldIndex: number
  ) => {
    setMessage((prevState) => ({
      ...prevState,
      data: prevState.data.map((o, i) => {
        if (i !== messageDataFieldIndex) return o;

        return {
          ...o,
          key: newKey,
        };
      }),
    }));
  };

  const updateMessageDataCustomValue = (
    newValue: string,
    messageDataFieldIndex: number
  ) => {
    setMessage((prevState) => ({
      ...prevState,
      data: prevState.data.map((o, i) => {
        if (i !== messageDataFieldIndex) return o;
        if (o.valueType !== "custom") return o;

        return {
          ...o,
          value: newValue,
        };
      }),
    }));
  };

  const updateMessageDataType = (
    newType: typeof messageDataFieldTypes[number],
    messageDataFieldIndex: number
  ) => {
    setMessage((prevState) => ({
      ...prevState,
      data: prevState.data.map((o, i) => {
        if (i !== messageDataFieldIndex) return o;

        switch (newType) {
          case "object":
            return {
              ...o,
              valueType: newType,
              value: [],
            };

          case "custom":
          default:
            return {
              ...o,
              valueType: newType,
              value: "",
            };
        }
      }),
    }));
  };

  return {
    message,
    addMessageDataField,
    updateTopic,
    updateMessageDataKey,
    updateMessageDataCustomValue,
    updateMessageDataType,
  };
};

export default useMessageForm;
