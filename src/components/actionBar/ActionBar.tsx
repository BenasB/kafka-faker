import React, { useState } from "react";
import { Form } from "react-bootstrap";
import useToasts, { ToastActions } from "../../hooks/useToasts";
import OnceBar from "./modes/OnceBar";
import RepeatBar from "./modes/RepeatBar";

const ActionBar: React.FC = () => {
  const modes = ["once", "repeat"] as const;
  const [mode, setMode] = useState<typeof modes[number]>("once");

  const toastManagement = useToasts();
  const { toastDisplay } = toastManagement;
  const toastActions: ToastActions = toastManagement;

  return (
    <>
      <div className="position-sticky bottom-0 border-top py-3 bg-white">
        <div className="d-flex flex-row">
          <div className="me-3">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Select
                onChange={(e) =>
                  setMode(modes.find((m) => m === e.target.value) || modes[0])
                }
              >
                {modes.map((m) => (
                  <option key={m} value={m}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Form>
          </div>
          {mode === "once" && <OnceBar {...toastActions} />}
          {mode === "repeat" && <RepeatBar {...toastActions} />}
        </div>
      </div>
      {toastDisplay}
    </>
  );
};

export default ActionBar;
