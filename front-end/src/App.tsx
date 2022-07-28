import { useState } from "react";
import { Col } from "react-bootstrap";
import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import { SerializedSendMessage } from "./io/serializeMessageSend";
import HistoryTab from "./components/tabs/HistoryTab";
import SendTab from "./components/tabs/SendTab";

export const tabTypes = ["send", "history"] as const;

function App() {
  const defaultTab: typeof tabTypes[number] = "send";
  const [selectedTab, setSelectedTab] =
    useState<typeof tabTypes[number]>(defaultTab);

  const [messageHistory, setMessageHistory] = useState<SerializedSendMessage[]>(
    []
  );

  return (
    <Layout>
      <Header
        tabs={tabTypes}
        defaultTab={defaultTab}
        onTabChange={(newTab) => setSelectedTab(newTab)}
      />
      <Col
        className={`${
          selectedTab === "send" ? "" : "d-none"
        } d-flex flex-column`}
      >
        <SendTab setMessageHistory={setMessageHistory} />
      </Col>
      <Col
        className={`${
          selectedTab === "history" ? "" : "d-none"
        } d-flex flex-column`}
      >
        <HistoryTab messageHistory={messageHistory} />
      </Col>
    </Layout>
  );
}

export default App;
