import React from "react";
import useMessageForm from "../../hooks/useMessageForm";
import useToasts from "../../hooks/useToasts";
import ActionBar from "../actionBar/ActionBar";
import MessageForm from "../messageForm/MessageForm";
import serializeMessageSave from "../messageForm/serializeMessageSave";
import serializeMessageSend, {
  SerializedSendMessage,
} from "../messageForm/serializeMessageSend";
import ToastDisplay from "../toasts/ToastDisplay";

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
      console.log(JSON.stringify(serializeMessageSave(formManagement.message)));

      setMessageHistory((prevState) => [serializedMessage, ...prevState]);

      addNewToast("Sent");
    },
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
