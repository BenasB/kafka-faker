import React from "react";
import { Nav } from "react-bootstrap";

export interface HeaderTab {
  title: string;
  selected: boolean;
  component: React.ReactNode;
}

interface Props {
  tabTitles: string[];
  defaultTitle?: string;
  onTabChange: (selectedTabTitle: string) => void;
}

const Header: React.FC<Props> = ({ tabTitles, onTabChange }) => {
  return (
    <Nav variant="tabs" className="mb-3" defaultActiveKey={"Send"}>
      {tabTitles.map((title) => (
        <Nav.Item key={title}>
          <Nav.Link eventKey={title} onClick={() => onTabChange(title)}>
            {title}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Header;
