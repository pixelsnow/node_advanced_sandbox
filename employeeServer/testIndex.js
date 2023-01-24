"use strict";

const DataStorage = require("./storage/dataStorageLayer");

const storage = new DataStorage();

// we're gonna get something out of storage

// storage.getAll().then(console.log).catch(console.log);

// storage.getOne().then(console.log).catch(console.log);

//REMOVE
// storage.remove(7).then(console.log).catch(console.log);

(async () => {
  /* try {
    const result = await storage.getOne();
    console.log(result);
  } catch (err) {
    console.log(err);
    if (err.code === storage.CODES.NOT_FOUND) {
      console.log("This is missing");
    }
  } */

  // INSERT

  /* try {
    const status = await storage.insert({
      id: "7",
      firstname: "Jess",
      lastname: "River",
      department: "Marketing",
      salary: "2000",
    });
    console.log(status);
  } catch (err) {
    console.log(err);
  } */

  // UPDATE

  try {
    const status = await storage.update({
      id: "10",
      firstname: "Jess",
      lastname: "River",
      department: "Marketing",
      salary: "2500",
    });
    console.log(status);
  } catch (err) {
    console.log(err);
  }
})();
