const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("HOME HIT");
  res.send("HOME OK");
});

app.get("/sos", (req, res) => {
  console.log("SOS HIT");
  res.send("SOS OK");
});

app.listen(3000, () => {
  console.log("SERVER RUNNING");
});