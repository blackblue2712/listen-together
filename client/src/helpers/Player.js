import YouTubePlayer from "youtube-player";
import { pushToQueue, skipCurrentSong } from "../pkgs/socket";
import { Queue } from "./Queue";

function indirect(js) {
  return eval(js);
}

export class Player {
  constructor(socket, querySearch) {
    this.socket = socket;
    this.querySearch = querySearch;

    this.player = YouTubePlayer("video-player");
    this.player.mute();

    window.player = this;

    this.queue = new Queue();

    this.currentSong = {};

    this.isPlaying = false;

    this.player.on("stateChange", async (event) => {
      console.log(event);

      if (event.data === 2) {
        event.target.playVideo();
      }
      if (event.data === 0) {
        await this.skip();
      }
    });
  }

  play() {
    if (this.isPlaying) {
      return;
    }

    const nextSong = this.queue.getFirst();

    this.isPlaying = true;

    if (!nextSong) {
      this.isPlaying = false;
      console.log("queue empty");
      return;
    }

    this.currentSong = nextSong;

    this.player.loadVideoById({
      videoId: nextSong.videoId,
      startSeconds: 0,
    });

    this.player.playVideo();

    // const element = document.querySelector(".termi-content");
    // element.style.background = `url(${nextSong.thumbnail})`;
    // element.style.backgroundSize = `cover`;
  }

  async playWithSeekTo(song, time) {
    if (this.isPlaying) {
      return;
    }

    this.isPlaying = true;

    if (!song) {
      this.isPlaying = false;
      console.log("song empty");
      return;
    }

    console.log("---startSeconds: this.startSeconds", time);

    this.currentSong = song;
    this.player.loadVideoById({
      videoId: song.videoId,
      startSeconds: Math.ceil(time),
    });

    this.player.playVideo();
  }

  async skip() {
    await skipCurrentSong(this.socket, async () => {});

    await this.player.stopVideo();
    this.isPlaying = false;
    this.play();
    return this.currentSong;
  }

  setQueue(playlist) {
    this.queue.set(playlist);
  }

  async skipFromSocket() {
    await this.player.stopVideo();
    this.isPlaying = false;
    this.play();
    return this.currentSong;
  }

  pushToQueue(item) {
    const buildItem = {
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high.url ||
        item.snippet.thumbnails.medium.url ||
        item.snippet.thumbnails.default.url,
      channelTitle: item.snippet.title,
    };

    pushToQueue(this.socket, buildItem);
    this.queue.push(buildItem);

    this.play();
  }

  pushToQueueFromSocket(item) {
    this.queue.push(item);
    this.play();
  }

  getCurrentSong = () => {
    return this.currentSongId;
  };

  async getCurrentTime() {
    return this.player && (await this.player.getCurrentTime());
  }
}

/**
item is ...
{
	"kind": "youtube#searchResult",
	"etag": "OyViD1Wn6UXpzadpm0pno5aR46U",
	"id": {
		"kind": "youtube#video",
		"videoId": "klsTk1lMDjo"
	},
	"snippet": {
		"publishedAt": "2021-03-26T13:00:17Z",
		"channelId": "UCpm6kKrf5OdNRZ9hMgk3gsA",
		"title": "Masew x RedT - Mộng Mơ | Official M/V",
		"description": "Mộng Mơ | Masew x RedT | Official M/V #Masew #RedT #MongMo #Bray #AnVy NCT MP3: ...",
		"thumbnails": {
			"default": {
				"url": "https://i.ytimg.com/vi/klsTk1lMDjo/default.jpg",
				"width": 120,
				"height": 90
			},
			"medium": {
				"url": "https://i.ytimg.com/vi/klsTk1lMDjo/mqdefault.jpg",
				"width": 320,
				"height": 180
			},
			"high": {
				"url": "https://i.ytimg.com/vi/klsTk1lMDjo/hqdefault.jpg",
				"width": 480,
				"height": 360
			}
		},
		"channelTitle": "Masew",
		"liveBroadcastContent": "none",
		"publishTime": "2021-03-26T13:00:17Z"
	}
}
 */
