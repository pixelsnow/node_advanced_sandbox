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
    // If getting 'ER_CANNOT_RETRIEVE_RSA_KEY' error, try this:
    // allowPublicKeyRetrieval: true,
  };

  // Opens the connection to the database, returns Promise
  const connection = await mariadb.createConnection(options);

  console.log("------------------------- test1 ------------------------");
  // Sends a statement to a database, database needs to be started by now
  let result = await connection.query("select * from employee");

  delete result.meta;
  // console.log(result);
  // console.log(Object.entries(result[0]));
  console.log(result.map((item) => Object.values(item)));

  console.log("------------------------- test2 ------------------------");
  result = await connection.query({
    rowsAsArray: true,
    sql: "select * from employee",
  });
  delete result.meta;
  console.log(result);

  console.log("------------------------- test3 ------------------------");
  /* Question marks as placeholders, then passing an array with values to replace question marks */
  result = await connection.query("select * from employee where id=?", [1]);
  delete result.meta;
  console.log(result);

  // Important to end a connection
  connection.end();
}
