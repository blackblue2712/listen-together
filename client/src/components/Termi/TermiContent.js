import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { observer } from "mobx-react-lite";
import { Cmd } from "../Cmd/Cmd";

export const TermiContent = observer((props) => {
  const inputRef = useRef(null);
  const currentSong = props.player?.getCurrentSong();

  const [searchInput, setSerachInput] = useState("");

  useEffect(() => {
    inputRef.current.focus();

    document.querySelector(".termi-content").addEventListener("click", () => {
      inputRef.current.focus();
    });
  }, []);

  useEffect(() => {
    console.log(currentSong);
    if (currentSong) {
      document.querySelector(
        ".termi-content"
      ).style.background = `url(${currentSong.thumbnail})`;
    }
  }, [currentSong]);

  return (
    <div className="termi-content">
      <Cmd driver={props.driver} />
      <div className="input-area">
        <div className="pre-ip">dev@Developerss-MacBook-Pro ~ %</div>
        <form
          style={{ width: "100%", height: "100%", display: "flex" }}
          onSubmit={(e) => {
            e.preventDefault();
            props.driver.querySearch(searchInput);
            setSerachInput("");
          }}
        >
          <input
            ref={inputRef}
            type="text"
            id="serach"
            autoComplete="off"
            value={searchInput}
            onChange={(e) => {
              setSerachInput(e.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
});
