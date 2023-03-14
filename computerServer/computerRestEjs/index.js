"use strict";

const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const { host, port } = require("./config.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.render("menu", { title: "Home", header: "Menu" })
);

app.get("/all", (req, res) =>
  fetch("http://127.0.0.1:4000/api/computers", { mode: "cors" })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      res.render("allComputers", {
        title: "All computers",
        header: "All computers",
        data: result,
      });
    })
    .catch((err) => {
      sendError(res, err);
    })
);

app.get("/add", (req, res) =>
  res.render("form", {
    title: "Add a new computer",
    header: "Add a new computer",
    // method will be POST automatically?
    action: "/add",
    fields: [
      { name: "ID" },
      { name: "Name" },
      { name: "Type" },
      { name: "Processor" },
      { name: "Amount" },
    ],
  })
);

app.post("/add", (req, res) => {
  const computer = req.body;
  const options = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(computer),
  };
  fetch("http://127.0.0.1:4000/api/computers", options).then((data) =>
    data
      .json()
      .then((status) => sendStatus(res, status))
      .catch((err) => sendError(res, err))
  );
});

app.get("/update", (req, res) =>
  res.render("form", {
    title: "Update",
    header: "Update",
    // method will be POST automatically?
    action: "/update",
    fields: [
      { name: "ID" },
      { name: "Name", readonly: true },
      { name: "Type", readonly: true },
      { name: "Processor", readonly: true },
      { name: "Amount", readonly: true },
    ],
  })
);

app.post("/update", async (req, res) => {
  try {
    // takes from name field.name.toLowerCase() in form
    const id = req.body.id;
    const data = await fetch(`http://127.0.0.1:4000/api/computers/${id}`, {
      mode: "cors",
    });
    const computer = await data.json();
    if (computer.message) {
      sendStatus(res, computer);
    } else {
      const comp = computer[0];
      res.render("form", {
        title: "Update",
        header: "Update",
        action: "/updatedata",
        fields: [
          { name: "ID", value: comp.id, readonly: true },
          { name: "Name", value: comp.name },
          { name: "Type", value: comp.type },
          { name: "Processor", value: comp.processor },
          { name: "Amount", value: comp.amount },
        ],
      });
    }
  } catch (err) {
    sendError(res, err);
  }

  const computer = req.body;
  const options = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(computer),
  };
  fetch("http://127.0.0.1:4000/api/computers", options).then((data) =>
    data
      .json()
      .then((status) => sendStatus(res, status))
      .catch((err) => sendError(res, err))
  );
});

app.post("/updatedata", (req, res) => {
  const computer = req.body;
  const options = {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(computer),
  };
  fetch(`http://127.0.0.1:4000/api/computers/${computer.id}`, options)
    .then((data) => data.json())
    .then((status) => sendStatus(res, status))
    .catch((err) => sendError(res, err));
});

app.get("/remove", (req, res) =>
  res.render("idform", {
    title: "remove",
    header: "remove",
    action: "/remove",
  })
);

app.post("/remove", (req, res) => {
  const id = req.body.id;
  const options = {
    method: "DELETE",
    mode: "cors",
  };
  fetch(`http://127.0.0.1:4000/api/computers/${id}`, options)
    .then((data) => data.json())
    .then((status) => sendStatus(res, status))
    .catch((err) => sendError(res, err));
});

app.get("/getOne", (req, res) =>
  res.render("idform", {
    title: "Get one computer",
    header: "Get one computer",
    action: "/getOne",
  })
);

app.post("/getOne", (req, res) => {
  const id = req.body.id;
  const options = {
    mode: "cors",
  };
  fetch(`http://127.0.0.1:4000/api/computers/${id}`, options)
    .then((data) => data.json())
    .then((result) =>
      res.render("oneComputer", {
        title: "Get computer",
        header: "Get one computer",
        result: result,
      })
    )
    .catch((err) => sendError(res, err));
});

app.listen(port, host, () =>
  console.log(`Server ${host}:${port} is listening at 3000...`)
);

function sendStatus(res, status, title = "Status", header = "Status") {
  res.render("statusPage", { title, header, status });
}

function sendError(res, error) {
  sendStatus(res, error, "Error", "Error");
}
