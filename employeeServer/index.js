"use strict";

const path = require("path");

const express = require("express");
const app = express();

const { port, host, storage } = require("./serverConfig.json");

// There should ideally be error checking here
const DataStorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));

const dataStorage = new DataStorage();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

// All forms sent to a server will be automatically encoded thanks to this
app.use(express.urlencoded({ extended: false }));
// Public folder will be used for styles and such
app.use(express.static(path.join(__dirname, "public")));

// home page
const menuPath = path.join(__dirname, "menu.html");

app.get("/", (req, res) => res.sendFile(menuPath));

app.get("/all", (req, res) =>
  dataStorage
    .getAll()
    .then((data) => res.render("allPersons", { result: data }))
);

// Adding one more rule
app.get("/getPerson", (req, res) =>
  res.render("getPerson", {
    title: "Get",
    header1: "Get",
    action: "/getPerson",
  })
);

app.post("/getPerson", (req, res) => {
  // Throw server error if no request body
  if (!req.body) return res.sendStatus(500);
  // Otherwise handle data
  const personId = req.body.id;
  dataStorage
    .getOne(personId)
    .then((employee) => res.render("personPage", { result: employee }))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/inputform", (req, res) =>
  res.render("form", {
    title: "Add person",
    header1: "Add a new person",
    action: "/input",
    id: { value: "", readonly: "" },
    firstname: { value: "", readonly: "" },
    lastname: { value: "", readonly: "" },
    department: { value: "", readonly: "" },
    salary: { value: "", readonly: "" },
  })
);

app.post("/input", (req, res) => {
  if (!req.body) return res.statusCode(500);
  dataStorage
    .insert(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/updateform", (req, res) =>
  res.render("form", {
    title: "Update person",
    header1: "Update person data",
    action: "/updatedata",
    id: { value: "", readonly: "" },
    firstname: { value: "", readonly: "readonly" },
    lastname: { value: "", readonly: "readonly" },
    department: { value: "", readonly: "readonly" },
    salary: { value: "", readonly: "readonly" },
  })
);

app.post("/updatedata", (req, res) => {
  if (!req.body) return res.statusCode(500);

  dataStorage
    .getOne(req.body.id)
    .then((employee) =>
      res.render("form", {
        title: "Update person",
        header1: "Update person data",
        action: "/update",
        id: { value: employee.id, readonly: "readonly" },
        firstname: { value: employee.firstname, readonly: "" },
        lastname: { value: employee.lastname, readonly: "" },
        department: { value: employee.department, readonly: "" },
        salary: { value: employee.salary, readonly: "" },
      })
    )
    .catch((error) => sendErrorPage(res, error));
});

app.post("/update", (req, res) => {
  if (!req.body) return res.statusCode(500);
  dataStorage
    .update(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

// Adding one more rule
app.get("/removePerson", (req, res) =>
  res.render("getPerson", {
    title: "Remove",
    header1: "remove",
    action: "/removePerson",
  })
);

app.post("/removePerson", (req, res) => {
  // Throw server error if no request body
  if (!req.body) return res.sendStatus(500);
  // Otherwise handle data
  const personId = req.body.id;
  dataStorage
    .remove(personId)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.listen(port, host, () =>
  console.log(`Server ${host}:${port} is listening...`)
);

// Helper functions

function sendErrorPage(res, error, title = "Error", header1 = "Error") {
  sendStatusPage(res, error, title, header1);
}

function sendStatusPage(res, status, title = "Status", header1 = "Status") {
  return res.render("statusPage", { title, header1, status });
}
