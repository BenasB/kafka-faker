import { useState } from "react";
import Header, { HeaderTab } from "./components/header/Header";
import Layout from "./components/layout/Layout";
import ToastManager from "./components/toasts/ToastManager";

function App() {
  const [tabs, setTabs] = useState<HeaderTab[]>([
    {
      title: "Send",
      selected: true,
      component: <ToastManager />,
    },
    {
      title: "History",
      selected: false,
      component: null,
    },
  ]);

  const onTabChange: (selectedTabTitle: string) => void = (
    selectedTabTitle
  ) => {
    setTabs((prevState) =>
      prevState.map((t) => ({
        ...t,
        selected: t.title === selectedTabTitle,
      }))
    );
  };

  return (
    <>
      <Layout>
        <Header
          tabTitles={tabs.map((t) => t.title)}
          defaultTitle={tabs.find((t) => t.selected)?.title}
          onTabChange={onTabChange}
        />
        {tabs.find((t) => t.selected)?.component}
      </Layout>
    </>
  );
}

export default App;
