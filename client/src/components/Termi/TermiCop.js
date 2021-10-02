import React from "react";
import YouTubePlayer from "youtube-player";
import "./Termi.css";
import socket from "../socket";
import { getIdYoutube } from "../../api/youtube";
import YoutubeFrame from "./YoutubeFrame";
import Queue from "./Queue";

class Termi extends React.Component {
  constructor() {
    super();
    this.queue = new Queue();
    this.state = {
      text: "",
      queue: [],
      currentSong: null,
      cmd: [
        ">q: list queue songs",
        ">p + <name>: add a song to queue",
        ">s: skip a current song",
        ">h: get help",
        ">c: clear logs",
        ">f: don't hear anything? try this",
        " ",
        "get help? use '>h'",
        " ",
      ],
      id: "liars@liars-8460w:~$",
    };

    this.inputRef = React.createRef();
  }

  async componentDidMount() {
    this.player = YouTubePlayer("video-player");
    this.inputRef.current.focus();
    socket
      .on("connect", function () {
        this.emit("init");
      })
      .on("disconnect", function () {})
      .on("init", (data) => {
        if (data.id) {
          this.setState({ id: data.id });
          console.log(data.id, "connected");
        }
        this.createPlayer(data);
      })
      .on("add-queue", (data) => {
        console.log(data);
        data.id && this.queue.setQueueName(data.id, data.title);
        this.queue.setQuee(data.queue);
        data.mess && this.setState({ cmd: [...this.state.cmd, data.mess] });
      })
      .on("getCurrentTime", async (id) => {
        console.log(
          "getCurrentTime",
          await this.queue.getCurrentTime(),
          this.queue.getCurrentSong(),
          this.queue
        );
        const time = await this.queue.getCurrentTime();
        const song = this.queue.getCurrentSong();
        socket.emit("getCurrentTime", { id, time, song });
      })
      .on("skipCurrentSong", () => {
        this.queue.skipCurrentSong(() => {
          this.setState({
            cmd: [...this.state.cmd, "--skiped"],
          });
        });
      });
  }

  createPlayer = async (data) => {
    console.log(data);
    await this.queue.setPlayer(this.player);

    await this.queue.setCurrent(data.current.currentSong, data.current.seekTo);
    this.queue.queueName = data.queueName || {};
    this.queue.setQuee(data.queue);

    // setTimeout(() => {
    //     this.queue.playVideo(data.current.seekTo);
    // }, 0)
  };

  showQueue = () => {
    const queueName = this.queue.queueName;
    const queue = this.queue.getQueue();
    let queueNameArr = [];
    if (queue.length) {
      for (let name in queueName) {
        queueNameArr.push(queueName[name]);
      }
      this.setState({
        cmd: [
          ...this.state.cmd,
          "--detected queue (" + queue.length + ")",
          ...queueNameArr,
        ],
      });
    } else {
      this.setState({
        cmd: [...this.state.cmd, "--detected queue -- queue is empty"],
      });
    }
  };

  skipCurrentSong = () => {
    this.setState({
      cmd: [...this.state.cmd, "--skip song, please wait..."],
    });
    socket.emit("skipCurrentSong");
  };

  clearLogs = () => {
    this.setState({ cmd: ["--clear logs"] });
  };

  showGuild = () => {
    this.setState({
      cmd: [
        ...this.state.cmd,
        ">q: list queue songs",
        ">p + <name>: add a song to queue",
        ">s: skip a current song",
        ">h: get help",
        ">c: clear logs",
        ">f: don't hear anything? try this",
        " ",
        " ",
      ],
    });
  };

  forcePlay = () => {
    let vid = document.querySelector("video");
    if (vid) {
      vid.play();
    }
  };

  checkText = (text) => {
    switch (text.slice(0, 2)) {
      case ">p":
        this.searchId(text.slice(3));
        break;
      case ">q":
        this.showQueue();
        break;
      case ">s":
        this.skipCurrentSong();
        break;
      case ">h":
        this.showGuild();
        break;
      case ">c":
        this.clearLogs();
        break;
      case ">f":
        this.forcePlay();
        break;
      default:
        this.searchId(text);
        break;
    }
  };

  searchId = async (text) => {
    const response = await getIdYoutube(text);
    if (response && response.id.videoId) {
      let id = response.id.videoId;
      let title = response.snippet.title;

      this.queue.setQueueName(id, title);
      this.setState({ cmd: [...this.state.cmd, ` --detected: ${title}`] });

      socket.emit("add-queue", {
        id,
        mess: text + ` --detected: ${title}`,
        title: title,
      });
    } else {
      this.setState({ cmd: [...this.state.cmd, "--404 not found"] });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    this.setState({ text: "" });
    if (text) {
      this.setState({ cmd: [...this.state.cmd, text] });
      this.checkText(text);
    }
  };

  render() {
    let { text, cmd } = this.state;
    return (
      <div id="termi">
        <YoutubeFrame />
        <div className="termi-header">
          <center>
            <h3>liars@liars-8460w: ~</h3>
          </center>
        </div>
        <div className="termi-tab"></div>
        <div className="termi-content">
          <div className="content-render">
            {cmd.map((c, i) => {
              return (
                <div key={i} className="cmd">
                  <span className="text-green"> {">"}</span> {c}
                </div>
              );
            })}
          </div>
          <div className="content-type">
            <form onSubmit={this.handleSubmit}>
              <span className="pre-ip">liars@liars-8460w:</span>
              <input
                ref={this.inputRef}
                autoComplete="off"
                name="termi-tpye"
                id="termi-type"
                value={text}
                onChange={(e) => this.setState({ text: e.target.value })}
              ></input>
              <span className="af-ip"></span>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Termi;
