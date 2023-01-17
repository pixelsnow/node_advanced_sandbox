"use strict";

const mariadb = require("mariadb");

// Run testA function
testA();

// Helper functions
async function testA() {
  const options = {
    host: "127.0.0.1",
    port: 3306,
    user: "zeke",
    password: "1234",
    database: "employeeDB",
  };
  const connection = await mariadb.createConnection(options);

  let result = await connection.query("select * from employee");

  delete result.meta;
  console.log(result);
  console.log(Object.entries(result[0]));
  console.log(result.map((item) => Object.values(item)));

  console.log("------------------------- test2 ------------------------");
  result = await connection.query({
    rowsAsArray: true,
    sql: "select * from employee",
  });
  delete result.meta;
  console.log(result);

  // Important to end a connection
  connection.end();
}
