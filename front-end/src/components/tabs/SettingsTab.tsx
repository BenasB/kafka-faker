import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  backEndClient: AxiosInstance;
}

const SettingsTab: React.FC<Props> = ({ backEndClient }) => {
  const connectionTypes = ["connected", "disconnected", "unknown"] as const;

  const [connectedToBackEnd, setConnectedToBackEnd] =
    useState<typeof connectionTypes[number]>("unknown");

  useEffect(() => {
    (async () => {
      setConnectedToBackEnd("unknown");
      try {
        setConnectedToBackEnd(
          (await checkBackEndConnection()) ? "connected" : "disconnected"
        );
      } catch (error) {
        setConnectedToBackEnd("disconnected");
      }
    })();
  }, []);

  const checkBackEndConnection = async (): Promise<boolean> => {
    const response = await backEndClient.get("health");

    return response.status === 200;
  };

  return (
    <div className="mb-3">
      <div>Backend status: {connectedToBackEnd}</div>
      <Button
        onClick={() =>
          (async () => {
            setConnectedToBackEnd("unknown");
            try {
              setConnectedToBackEnd(
                (await checkBackEndConnection()) ? "connected" : "disconnected"
              );
            } catch (error) {
              setConnectedToBackEnd("disconnected");
            }
          })()
        }
      >
        Retry
      </Button>
    </div>
  );
};

export default SettingsTab;
