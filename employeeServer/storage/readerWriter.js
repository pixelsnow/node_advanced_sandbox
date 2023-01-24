"use strict";

const fs = require("fs").promises;

async function readStorage(storageFile) {
  try {
    const data = await fs.readFile(storageFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

async function writeStorage(storageFile, data) {
  try {
    // last parameter - flags
    await fs.writeFile(storageFile, JSON.stringify(data, null, 4), {
      encoding: "utf8",
      flag: "w",
    });
    // wait until writing is done and thern return true
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = { readStorage, writeStorage };

// TESTING

// readStorage("./employee.json").then(console.log).catch(console.log);
/* writeStorage("./test.json", { a: 1, b: "text" })
  .then(console.log)
  .catch(console.log); */

// VERSION WITHOUT PROMISES AT IMPORT

/* const fs = require("fs");

async function readStorage(storageFile) {
  try {
    const data = await fs.promises.readFile(storageFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
    return [];
  }
}
 */
