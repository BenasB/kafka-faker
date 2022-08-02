import { useState } from "react";
import { ToastData } from "../components/toasts/ToastPrefab";

interface ToastManagement {
  addNewToast: (
    toastDetails: Pick<ToastData, "text" | "success" | "title">
  ) => void;
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

  const addNewToast = (
    toastDetails: Pick<ToastData, "text" | "success" | "title">
  ) =>
    setToastList((prevState) => [
      ...prevState,
      {
        ...toastDetails,
        timeStamp: new Date(),
        onClose: removeToastFromList,
      },
    ]);

  return { addNewToast, toastList };
};

export default useToasts;
