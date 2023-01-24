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

function printWorkers(employees) {
  for (const person of employees) {
    console.log(
      `${person.id}:\t${person.firstname} ${person.lastname}` +
        `\t|\tDept: ${person.department},\tsalary: ${person.salary}`
    );
  }
}

async function getAll() {
  try {
    const result = await db.doQuery("select * from employee");
    if (result.resultSet) {
      printWorkers(result.queryResult);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getOne(id) {
  try {
    const result = await db.doQuery("select * from employee where id=?", [id]);
    printWorkers(result.queryResult);
  } catch (err) {
    console.log(err);
  }
}

// Main function
async function run() {
  console.log("------------------------- getAll ------------------------");
  await getAll();

  console.log("------------------------- getOne ------------------------");
  await getOne(2);
}

run();
