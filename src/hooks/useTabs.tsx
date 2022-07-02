import { useState } from "react";
import { HeaderTab } from "../components/header/Header";

const useTabs = (defaultTab: HeaderTab) => {
  const [currentTab, setCurrentTab] = useState<HeaderTab>(defaultTab);

  const onTabChange: (selectedTabTitle: HeaderTab) => void = (
    selectedTabTitle
  ) => {
    setCurrentTab(selectedTabTitle);
  };

  return {
    currentTab,
    onTabChange,
  };
};

export default useTabs;
