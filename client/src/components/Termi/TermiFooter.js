import React from "react";
import "./Termi.css";
import { observer } from "mobx-react-lite";

export const TermiFooter = observer(() => {
  return (
    <div className="footer">
      {[
        ">q: list queue songs",
        ">p + <name>: add a song to queue",
        ">s: skip a current song",
        ">h: get help",
        ">c: clear logs",
      ].map((item) => (
        <div className="footer-helper">{item}</div>
      ))}
    </div>
  );
});
