import React from "react";
import useMessageForm, { Message } from "../../hooks/useMessageForm";
import useToasts from "../../hooks/useToasts";
import ActionBar from "../actionBar/ActionBar";
import MessageForm from "../messageForm/MessageForm";
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
      addNewToast(JSON.stringify(formManagement.message));
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
