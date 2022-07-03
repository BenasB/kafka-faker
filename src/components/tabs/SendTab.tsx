import React from "react";
import useToasts from "../../hooks/useToasts";
import ActionBar from "../actionBar/ActionBar";

export interface KafkaMessage {
  send: () => void;
}

const SendTab: React.FC = () => {
  const toastManagement = useToasts();
  const { toastDisplay, addNewToast } = toastManagement;

  const kafkaMessage: KafkaMessage = {
    send: () => {
      addNewToast("Hello world!");
    },
  };

  return (
    <>
      <div className="col">
        <p>Good morning sunshine, the world says hello!</p>
      </div>
      <ActionBar {...kafkaMessage} />
      {toastDisplay}
    </>
  );
};

export default SendTab;
