import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { tabTypes } from "../../App";

interface Props {
  tabs: typeof tabTypes;
  defaultTab: typeof tabTypes[number];
  onTabChange: (selectedTab: typeof tabTypes[number]) => void;
}

const Header: React.FC<Props> = ({ tabs, defaultTab, onTabChange }) => {
  return (
    <Navbar className="mb-3 d-block">
      <Nav variant="tabs" defaultActiveKey={defaultTab}>
        <Navbar.Brand>Kafka faker</Navbar.Brand>
        {tabs.map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link
              eventKey={tab}
              onClick={(e) => {
                e.preventDefault();
                onTabChange(tab);
              }}
            >
              {tab.toFirstUpperCase()}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  );
};

export default Header;
