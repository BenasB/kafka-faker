import { useState } from "react";
import { Col } from "react-bootstrap";
import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import HistoryTab, { HistoryMessage } from "./components/tabs/HistoryTab";
import SendTab from "./components/tabs/SendTab";
import axios, { AxiosInstance } from "axios";
import SettingsTab from "./components/tabs/SettingsTab";

export const tabTypes = ["send", "history", "settings"] as const;

function App() {
  const defaultTab: typeof tabTypes[number] = "send";
  const [selectedTab, setSelectedTab] =
    useState<typeof tabTypes[number]>(defaultTab);

  const [messageHistory, setMessageHistory] = useState<HistoryMessage[]>([]);

  const backEndClient: AxiosInstance = axios.create({
    baseURL: "https://localhost:7204/",
    timeout: 5000,
  });

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
        <SendTab
          setMessageHistory={setMessageHistory}
          backEndClient={backEndClient}
        />
      </Col>
      <Col {...getTabClassName("history")}>
        <HistoryTab messageHistory={messageHistory} />
      </Col>
      <Col {...getTabClassName("settings")}>
        <SettingsTab backEndClient={backEndClient} />
      </Col>
    </Layout>
  );
}

export default App;
