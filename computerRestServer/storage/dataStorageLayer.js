"use strict";

// Ideally should be parametrised
const Database = require("./database");
const options = require("./databaseOptions.json");
const sql = require("./sqlStatements.json");
const { toInsertArray, toUpdateArray } = require("./parameterArrays");
const { CODES, MESSAGES } = require("./statusCodes");

// Could also be done with an array, especially if there's more items
const getAllSql = sql.getAll.join(" ");
const getSql = sql.get.join(" ");
const insertSql = sql.insert.join(" ");
const updateSql = sql.update.join(" ");
const removeSql = sql.remove.join(" ");

const primaryKey = sql.primaryKey;

console.log(getAllSql);
console.log(getSql);
console.log(insertSql);
console.log(updateSql);
console.log(removeSql);
