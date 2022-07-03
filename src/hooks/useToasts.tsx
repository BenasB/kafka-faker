import React, { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import ToastPrefab, { ToastData } from "../components/toasts/ToastPrefab";

export interface ToastActions {
  addNewToast: (newToast: ToastData) => void;
  removeToastFromList: (toastToRemove: ToastData) => void;
}

interface ToastManagement extends ToastActions {
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

  const addNewToast = (newToast: ToastData) =>
    setToastList((prevState) => [...prevState, newToast]);

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

  return { addNewToast, removeToastFromList, toastDisplay };
};

export default useToasts;
