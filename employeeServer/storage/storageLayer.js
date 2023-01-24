"use strict";

// TODO: add statuc codes if wanted

const path = require("path");

const { key, adapterFile, storageFile } = require("./storageConfig.json");

const { readStorage, writeStorage } = require("./readerWriter.js");

const storageFilePath = path.join(__dirname, storageFile);

const { adapt } = require(path.join(__dirname, adapterFile));

// console.log(storageFilePath);

async function getAllFromStorage() {
  // it's an async function so it will be returning an async function
  return readStorage(storageFilePath);
}

async function getFromStorage(id) {
  /* const test = await readStorage(storageFilePath);
  return test.find((item) => item[key] == id) || null; */
  return (
    (await readStorage(storageFilePath)).find((item) => item[key] == id) || null
  );
}

async function addToStorage(newEmployee) {
  const storageData = await readStorage(storageFilePath);
  storageData.push(adapt(newEmployee));
  return await writeStorage(storageFilePath, storageData);
}

async function updateStorage(modifiedObject) {
  const storageData = await readStorage(storageFilePath);
  const oldObject = storageData.find(
    (item) => item[key] == modifiedObject[key]
  );
  if (oldObject) {
    // if object found, update
    Object.assign(oldObject, adapt(modifiedObject));
    return await writeStorage(storageFilePath, storageData);
  } else {
    return false;
  }
}

async function removeFromStorage(id) {
  // reading the data from file
  const storageData = await readStorage(storageFilePath);
  // find the index of the value to remove
  const i = storageData.findIndex((item) => item[key] == id);
  // if negative was returned, nothing was found
  if (i < 0) return false;
  // Remove the item and return
  storageData.splice(i, 1);
  return await writeStorage(storageFilePath, storageData);
}

module.exports = {
  getAllFromStorage,
  getFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
};

// TESTING

// getAllFromStorage().then(console.log).catch(console.log);

//getFromStorage(2).then(console.log).catch(console.log);

/* addToStorage({
  id: "7",
  firstname: "Jess",
  lastname: "River",
  department: "Marketing",
  salary: "2000",
})
  .then(console.log)
  .catch(console.log); */

/* updateStorage({
  id: "7",
  firstname: "Jesse",
  lastname: "River",
  department: "Marketing",
  salary: "2000",
})
  .then(console.log)
  .catch(console.log); */

// removeFromStorage(7).then(console.log).catch(console.log);
