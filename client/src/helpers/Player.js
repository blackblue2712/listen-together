import YouTubePlayer from "youtube-player";
import { Queue } from "./Queue";

export class Player {
  constructor() {
    this.player = YouTubePlayer("video-player");
    this.queue = new Queue();

    this.currentSong = {};

    this.isPlaying = false;
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
    this.player.loadVideoById(nextSong);
    this.player.playVideo();

    // const element = document.querySelector(".termi-content");
    // element.style.background = `url(${nextSong.thumbnail})`;
    // element.style.backgroundSize = `cover`;
  }

  async skip() {
    await this.player.stopVideo();

    this.isPlaying = false;

    this.play();

    return this.currentSong;
  }

  setQueue(playlist) {
    this.queue.set(playlist);

    this.play();
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
    this.queue.push(buildItem);

    this.play();
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
