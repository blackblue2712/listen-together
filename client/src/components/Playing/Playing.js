import React from "react";
import Marquee from "react-fast-marquee";

import { observer } from "mobx-react-lite";

import "./Playing.css";

export const Playing = observer((props) => {
  console.log(props);
  return (
    <div className="playing">
      <Marquee gradient={false}>
        <img
          className="playing-thumbnail"
          src={
            props.driver.player?.currentSong.thumbnail ||
            "https://avatars.githubusercontent.com/u/67723648?s=48&v=4"
          }
          alt="thumb"
        />
        &nbsp;
        <div className="playing-title">
          {props.driver.player?.currentSong.title
            ? props.driver.player.currentSong.title.substr(0, 100) + "... "
            : "Queue is empty, please add more"}
        </div>
        {/* <div className="playing-title">${props.title}</div> */}
      </Marquee>
    </div>
  );
});
