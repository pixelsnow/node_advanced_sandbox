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
    clearMessage();
    resultarea.innerHTML = "";
    try {
      const id = computerid.value.trim();
      if (id.length === 0) return;
      const data = await fetch(`http://localhost:4000/api/computers/${id}`, {
        mode: "cors",
      });
      const result = await data.json();
      if (result) {
        if (result.message) {
          // This means error
          updateMessage(result.message, result.type);
        }
        updateResult(result);
      }
      console.log(result);
    } catch (err) {
      updateMessage(`Not found. ${err.message}`, "error");
    }
  }

  function updateMessage(message, type) {
    messagearea.textContent = message;
    messagearea.setAttribute("class", type);
  }

  function clearMessage() {
    messagearea.textContent = "";
    messagearea.removeAttribute("class");
  }

  function updateResult(result) {
    if (result.length === 0) return;
    const computer = result[0];
    resultarea.innerHTML = `
    <p><span class="legend">ID </span>${computer.id}</p>
    <p><span class="legend">Name </span>${computer.name}</p>
    <p><span class="legend">Type </span>${computer.type}</p>
    <p><span class="legend">Processor </span>${computer.processor}</p>
    <p><span class="legend">Amount </span>${computer.amount}</p>
    `;
  }
})();
