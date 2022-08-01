import React from "react";
import useMessageForm from "../../hooks/useMessageForm";
import useToasts from "../../hooks/useToasts";
import ActionBar from "../actionBar/ActionBar";
import MessageForm from "../messageForm/MessageForm";
import serializeMessageSend, {
  SerializedSendMessage,
} from "../../io/serializeMessageSend";
import ToastDisplay from "../toasts/ToastDisplay";
import MessageLoad from "../messageLoad/MessageLoad";
import { Stack } from "react-bootstrap";
import MessageSave from "../messageSave/MessageSave";
import { AxiosInstance } from "axios";

export interface KafkaMessage {
  canSend: () => boolean;
  send: () => void;
}

interface Props {
  setMessageHistory: React.Dispatch<
    React.SetStateAction<SerializedSendMessage[]>
  >;
  backEndClient: AxiosInstance;
}

const SendTab: React.FC<Props> = ({ setMessageHistory, backEndClient }) => {
  const { toastList, addNewToast } = useToasts();
  const formManagement = useMessageForm();

  const kafkaMessage: KafkaMessage = {
    canSend: formManagement.checkValidation,
    send: () => {
      const serializedMessage = serializeMessageSend(formManagement.message);

      backEndClient.post("Send", {
        topic: serializedMessage.topic,
        message: serializedMessage.jsonString,
        key: serializedMessage.key,
      });
      setMessageHistory((prevState) => [serializedMessage, ...prevState]);

      addNewToast("Sent");
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
