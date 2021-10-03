export class Queue {
  constructor() {
    this.playlists = [];
  }

  set(playlist) {
    this.playlists = playlist;
  }

  getFirst() {
    return this.playlists.shift();
  }

  push(item) {
    this.playlists.push(item);
  }

  getAll() {
    return this.playlists;
  }
}
