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

  return (
    <>
      <Button
        onClick={() => {
          setToastList([
            ...toastList,
            {
              text: "Hello world",
              timeStamp: new Date(),
              onClose: removeToastFromList,
            },
          ]);
        }}
      >
        Add toast
      </Button>
      <ToastContainer position="bottom-end" className="p-3">
        {toastList.map((toastData) => (
          <ToastPrefab {...toastData} key={toastData.timeStamp.getTime()} />
        ))}
      </ToastContainer>
    </>
  );
};

export default Toasts;
