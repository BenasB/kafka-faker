import { HeaderTab } from "../components/header/Header";
import HistoryTab from "../components/tabs/HistoryTab";
import SendTab from "../components/tabs/SendTab";

const tabsData: HeaderTab[] = [
  {
    title: "Send",
    component: <SendTab />,
  },
  {
    title: "History",
    component: <HistoryTab />,
  },
];

export default tabsData;
