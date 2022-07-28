import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { KafkaMessage } from "../tabs/SendTab";
import OnceBar from "./modes/OnceBar";
import RepeatBar from "./modes/RepeatBar";

const ActionBar: React.FC<KafkaMessage> = (kafkaMessage) => {
  const modes = ["once", "repeat"] as const;
  const [mode, setMode] = useState<typeof modes[number]>("once");

  return (
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
                  {m.toFirstUpperCase()}
                </option>
              ))}
            </Form.Select>
          </Form>
        </div>
        {mode === "once" && <OnceBar {...kafkaMessage} />}
        {mode === "repeat" && <RepeatBar {...kafkaMessage} />}
      </div>
    </div>
  );
};

export default ActionBar;
