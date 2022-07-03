import React, { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import ToastPrefab, { ToastData } from "../components/toasts/ToastPrefab";

interface ToastManagement {
  addNewToast: (text: string) => void;
  toastDisplay: React.ReactNode;
}

const useToasts: () => ToastManagement = () => {
  const [toastList, setToastList] = useState<ToastData[]>([]);

  const removeToastFromList = (toastToRemove: ToastData) => {
    // Check by timeStamp reference
    setToastList((prevState) =>
      prevState.filter((t) => t.timeStamp !== toastToRemove.timeStamp)
    );
  };

  const addNewToast = (text: string) =>
    setToastList((prevState) => [
      ...prevState,
      {
        text,
        timeStamp: new Date(),
        onClose: removeToastFromList,
      },
    ]);

  const toastDisplay = (
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

  return { addNewToast, toastDisplay };
};

export default useToasts;
