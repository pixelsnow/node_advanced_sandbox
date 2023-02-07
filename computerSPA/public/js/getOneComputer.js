"use strict";

(function () {
  let resultarea;
  let messagearea;
  let computerid;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    messagearea = document.getElementById("messagearea");
    computerid = document.getElementById("computerid");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    try {
      const data = await fetch(
        `http://localhost:4000/api/computers/${computerid.value}`
      );
      console.log(data);
    } catch (err) {}
  }
})();
