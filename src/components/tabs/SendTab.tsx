import React from "react";
import useMessageForm from "../../hooks/useMessageForm";
import useToasts from "../../hooks/useToasts";
import ActionBar from "../actionBar/ActionBar";
import MessageForm from "../messageForm/MessageForm";
import { Message } from "../messageForm/messageTypes";
import serializeMessage from "../messageForm/serializeMessage";
import ToastDisplay from "../toasts/ToastDisplay";

export interface KafkaMessage {
  send: () => void;
  data: Message;
}

const SendTab: React.FC = () => {
  const { toastList, addNewToast } = useToasts();
  const formManagement = useMessageForm();

  const kafkaMessage: KafkaMessage = {
    send: () => {
      const isFormValid = formManagement.checkValidation();
      if (!isFormValid) return;

      console.log(serializeMessage(formManagement.message).jsonString);
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
