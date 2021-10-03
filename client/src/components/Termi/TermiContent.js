/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { observer } from "mobx-react-lite";
import { Cmd } from "../Cmd/Cmd";
import { Playing } from "../Playing/Playing";

export const TermiContent = observer((props) => {
  const inputRef = useRef(null);
  const currentSong = props.player?.getCurrentSong();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    inputRef.current.focus();

    document.querySelector(".termi-content").addEventListener("click", () => {
      inputRef.current.focus();
    });

    let countUp = 0;
    document.querySelector("#search").addEventListener("keydown", (e) => {
      let i = props.driver.cmdHistories.length;

      if (e.keyCode === 38) {
        if (i > 0 && props.driver.cmdHistories[i - countUp - 1]) {
          setSearchInput(props.driver.cmdHistories[i - countUp - 1] || "");
          countUp++;
        } else {
          countUp = 0;
        }
      }

      if (e.keyCode === 40) {
        setSearchInput("");
        countUp = 0;
      }
    });
  }, []);

  useEffect(() => {
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
          id="form-submit"
          style={{ width: "100%", height: "100%", display: "flex" }}
          onSubmit={(e) => {
            e.preventDefault();
            props.driver.querySearch(searchInput);
            setSearchInput("");
          }}
        >
          <input
            ref={inputRef}
            type="text"
            id="search"
            autoComplete="off"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
});
