"use strict";

const path = require("path");
const express = require("express");
const app = express();

// We need something here to fetch the data, and Node has no fetch operation,
// so we need to write it ourselves or use some library

// const fetch = require("node-fetch"); // npm install node-fetch@2
const fetch = require("./fetchlib");

const { port, host } = require("./config.json");

app.use(express.json());

// Everything is public folder will be accessible outside
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "menu.html")));

app.get("/getAll", (req, res) => {
  fetch("http://127.0.0.1:4000/api/computers")
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/getOne/:id", (req, res) => {
  fetch(`http://127.0.0.1:4000/api/computers/${req.params.id}`)
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const computer = req.body;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(computer),
  };
  fetch(`http://127.0.0.1:4000/api/computers/`, options)
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/update", (req, res) => {
  const computer = req.body;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(computer),
  };
  fetch(`http://127.0.0.1:4000/api/computers/${computer.id}`, options)
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/remove", (req, res) => {
  const id = req.body.id;
  if (id && id.length > 0) {
    const options = {
      method: "DELETE",
    };
    fetch(`http://127.0.0.1:4000/api/computers/${id}`, options)
      .then((data) => data.json())
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ message: "empty id", type: "error" });
  }
});

app.all("*", (req, res) => res.json("not supported"));

app.listen(port, host, () => console.log(`${host}:${port} is serving...`));
