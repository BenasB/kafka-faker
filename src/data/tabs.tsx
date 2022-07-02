import { HeaderTab } from "../components/header/Header";
import ToastManager from "../components/toasts/ToastManager";

const tabsData: HeaderTab[] = [
  {
    title: "Send",
    component: <ToastManager />,
  },
  {
    title: "History",
    component: null,
  },
];

export default tabsData;
