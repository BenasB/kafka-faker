import React from "react";
import { Tab, Stack } from "react-bootstrap";

interface Props {
  eventKey: string;
  children: React.ReactNode;
}

const GenerationTypeSelectionPane: React.FC<Props> = ({
  children,
  eventKey,
}) => {
  return (
    <Tab.Pane eventKey={eventKey}>
      <Stack
        direction="horizontal"
        gap={3}
        className={"flex-wrap align-items-stretch"}
      >
        {children}
      </Stack>
    </Tab.Pane>
  );
};

export default GenerationTypeSelectionPane;
