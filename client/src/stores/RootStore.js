import { makeObservable, observable } from "mobx";
import { searchYoutubeV3 } from "../apis/youtube";

export class RootStore {
  cmd = [];
  cmdHistories = [];

  player = null;
  currentSong = {};

  constructor() {
    makeObservable(this, {
      cmd: observable,
      cmdHistories: observable,
      player: observable,
      currentSong: observable,
    });

    this.querySearch = this.querySearch.bind(this);
  }

  pushCmd(item) {
    this.cmd.push(item);
  }

  setPlayer(player) {
    this.player = player;
  }

  troll() {
    this.cmd.push(":chicken:");
  }

  async querySearch(keyword) {
    if (keyword !== ">m") {
      this.cmd.push(`<b>dev@Developerss-MacBook-Pro ~ %</b> ${keyword}`);
      this.cmdHistories.push(keyword);
    }

    if (keyword.startsWith(">b")) {
      const url = keyword.replace(">b", "").trim();

      window.localStorage.setItem("CUSTOM_BACKGROUND", url);

      document.querySelector(
        ".termi-content"
      ).style.backgroundImage = `url(${url})`;
      document.querySelector(".termi-content").style.backgroundSize = `cover`;
      document.querySelector(
        ".termi-content"
      ).style.backgroundBlendMode = `color`;

      this.cmd.push(
        `<div style="color: #31de4b">✓ Change background image to ${url} success<div>`
      );

      return;
    }

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
      case ">h":
        this.cmd.push(
          `a for alfred b for bat <a target="_blank" href="https://www.youtube.com/watch?v=enOHraf3LEk&t=22s">https://www.youtube.com/watch?v=enOHraf3LEk&t=22s</a>`
        );
        break;
      case ">f":
        this.player.player.playVideo();
        break;
      case ">m":
        this.player.player.unMute();
        break;
      case ">q":
        const playlists = this.player.getQueue();

        this.cmd.push("<b>➣ Get list queue ... </b>");

        if (playlists.length === 0) {
          this.cmd.push("<b>➣ Queue is empty</b>");
          return;
        }

        playlists.forEach((song) => {
          this.cmd.push(`
						<div>🎶  ${song.title}</div>
					`);
        });

        this.cmd.push(
          `<b>🎧 Now playing: ${this.player.currentSong?.title}</b>`
        );
        break;
      default:
        try {
          const now = new Date().getTime();

          this.cmd.push(`Searching for <b>'${keyword}'</b> keyword ...`);

          const resp = await searchYoutubeV3(keyword);
          this.player.pushToQueue(resp);

          this.cmd.push(
            `<div style="color: #31de4b">✓ Result <b>${
              resp.snippet.title
            }</b> success in ${(new Date().getTime() - now) / 1000}s<div>`
          );
        } catch (error) {
          this.cmd.push(`Error: Litmit API request daily! try again next day`);
          console.log(error);
        }
    }
  }
}
