import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import tabsData from "./data/tabs";
import useTabs from "./hooks/useTabs";

function App() {
  const { currentTab, onTabChange } = useTabs(tabsData[0]);

  return (
    <Layout>
      <Header
        tabs={tabsData}
        defaultTab={currentTab}
        onTabChange={onTabChange}
      />
      {currentTab.component}
    </Layout>
  );
}

export default App;
