import { useState } from "react";
import { Col } from "react-bootstrap";
import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import HistoryTab, { HistoryMessage } from "./components/tabs/HistoryTab";
import SendTab from "./components/tabs/SendTab";
import SettingsTab from "./components/tabs/SettingsTab";

export const tabTypes = ["send", "history", "settings"] as const;

function App() {
  const defaultTab: typeof tabTypes[number] = "send";
  const [selectedTab, setSelectedTab] =
    useState<typeof tabTypes[number]>(defaultTab);

  const [messageHistory, setMessageHistory] = useState<HistoryMessage[]>([]);

  const getTabClassName = (
    tab: typeof tabTypes[number]
  ): { className: string } => {
    return {
      className: `${selectedTab === tab ? "" : "d-none"} d-flex flex-column`,
    };
  };

  return (
    <Layout>
      <Header
        tabs={tabTypes}
        defaultTab={defaultTab}
        onTabChange={(newTab) => setSelectedTab(newTab)}
      />
      <Col {...getTabClassName("send")}>
        <SendTab setMessageHistory={setMessageHistory} />
      </Col>
      <Col {...getTabClassName("history")}>
        <HistoryTab messageHistory={messageHistory} />
      </Col>
      <Col {...getTabClassName("settings")}>
        <SettingsTab />
      </Col>
    </Layout>
  );
}

export default App;
