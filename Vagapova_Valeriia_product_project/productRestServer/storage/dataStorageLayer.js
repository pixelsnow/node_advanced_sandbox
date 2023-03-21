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

const PRIMARY_KEY = sql.primaryKey;

module.exports = class DataStorage {
  constructor() {
    this.db = new Database(options);
  }

  get CODES() {
    return CODES;
  }

  get resource() {
    return sql.resourse;
  }

  getAll() {
    console.log("enter getAll");
    return new Promise(async (resolve, reject) => {
      try {
        console.log("trying getAll");
        console.log(getAllSql);
        const result = await this.db.doQuery(getAllSql);
        console.log("result", result);
        resolve(result.queryResult);
      } catch (err) {
        console.log(err);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }

  get(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getSql, [key]);
        if (result.queryResult.length > 0) {
          resolve(result.queryResult);
        } else {
          resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, key));
        }
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }

  insert(resourceObject) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.db.doQuery(insertSql, toInsertArray(resourceObject));
        resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, resourceObject[PRIMARY_KEY]));
      } catch (err) {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(key, resourceObject) {
    return new Promise(async (resolve, reject) => {
      try {
        if (key && resourceObject) {
          if (resourceObject[PRIMARY_KEY] !== +key) {
            reject(MESSAGES.KEY_NO_NOT_MATCH(resourceObject[PRIMARY_KEY], key));
          }
          const resultGet = await this.db.doQuery(getSql, key);
          if (resultGet.queryResult.length > 0) {
            const result = await this.db.doQuery(
              updateSql,
              toUpdateArray(resourceObject)
            );
            if (result.queryResult.rowsChanged === 0) {
              resolve(MESSAGES.NOT_UPDATED(PRIMARY_KEY, key));
            } else {
              resolve(MESSAGES.UPDATE_OK(PRIMARY_KEY, key));
            }
          } else {
            this.insert(resourceObject)
              .then((status) => resolve(status))
              .catch((err) => reject(err));
          }
        } else {
          resolve(MESSAGES.NOT_UPDATED());
        }
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }

  remove(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(removeSql, [key]);
        if (result.queryResult.rowsChanged === 0) {
          resolve(MESSAGES.NOT_REMOVED(PRIMARY_KEY, key));
        } else {
          resolve(MESSAGES.REMOVE_OK(PRIMARY_KEY, key));
        }
      } catch (err) {
        console.log(err);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
};
