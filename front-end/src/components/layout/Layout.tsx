import React from "react";
import style from "./layout.module.scss";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={`${style.layoutContainer} mx-auto`}>
      <div className="mx-3 min-vh-100 d-flex flex-column">{children}</div>
    </div>
  );
};

export default Layout;
