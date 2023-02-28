"use strict";

(function () {
  let inputField, messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    inputField = document.getElementById("computerid");
    messagearea = document.getElementById("messagearea");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    const id = inputField.value;
    try {
      console.log("trying");
      const options = {
        method: "DELETE",
        mode: "cors",
      };
      const result = await fetch(
        `http://localhost:4000/api/computers/${id}`,
        options
      );
      const status = await result.json();
      if (status.message) {
        updateMessage(status.message, status.type);
      }
    } catch (err) {
      console.log(err);
      updateMessage(
        `Computer with id ${id} was not deleted. ${err.message}`,
        "error"
      );
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
