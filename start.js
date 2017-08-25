"use strict";

let boot = require("./index.js");

boot.start().catch(e => {
  console.error(e);
  process.exit(1);
});