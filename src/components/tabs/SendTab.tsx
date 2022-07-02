import React from "react";
import ActionBar from "../actionBar/ActionBar";

const SendTab: React.FC = () => {
  return (
    <>
      <div className="col">
        <div
          style={{ background: "green", width: "30px", height: "2000px" }}
        ></div>
      </div>
      <ActionBar />
    </>
  );
};

export default SendTab;
