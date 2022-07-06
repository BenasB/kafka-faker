import React from "react";
import { ToastContainer } from "react-bootstrap";
import ToastPrefab, { ToastData } from "./ToastPrefab";

interface Props {
  toastList: ToastData[];
}

const ToastDisplay: React.FC<Props> = ({ toastList }) => {
  return (
    <ToastContainer
      position="bottom-start"
      className="p-3 position-fixed"
      style={{ zIndex: "1090" }}
    >
      {toastList.map((toastData) => (
        <ToastPrefab {...toastData} key={toastData.timeStamp.getTime()} />
      ))}
    </ToastContainer>
  );
};

export default ToastDisplay;
