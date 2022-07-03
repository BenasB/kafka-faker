import React from "react";
import { Button } from "react-bootstrap";
import { ToastActions } from "../../../hooks/useToasts";

const OnceBar: React.FC<ToastActions> = ({
  addNewToast,
  removeToastFromList,
}) => {
  return (
    <div className="d-flex flex-row justify-content-end flex-fill">
      <Button
        className={"px-4"}
        variant="success"
        onClick={() => {
          addNewToast({
            text: "Hello world",
            timeStamp: new Date(),
            onClose: removeToastFromList,
          });
        }}
      >
        Send
      </Button>
    </div>
  );
};

export default OnceBar;
