import { useState } from "react";
import { HeaderTabData } from "../components/header/Header";

interface HeaderTab extends HeaderTabData {
  selected: boolean;
}

const useTabs = (initialTabs: HeaderTabData[], defaulTab: HeaderTabData) => {
  const [tabs, setCurrentTabs] = useState<HeaderTab[]>(
    initialTabs.map((t) => ({ ...t, selected: t.title === defaulTab.title }))
  );

  const onTabChange: (selectedTab: HeaderTabData) => void = (selectedTab) => {
    setCurrentTabs((prevState) =>
      prevState.map((t) => ({ ...t, selected: t.title === selectedTab.title }))
    );
  };

  return {
    tabs,
    onTabChange,
  };
};

export default useTabs;
