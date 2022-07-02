import React from "react";
import style from "./layout.module.scss";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return <div className={style.layoutContainer}>{children}</div>;
};

export default Layout;
