import React from "react";
import "./Termi.css";
import { observer } from "mobx-react-lite";

export const TermiFooter = observer(() => {
  return (
    <div className="footer">
      {[
        ">q: list queue songs",
        "<name|url>: add a song to queue",
        ">s: skip a current song",
        ">b <url>: set custom background",
        ">h: get help",
        ">c: clear logs",
      ].map((item) => (
        <div className="footer-helper">{item}</div>
      ))}
    </div>
  );
});
