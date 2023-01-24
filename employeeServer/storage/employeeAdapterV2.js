"use strict";

// A bit of a nicer version

function adapt(item) {
  return Object.assign(item, { id: +item.id, salary: +item.salary });
}

module.exports = { adapt };
