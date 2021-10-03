export class Queue {
  constructor() {
    this.playlists = [];
  }

  set(playlist) {
    this.playlists = playlist;
  }

  getFirst() {
    return this.playlists.pop();
  }

  push(item) {
    this.playlists.push(item);
  }

  getQueue() {
    return this.playlists;
  }
}
