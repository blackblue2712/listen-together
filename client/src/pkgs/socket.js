export const initSocket = (socket, rootStore) => {
  socket
    .on("connect", function () {
      console.log("connect");
      this.emit("init");
    })
    .on("first-init", () => {
      console.log("You are the first");
    })
    .on("push-queue", (data) => {
      rootStore.player.pushToQueueFromSocket(data);
      rootStore.cmd.push(
        `<div style="color: #31de4b">Push to queue <b>${data.title}</b> success<div>`
      );
      rootStore.cmd.push(
        `Please enter <b>>m</b> to enable sounds in case you don't here anything`
      );
    })
    .on("get-init-data", async () => {
      const time = (await rootStore.player.getCurrentTime()) + 1;
      const song = rootStore.player.currentSong;
      const queue = rootStore.player.queue.playlists;

      console.log("get-init-data", { queue, time, song });

      socket.emit("get-init-data", { queue, time, song });
    })
    .on("put-init-data", async (data) => {
      console.log("put-init-data", data);

      rootStore.player.setQueue(data.queue);

      if (data.song.title) {
        rootStore.cmd.push(
          "Please enter <b>>m</b> to enable sounds in case you don't here anything"
        );
        await rootStore.player.playWithSeekTo(data.song, data.time);
      }
    })
    .on("skip-current-song", async () => {
      const currentSong = await rootStore.player.skipFromSocket();
      rootStore.cmd.push(
        `Current song: <b style="color: white">${currentSong.title}</b> was skipped.`
      );
    });
};

export const pushToQueue = (socket, data) => {
  socket.emit("push-queue", data, () => {
    console.log(data);
    console.log("ack: push queue sucess!");
  });
};

export const skipCurrentSong = async (socket) => {
  socket.emit("skip-current-song", () => {
    console.log("ack: skip current song sucess!");
  });
};
