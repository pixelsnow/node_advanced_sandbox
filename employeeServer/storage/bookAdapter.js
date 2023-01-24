"use strict";

// A bit of a nicer version

function adapt(item) {
  return Object.assign(item, { number: +item.number });
}

module.exports = { adapt };
