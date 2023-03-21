"use strict";

const toInsertArray = (product) => [
  +product.productId,
  product.name,
  +product.model,
  product.type,
  +product.price,
];

const toUpdateArray = (product) => [
  product.name,
  +product.model,
  product.type,
  +product.price,
  +product.productId,
];

module.exports = { toInsertArray, toUpdateArray };
