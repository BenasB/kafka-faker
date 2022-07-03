import { Col } from "react-bootstrap";
import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import tabsData from "./data/tabs";
import useTabs from "./hooks/useTabs";

function App() {
  const defaultTab = tabsData[0];
  const { tabs, onTabChange } = useTabs(tabsData, defaultTab);

  return (
    <Layout>
      <Header
        tabs={tabsData}
        defaultTab={defaultTab}
        onTabChange={onTabChange}
      />
      {tabs.map((t) => (
        <Col
          key={t.title}
          className={`${!t.selected ? "d-none" : ""} d-flex flex-column`}
        >
          {t.component}
        </Col>
      ))}
    </Layout>
  );
}

export default App;
