import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { tabTypes } from "../../App";
import { ReactComponent as BrandIcon } from "../../assets/kafka-faker-logo.svg";

interface Props {
  tabs: typeof tabTypes;
  defaultTab: typeof tabTypes[number];
  onTabChange: (selectedTab: typeof tabTypes[number]) => void;
}

const Header: React.FC<Props> = ({ tabs, defaultTab, onTabChange }) => {
  return (
    <Navbar className="mb-3 d-block">
      <Nav variant="tabs" defaultActiveKey={defaultTab}>
        <Navbar.Brand>
          <BrandIcon width={150} />
        </Navbar.Brand>
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
