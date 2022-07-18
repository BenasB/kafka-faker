import React from "react";
import useMessageForm from "../../hooks/useMessageForm";
import useToasts from "../../hooks/useToasts";
import ActionBar from "../actionBar/ActionBar";
import MessageForm from "../messageForm/MessageForm";
import { Message } from "../messageForm/messageTypes";
import serializeMessage, {
  SerializedMessage,
} from "../messageForm/serializeMessage";
import ToastDisplay from "../toasts/ToastDisplay";

export interface KafkaMessage {
  send: () => void;
  data: Message;
}

interface Props {
  setMessageHistory: React.Dispatch<React.SetStateAction<SerializedMessage[]>>;
}

const SendTab: React.FC<Props> = ({ setMessageHistory }) => {
  const { toastList, addNewToast } = useToasts();
  const formManagement = useMessageForm();

  const kafkaMessage: KafkaMessage = {
    send: () => {
      const isFormValid = formManagement.checkValidation();
      if (!isFormValid) return;

      const serializedMessage = serializeMessage(formManagement.message);
      console.log(serializedMessage.jsonStringPretty);

      setMessageHistory((prevState) => [serializedMessage, ...prevState]);

      addNewToast("Sent");
    },
    data: formManagement.message,
  };

  return (
    <>
      <div className="col">
        <MessageForm {...formManagement} />
      </div>
      <ActionBar {...kafkaMessage} />
      <ToastDisplay toastList={toastList} />
    </>
  );
};

export default SendTab;
