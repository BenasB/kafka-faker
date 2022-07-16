import React from "react";
import { Form } from "react-bootstrap";
import { ValidatedInput } from "./messageTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ValidationErrorMessage: React.FC<ValidatedInput<any>> = ({
  errorMessages,
}) => {
  if (!errorMessages) return null;

  return (
    <Form.Control.Feedback type="invalid">
      {errorMessages.join(", ")}
    </Form.Control.Feedback>
  );
};

export default ValidationErrorMessage;
