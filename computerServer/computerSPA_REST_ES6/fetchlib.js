"use strict";

import * as http from "http";

// URI/URL = Universal Resource Indicator / Locator
const fetch = (uri, fetchOptions) =>
  new Promise((resolve, reject) => {
    const url = new URL(uri);
    const { hostname, port, pathname } = url;
    const options = {
      hostname,
      port,
      path: pathname,
    };
    // Combining fetchOptions and options
    Object.assign(options, fetchOptions);
    http
      .request(options, (res) => {
        const dataBuffer = [];
        res.on("data", (dataChunk) => dataBuffer.push(dataChunk));
        res.on("end", () =>
          resolve({
            json: () => JSON.parse(Buffer.concat(dataBuffer).toString()),
          })
        );
      })
      .on("error", () => reject("error"))
      .end(options.body);
  });

export { fetch };

/* 
fetch("http://127.0.0.1:4000/api/computers", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
});
 */
