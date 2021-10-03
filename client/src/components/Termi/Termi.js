/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Termi.css";
import { IFrame } from "../IFrame/IFrame";
import { initSocket } from "../../pkgs/socket";
import { TermiHeader } from "./TermiHeader";
import { TermiContent } from "./TermiContent";
import { Player } from "../../helpers/Player";
import { RootStore } from "../../stores/RootStore";
import { observer } from "mobx-react-lite";
import { TermiFooter } from "./TermiFooter";
import socketIOClient from "socket.io-client";

export const Termi = observer(() => {
  const [rootStore] = useState(new RootStore());

  const socket = socketIOClient(process.env.REACT_APP_API_URL, {
    transports: ["websocket"],
  });

  useEffect(() => {
    rootStore.setPlayer(new Player(socket, rootStore.querySearch));
    rootStore.player.play();

    const url = window.localStorage.getItem("CUSTOM_BACKGROUND");

    if (url) {
      document.querySelector(
        ".termi-content"
      ).style.backgroundImage = `url(${url})`;
      document.querySelector(".termi-content").style.backgroundSize = `cover`;
      document.querySelector(
        ".termi-content"
      ).style.backgroundBlendMode = `color`;
    }
  }, []);

  useEffect(() => {
    initSocket(socket, rootStore);
  }, []);

  return (
    <div id="termi">
      <IFrame />
      <TermiHeader driver={rootStore} />
      <TermiContent driver={rootStore} />
      <TermiFooter />
    </div>
  );
});
