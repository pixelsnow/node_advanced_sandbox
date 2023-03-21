"use strict";

const path = require("path");
const express = require("express");
const { port, host } = require("./config.json");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "menu.html")));

app.all("*", (req, res) => res.json("not supported"));

app.listen(port, host, () => console.log(`${host}:${port} is serving...`));
