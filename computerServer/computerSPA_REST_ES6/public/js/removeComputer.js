import { updateMessage, clearMessage } from "/js/helperFunctions.js";

let inputField, messagearea;

document.addEventListener("DOMContentLoaded", init);

function init() {
  inputField = document.getElementById("computerid");
  messagearea = document.getElementById("messagearea");
  document.getElementById("submit").addEventListener("click", send);
}

async function send() {
  clearMessage(messagearea);
  const id = inputField.value;
  try {
    console.log("trying");
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    const result = await fetch(`/remove`, options);
    const status = await result.json();
    console.log(status);
    if (status.message) {
      updateMessage(messagearea, status.message, status.type);
    }
  } catch (err) {
    console.log(err);
    updateMessage(
      messagearea,
      `Computer with id ${id} was not deleted. ${err.message}`,
      "error"
    );
  }
}
