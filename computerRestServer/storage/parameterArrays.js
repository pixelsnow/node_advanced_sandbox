"use strict";

// Order matters here, must fit SQL statement
const toInsertArray = (computer) => [
  +computer.id,
  computer.name,
  computer.type,
  computer.processor,
  +computer.amount,
];

const toUpdateArray = (computer) => [
  computer.name,
  computer.type,
  computer.processor,
  +computer.amount,
  +computer.id,
];

module.exports = { toInsertArray, toUpdateArray };
