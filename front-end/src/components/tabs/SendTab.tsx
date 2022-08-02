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
import { AxiosInstance } from "axios";
import { HistoryMessage } from "./HistoryTab";

export interface KafkaMessage {
  canSend: () => boolean;
  send: () => Promise<void>;
}

interface Props {
  setMessageHistory: React.Dispatch<React.SetStateAction<HistoryMessage[]>>;
  backEndClient: AxiosInstance;
}

const SendTab: React.FC<Props> = ({ setMessageHistory, backEndClient }) => {
  const { toastList, addNewToast } = useToasts();
  const formManagement = useMessageForm();

  const kafkaMessage: KafkaMessage = {
    canSend: formManagement.checkValidation,
    send: async () => {
      const serializedMessage = serializeMessageSend(formManagement.message);

      let isSuccess = false;
      try {
        const response = await backEndClient.post("Send", {
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

      addNewToast(
        isSuccess
          ? "Sent"
          : `Failed send request at ${serializedMessage.timeStamp.toLocaleTimeString()}`
      );
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
