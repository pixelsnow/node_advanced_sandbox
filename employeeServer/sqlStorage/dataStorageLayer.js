"use strict";

const Database = require("./database");
const options = require("./databaseOptions.json");
const { insertParameters, updateParameters } = require("./parameterFunctions");

const sql = require("./sqlStatements.json");

const getAllSql = sql.getAll.join(" ");
const getOneSql = sql.getOne.join(" ");
const insertSql = sql.insert.join(" ");
const updateSql = sql.update.join(" ");
const removeSql = sql.remove.join(" ");
const PRIMARY_KEY = sql.primaryKey;

const { CODES, MESSAGES } = require("./statusCodes");

// Datastorage class

module.exports = class DataStorage {
  constructor() {
    this.db = new Database(options);
  }

  get CODES() {
    return CODES;
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getAllSql);
        resolve(result.queryResult);
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }

  getOne(id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id) {
          reject(MESSAGES.NOT_FOUND("---empty---"));
        }
        const result = await this.db.doQuery(getOneSql, [id]);
        if (result.queryResult.length > 0) {
          // this goes to then
          resolve(result.queryResult[0]);
        }
        // this goes to catch
        reject(MESSAGES.NOT_FOUND(id));
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }

  insert(employee) {
    return new Promise(async (resolve, reject) => {
      try {
        // Check inputs
        if (!employee) {
          reject(MESSAGES.NOT_INSERTED());
        }
        if (!employee.id) {
          reject(MESSAGES.NOT_INSERTED());
        }
        // Check if employee with this id exists already
        const getEmployee = await this.db.doQuery(getOneSql, [employee.id]);
        if (getEmployee.queryResult.length > 0) {
          reject(MESSAGES.ALREADY_IN_USE(employee.id));
        }
        // Otherwise all good, insert
        await this.db.doQuery(insertSql, insertParameters(employee));
        resolve(MESSAGES.INSERT_OK(employee.id));
      } catch (err) {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(employee) {
    return new Promise(async (resolve, reject) => {
      try {
        // sCheck input
        if (!employee) {
          reject(MESSAGES.NOT_UPDATED(employee.id));
        }
        // All good, try to insert
        const status = await this.db.doQuery(
          updateSql,
          updateParameters(employee)
        );
        if (status.queryResult.rowsChanged) {
          resolve(MESSAGES.UPDATE_OK(employee.id));
        }
        // If nothing was updated, throw error
        reject(MESSAGES.NOT_UPDATED(employee.id));
      } catch (err) {
        reject(MESSAGES.NOT_UPDATED(employee?.id));
      }
    });
  }

  remove(id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Check input
        if (!id) {
          reject(MESSAGES.NOT_FOUND("---empty---"));
        }
        // Try to remove
        const status = await this.db.doQuery(removeSql, [id]);
        if (status.queryResult.rowsChanged > 0) {
          resolve(MESSAGES.REMOVE_OK(id));
        }
        // If no rows were changed, throw error
        reject(MESSAGES.NOT_REMOVED(id));
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
};
