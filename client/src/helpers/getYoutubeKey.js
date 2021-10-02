export const getYoutubeKey = () => {
  return process.env.REACT_APP_YOUTUBE_API_KEY || "";
};

// createPlayer = async (data) => {
// 	console.log(data);
// 	await this.queue.setPlayer(this.player);

// 	await this.queue.setCurrent(data.current.currentSong, data.current.seekTo);
// 	this.queue.queueName = data.queueName || {};
// 	this.queue.setQuee(data.queue);

// 	setTimeout(() => {
// 		this.queue.playVideo(data.current.seekTo);
// 	}, 0);
// };

// showQueue = () => {
// 	const queueName = this.queue.queueName;
// 	const queue = this.queue.getQueue();
// 	let queueNameArr = [];
// 	if (queue.length) {
// 		for (let name in queueName) {
// 			queueNameArr.push(queueName[name]);
// 		}
// 		this.setState({
// 			cmd: [
// 				...this.state.cmd,
// 				"--detected queue (" + queue.length + ")",
// 				...queueNameArr,
// 			],
// 		});
// 	} else {
// 		this.setState({
// 			cmd: [...this.state.cmd, "--detected queue -- queue is empty"],
// 		});
// 	}
// };

// skipCurrentSong = () => {
// 	this.setState({
// 		cmd: [...this.state.cmd, "--skip song, please wait..."],
// 	});
// 	// socket.emit("skipCurrentSong");
// };

// clearLogs = () => {
// 	this.setState({ cmd: ["--clear logs"] });
// };

// showGuild = () => {
// 	this.setState({
// 		cmd: [
// 			...this.state.cmd,
// 			">q: list queue songs",
// 			">p + <name>: add a song to queue",
// 			">s: skip a current song",
// 			">h: get help",
// 			">c: clear logs",
// 			">f: don't hear anything? try this",
// 			" ",
// 			" ",
// 		],
// 	});
// };

// forcePlay = () => {
// 	let vid = document.querySelector("video");
// 	if (vid) {
// 		vid.play();
// 	}
// };

// checkText = (text) => {
// 	switch (text.slice(0, 2)) {
// 		case ">p":
// 			this.searchId(text.slice(3));
// 			break;
// 		case ">q":
// 			this.showQueue();
// 			break;
// 		case ">s":
// 			this.skipCurrentSong();
// 			break;
// 		case ">h":
// 			this.showGuild();
// 			break;
// 		case ">c":
// 			this.clearLogs();
// 			break;
// 		case ">f":
// 			this.forcePlay();
// 			break;
// 		default:
// 			this.searchId(text);
// 			break;
// 	}
// };

// searchId = async (text) => {
// 	const response = await searchYoutubeV3(text);
// 	if (response && response.id.videoId) {
// 		let id = response.id.videoId;
// 		let title = response.snippet.title;

// 		this.queue.setQueueName(id, title);
// 		this.setState({ cmd: [...this.state.cmd, ` --detected: ${title}`] });

// 		socket.emit("add-queue", {
// 			id,
// 			mess: text + ` --detected: ${title}`,
// 			title: title,
// 		});
// 	} else {
// 		this.setState({ cmd: [...this.state.cmd, "--404 not found"] });
// 	}
// };

// handleSubmit = (e) => {
// 	e.preventDefault();
// 	const { text } = this.state;
// 	this.setState({ text: "" });
// 	if (text) {
// 		this.setState({ cmd: [...this.state.cmd, text] });
// 		this.checkText(text);
// 	}
// };
