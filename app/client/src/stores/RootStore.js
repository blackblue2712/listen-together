import { makeObservable, observable } from "mobx";
import { searchYoutubeV3 } from "../apis/youtube";

export class RootStore {
  cmd = [
    ">q: list queue songs",
    ">p + <name>: add a song to queue",
    ">s: skip a current song",
    ">h: get help",
    ">c: clear logs",
    ">f: don't hear anything? try this",
    " ",
    "get help? use '>h'",
    " ",
  ];

  player = null;

  constructor() {
    makeObservable(this, {
      cmd: observable,
      player: observable,
    });
  }

  pushCmd(item) {
    this.cmd.push(item);
  }

  setPlayer(player) {
    this.player = player;
  }

  async querySearch(keyword) {
    switch (keyword) {
      case ">s":
        await this.player.skip();
        this.cmd.shift(`Current song: `);
        break;
      default:
        const resp = await searchYoutubeV3(keyword);
        this.player.pushToQueue(resp);
    }
  }
}
