// import io from "socket.io-client";

// const socket = io("http://localhost:3001");

// export const initSocket = () => {
//   socket
//     .on("connect", function () {
//       this.emit("init");
//     })
//     .on("disconnect", function () {})
//     .on("init", (data) => {
//       if (data.id) {
//         this.setState({ id: data.id });
//         console.log(data.id, "connected");
//       }
//       this.createPlayer(data);
//     })
//     .on("add-queue", (data) => {
//       console.log(data);
//       data.id && this.queue.setQueueName(data.id, data.title);
//       this.queue.setQuee(data.queue);
//       data.mess && this.setState({ cmd: [...this.state.cmd, data.mess] });
//     })
//     .on("getCurrentTime", async (id) => {
//       console.log(
//         "getCurrentTime",
//         await this.queue.getCurrentTime(),
//         this.queue.getCurrentSong(),
//         this.queue
//       );
//       const time = await this.queue.getCurrentTime();
//       const song = this.queue.getCurrentSong();
//       socket.emit("getCurrentTime", { id, time, song });
//     })
//     .on("skipCurrentSong", () => {
//       this.queue.skipCurrentSong(() => {
//         this.setState({
//           cmd: [...this.state.cmd, "--skiped"],
//         });
//       });
//     });
// };

// export const emitMessage = (message, data) => {
//   if (data) {
//     return socket.emit(message, data);
//   }
//   socket.emit(message);
// };

// export default socket;
