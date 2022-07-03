import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export interface HeaderTabData {
  title: string;
  component: React.ReactNode;
}

interface Props {
  tabs: HeaderTabData[];
  defaultTab: HeaderTabData;
  onTabChange: (selectedTab: HeaderTabData) => void;
}

const Header: React.FC<Props> = ({ tabs, defaultTab, onTabChange }) => {
  return (
    <Navbar className="mb-3 d-block">
      <Nav variant="tabs" defaultActiveKey={defaultTab.title}>
        <Navbar.Brand>Kafka faker</Navbar.Brand>
        {tabs.map((tab) => (
          <Nav.Item key={tab.title}>
            <Nav.Link
              eventKey={tab.title}
              onClick={(e) => {
                e.preventDefault();
                onTabChange(tab);
              }}
            >
              {tab.title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  );
};

export default Header;
