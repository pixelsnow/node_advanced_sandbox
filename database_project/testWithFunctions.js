"use strict";

const Database = require("./database");

const options = {
  host: "127.0.0.1",
  port: 3306,
  user: "zeke",
  password: "1234",
  database: "employeeDB",
};

const db = new Database(options);

run();

async function getAll() {
  try {
    const result = await db.doQuery("select * from employee");
    if (result.resultSet) {
      console.log(result.queryResult);
    }
  } catch (err) {
    console.log(err);
  }
}

// Main function
async function run() {
  await getAll();
  await getAll();
}
