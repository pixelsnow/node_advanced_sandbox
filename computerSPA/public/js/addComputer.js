"use strict";

(function () {
  let idField, nameField, typeField, processorField, amountField, messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    idField = document.getElementById("id");
    nameField = document.getElementById("name");
    typeField = document.getElementById("type");
    processorField = document.getElementById("processor");
    amountField = document.getElementById("amount");
    messagearea = document.getElementById("messagearea");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    const computer = {
      id: +idField.value,
      name: nameField.value,
      type: typeField.value,
      processor: processorField.value,
      amount: +amountField.value,
    };
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(computer),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      };
      const data = await fetch(`http://localhost:4000/api/computers/`, options);
      const status = await data.json();
      if (status.message) {
        updateMessage(status.message, status.type);
      }
    } catch (err) {
      updateMessage(`Computer not added. ${err.message}`, "error");
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
})();
