import React, { useEffect, useState } from "react";
import "./Termi.css";
import { IFrame } from "../IFrame/IFrame";
// import Queue from "../../helpers/Player";
// import socket from "../../pkgs/socket";
import { TermiHeader } from "./TermiHeader";
import { TermiContent } from "./TermiContent";
import { Player } from "../../helpers/Player";
import { RootStore } from "../../stores/RootStore";
import { observer } from "mobx-react-lite";
import { TermiFooter } from "./TermiFooter";

export const Termi = observer(() => {
  const [rootStore] = useState(new RootStore());

  useEffect(() => {
    rootStore.setPlayer(new Player());
    rootStore.player.play();
  }, []);

  return (
    <div id="termi">
      <IFrame />
      <TermiHeader />
      <TermiContent driver={rootStore} />
      <TermiFooter />
    </div>
  );
});
