import React from "react";
import useMessageForm from "../../hooks/useMessageForm";
import useToasts from "../../hooks/useToasts";
import ActionBar from "../actionBar/ActionBar";
import MessageForm from "../messageForm/MessageForm";
import serializeMessageSend from "../../io/serializeMessageSend";
import ToastDisplay from "../toasts/ToastDisplay";
import MessageLoad from "../messageLoad/MessageLoad";
import { Stack } from "react-bootstrap";
import MessageSave from "../messageSave/MessageSave";
import { HistoryMessage } from "./HistoryTab";
import backEndClient from "../../io/backEndClient";

export interface KafkaMessage {
  canSend: () => boolean;
  send: () => Promise<void>;
}

interface Props {
  setMessageHistory: React.Dispatch<React.SetStateAction<HistoryMessage[]>>;
}

const SendTab: React.FC<Props> = ({ setMessageHistory }) => {
  const { toastList, addNewToast } = useToasts();
  const formManagement = useMessageForm();
  const backEnd = backEndClient;

  const kafkaMessage: KafkaMessage = {
    canSend: formManagement.checkValidation,
    send: async () => {
      const serializedMessage = serializeMessageSend(formManagement.message);

      let isSuccess = false;
      try {
        const response = await backEnd.postMessage({
          topic: serializedMessage.topic,
          message: serializedMessage.jsonString,
          key: serializedMessage.key,
        });
        isSuccess = response.status === 200;
      } catch {
        isSuccess = false;
      }

      setMessageHistory((prevState) => [
        { ...serializedMessage, isSuccess },
        ...prevState,
      ]);

      addNewToast({
        text: isSuccess
          ? "Success"
          : `Failed request at ${serializedMessage.timeStamp.toLocaleTimeString()}`,
        success: isSuccess,
        title: "Send",
      });
    },
  };

  return (
    <>
      <Stack className="col" gap={3}>
        <Stack
          className="d-flex justify-content-end"
          direction="horizontal"
          gap={3}
        >
          <MessageSave message={formManagement.message} />
          <MessageLoad setMessage={formManagement.setMessage} />
        </Stack>
        <MessageForm {...formManagement} />
      </Stack>
      <ActionBar {...kafkaMessage} />
      <ToastDisplay toastList={toastList} />
    </>
  );
};

export default SendTab;
