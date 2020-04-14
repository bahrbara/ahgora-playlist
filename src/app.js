const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const playlistRoutes = require("./routes/playlist");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/playlists", playlistRoutes);

module.exports = app;
