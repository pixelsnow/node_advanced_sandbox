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

(async () => {
  try {
    const result = await db.doQuery("select * from employee");
    console.log(result);
    if (result.resultSet) {
      for (const person of result.queryResult) {
        console.log(`${person.firstname} ${person.lastname}`);
      }
    }

    // INSERTION TEST
    /* const insertResult = await db.doQuery(
      "insert into employee values(?,?,?,?,?)",
      [122, "Verax", "River", "ICT", 6000]
    );
    console.log(insertResult); */

    // DELETION TEST
    /* const deleteResult = await db.doQuery(
      "delete from employee where firstname=?",
      ["Verax"]
    );
    console.log(result); */
  } catch (err) {
    console.log(err);
  }
})();
