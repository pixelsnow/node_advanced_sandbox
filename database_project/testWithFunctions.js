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
      `${person.id}\t|\t${person.firstname} ${person.lastname}` +
        `\t|\tDept: ${person.department}\t|\tSalary: ${person.salary}`
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
    if (result.queryResult.length > 0) printWorkers(result.queryResult);
    else console.log(`No employee found with id=${id}`);
  } catch (err) {
    console.log(err);
  }
}

async function add(employee) {
  try {
    // Array of parameters that will be passed as a second argument
    const parameters = [
      employee.id,
      employee.firstname,
      employee.lastname,
      employee.department,
      employee.salary,
    ];
    // If order was different we woukd need to add (id, firstname, lastname, department, salary)
    const sql = "insert into employee values (?,?,?,?,?)";
    const status = await db.doQuery(sql, parameters);
    console.log(status);
  } catch (err) {
    console.log(err);
  }
}

async function remove(id) {
  try {
    const status = await db.doQuery("delete from employee where id=?", [id]);
    console.log(status);
  } catch (err) {
    console.log(err);
  }
}

async function update(modifiedEmployee) {
  try {
    const sql =
      "update employee set firstname=?, lastname=?, department=?, salary=? where id=?";
    const parameters = [
      modifiedEmployee.firstname,
      modifiedEmployee.lastname,
      modifiedEmployee.department,
      modifiedEmployee.salary,
      modifiedEmployee.id,
    ];
    const status = await db.doQuery(sql, parameters);
    console.log(status);
  } catch (err) {
    console.log(err);
  }
}

// Main function
async function run() {
  console.log("------------------------- getOne ------------------------");
  await getOne(2);
  console.log("------------------------- remove ------------------------");
  await remove(200);
  await remove(201);
  console.log("------------------------- add ------------------------");
  await add({
    id: 200,
    firstname: "Mike",
    lastname: "Jones",
    department: "maintenance",
    salary: 4000,
  });
  console.log("------------------------- update ------------------------");
  await update({
    id: 200,
    firstname: "Mike",
    lastname: "Jones",
    department: "admin",
    salary: 4500,
  });
  console.log("------------------------- getAll ------------------------");
  await getAll();
}

run();
