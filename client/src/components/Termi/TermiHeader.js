import { observer } from "mobx-react-lite";
import React from "react";
import { Playing } from "../Playing/Playing";
import "./Termi.css";

export const TermiHeader = observer((props) => {
  return (
    <div className="termi-header">
      <div className="header-buttons">
        <span className="header-buttons__red"></span>
        <span className="header-buttons__yellow"></span>
        <span className="header-buttons__green"></span>
      </div>
      <h3 className="termi-header__title">dev 🍑 --- - shz --- 238x58</h3>
      <Playing driver={props.driver} />
    </div>
  );
});
