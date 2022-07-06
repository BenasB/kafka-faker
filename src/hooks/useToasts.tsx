import { useState } from "react";
import { ToastData } from "../components/toasts/ToastPrefab";

interface ToastManagement {
  addNewToast: (text: string) => void;
  toastList: ToastData[];
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

  return { addNewToast, toastList };
};

export default useToasts;
