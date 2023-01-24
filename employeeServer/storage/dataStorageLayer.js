"use strict";

const { resolve } = require("path");
const { CODES, MESSAGES } = require("./statusCodes");

const {
  getAllFromStorage,
  getFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./storageLayer");

// Datastorage class

module.exports = class DataStorage {
  get CODES() {
    return CODES;
  }

  getAll() {
    return getAllFromStorage();
  }

  getOne(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("---empty---"));
      } else {
        const result = await getFromStorage(id);
        if (result) {
          // this goes to then
          resolve(result);
        } else {
          // this goes to catch
          reject(MESSAGES.NOT_FOUND(id));
        }
      }
    });
  }

  insert(employee) {
    return new Promise(async (resolve, reject) => {
      if (employee) {
        if (!employee.id) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getFromStorage(employee.id)) {
          reject(MESSAGES.ALREADY_IN_USE(employee.id));
        } else if (await addToStorage(employee)) {
          resolve(MESSAGES.INSERT_OK(employee.id));
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(employee) {
    return new Promise(async (resolve, reject) => {
      if (employee) {
        if (await updateStorage(employee)) {
          resolve(MESSAGES.UPDATE_OK(employee.id));
        } else {
          reject(MESSAGES.NOT_UPDATED(employee.id));
        }
      } else {
        reject(MESSAGES.NOT_UPDATED(employee.id));
      }
    });
  }

  remove(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("---empty---"));
      } else if (await removeFromStorage(id)) {
        resolve(MESSAGES.REMOVE_OK(id));
      } else {
        reject(MESSAGES.NOT_REMOVED(id));
      }
    });
  }
};
