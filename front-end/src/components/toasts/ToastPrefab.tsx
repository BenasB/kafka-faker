import React, { useState } from "react";
import { Toast } from "react-bootstrap";

export interface ToastData {
  text: string;
  timeStamp: Date;
  delay?: number;
  success?: boolean;
  title?: string;
  onClose: (toastToRemove: ToastData) => void;
}

const ToastPrefab: React.FC<ToastData> = (data) => {
  const [show, setShow] = useState<boolean>(true);
  const {
    text,
    timeStamp,
    onClose,
    delay = 3000,
    success = true,
    title,
  } = data;

  return (
    <Toast
      bg={!success ? "danger" : ""}
      delay={delay}
      autohide
      onTransitionEnd={() => onClose(data)}
      show={show}
      onClose={() => {
        setShow(false);
      }}
    >
      <Toast.Header>
        <strong className="me-auto">{title || "Kafka"}</strong>
        <small className="text-muted">{timeStamp.toLocaleTimeString()}</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};

export default ToastPrefab;
