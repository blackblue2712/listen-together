class Queue {
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
}

module.exports = Queue;
