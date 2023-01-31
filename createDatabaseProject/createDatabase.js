"use strict";

const Database = require("./database");

const printMessage = (message) => console.log(message);
const printStatement = (statement) => printMessage(statement + ";");
const printError = (message) =>
  printMessage(
    `${"#".repeat(20)} Error ${"#".repeat(20)}\n` +
      `\t${message}\n` +
      `${"#".repeat(47)}`
  );

let createStatementFile = "./createStatements.json";
let adminPass = "";

if (process.argv.length > 2) {
  adminPass = process.argv[2];
  if (process.argv.length > 3) {
    createStatementFile = `./${process.argv[3]}`;
  }
}

try {
  console.log(require(createStatementFile));
} catch (err) {
  printError(err.message);
}

async function createDb(createStatements, adminPass) {
  const options = {
    host: createStatements.host,
    port: createStatements.port,
    user: createStatements.admin,
    password: adminPass,
  };
  const DEBUG = createStatements.debug;
  const db = new Database(options);

  // 'jane'@'localhost'
  const user = `'${createStatements.user}'@'${createStatements.host}'`;
}
