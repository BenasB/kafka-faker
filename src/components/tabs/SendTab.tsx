import React from "react";
import useMessageForm from "../../hooks/useMessageForm";
import useToasts from "../../hooks/useToasts";
import ActionBar from "../actionBar/ActionBar";
import MessageForm from "../messageForm/MessageForm";
import serializeMessageSchema from "../../io/serializeMessageSchema";
import serializeMessageSend, {
  SerializedSendMessage,
} from "../../io/serializeMessageSend";
import ToastDisplay from "../toasts/ToastDisplay";
import MessageLoad from "../messageLoad/MessageLoad";
import { Stack } from "react-bootstrap";
import MessageSave from "../messageSave/MessageSave";

export interface KafkaMessage {
  canSend: () => boolean;
  send: () => void;
}

interface Props {
  setMessageHistory: React.Dispatch<
    React.SetStateAction<SerializedSendMessage[]>
  >;
}

const SendTab: React.FC<Props> = ({ setMessageHistory }) => {
  const { toastList, addNewToast } = useToasts();
  const formManagement = useMessageForm();

  const kafkaMessage: KafkaMessage = {
    canSend: formManagement.checkValidation,
    send: () => {
      const serializedMessage = serializeMessageSend(formManagement.message);
      console.log(
        JSON.stringify(serializeMessageSchema(formManagement.message))
      );

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
          <MessageSave />
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
