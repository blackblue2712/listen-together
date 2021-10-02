import { makeObservable, observable } from "mobx";
import { searchYoutubeV3 } from "../apis/youtube";

export class RootStore {
  cmd = [];

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
    this.cmd.push(`<b>dev@Developerss-MacBook-Pro ~ %</b> ${keyword}`);

    switch (keyword) {
      case ">s":
        const currentSong = await this.player.skip();
        this.cmd.push(
          `Current song: <b style="color: white">${currentSong.title}</b> was skipped.`
        );
        break;

      case ">l":
        this.cmd = [];
        break;
      default:
        try {
          const now = new Date().getTime();

          this.cmd.push(`Searching for <b>'${keyword}'</b> keyword ...`);

          const resp = await searchYoutubeV3(keyword);
          this.player.pushToQueue(resp);

          this.cmd.push(
            `<div style="color: #31de4b">Result success in ${
              (new Date().getTime() - now) / 1000
            }s<div>`
          );
        } catch (error) {
          this.cmd.push(`Error: Litmit API request daily! try again next day`);
          console.log(error);
        }
    }
  }
}
