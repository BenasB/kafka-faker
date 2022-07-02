import React, { useState } from "react";
import { Button, ToastContainer } from "react-bootstrap";
import ToastPrefab, { ToastData } from "./ToastPrefab";

const Toasts: React.FC = () => {
  const [toastList, setToastList] = useState<ToastData[]>([]);

  const removeToastFromList = (toastToRemove: ToastData) => {
    // Check by timeStamp reference
    setToastList((prevState) =>
      prevState.filter((t) => t.timeStamp !== toastToRemove.timeStamp)
    );
  };

  const addNewToast = () =>
    setToastList((prevState) => [
      ...prevState,
      {
        text: "Hello world",
        timeStamp: new Date(),
        onClose: removeToastFromList,
      },
    ]);

  return (
    <>
      <Button onClick={() => addNewToast()}>Add toast</Button>
      <ToastContainer position="bottom-end" className="p-3">
        {toastList.map((toastData) => (
          <ToastPrefab {...toastData} key={toastData.timeStamp.getTime()} />
        ))}
      </ToastContainer>
    </>
  );
};

export default Toasts;
