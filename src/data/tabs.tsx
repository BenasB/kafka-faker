import { HeaderTabData } from "../components/header/Header";
import HistoryTab from "../components/tabs/HistoryTab";
import SendTab from "../components/tabs/SendTab";

const tabsData: HeaderTabData[] = [
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
