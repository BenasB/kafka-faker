import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export interface HeaderTab {
  title: string;
  component: React.ReactNode;
}

interface Props {
  tabs: HeaderTab[];
  defaultTab: HeaderTab;
  onTabChange: (selectedTab: HeaderTab) => void;
}

const Header: React.FC<Props> = ({ tabs, defaultTab, onTabChange }) => {
  return (
    <Navbar className="mb-3 d-block">
      <Nav variant="tabs" defaultActiveKey={defaultTab.title}>
        <Navbar.Brand>Kafka faker</Navbar.Brand>
        {tabs.map((tab) => (
          <Nav.Item key={tab.title}>
            <Nav.Link eventKey={tab.title} onClick={() => onTabChange(tab)}>
              {tab.title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  );
};

export default Header;
