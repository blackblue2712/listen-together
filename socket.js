const Queue = require("./Queue");
const User = require("./User");

module.exports = (server) => {
  let io = require("socket.io")(server);

  const queue = new Queue();
  const users = new User();
  initializeScoket(io, queue, users);
};

function initializeScoket(io, queue, users) {
  io.on("connection", (socket) => {
    console.log(`user connected`, users.getAll());
    socket.on("init", () => {
      const firstSocket = users.getFirst();

      if (!firstSocket) {
        socket.emit("first-init");

        users.push(socket.id);
        users.setInit(socket.id);
      }

      console.log("emit get-init-data");
      users.push(socket.id);
      socket.to(firstSocket).emit("get-init-data");
    });

    socket.on("get-init-data", (data) => {
      console.log("get - init - data", data);

      const usersUnInit = users.getAllUserUnInit();
      usersUnInit.forEach((socketId) => {
        socket.to(socketId).emit("put-init-data", data);
        users.setInit(socketId);
      });
    });

    socket.on("push-queue", (song, cb) => {
      socket.broadcast.emit("push-queue", song);

      cb && cb();
    });

    socket.on("set-queue", (playlist, cb) => {
      queue.push(playlist);

      cb && cb();
    });

    socket.on("skip-current-song", () => {
      socket.broadcast.emit("skip-current-song");
    });

    socket.on("next-song", () => {
      const nextSong = queue.getFirst();

      socket.emit("next-song", nextSong);
    });

    socket.on("disconnect", () => {
      users.remove(socket.id);
    });
  });
}
