const express = require("express");
const compression = require("compression");
const path = require("path");
const { createServer } = require("http");
const morgan = require("morgan");

const socket = require("./socket");

const app = express();
const server = createServer(app);

app.use(compression());
app.use(morgan("dev"));
app.use(express.static(path.resolve("client", "build")));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("Server listen on port", PORT);
});

socket(server);
