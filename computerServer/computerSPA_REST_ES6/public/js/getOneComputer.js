import { updateMessage, clearMessage } from "/js/helperFunctions.js";

let resultarea, messagearea, computerid;

document.addEventListener("DOMContentLoaded", init);

function init() {
  resultarea = document.getElementById("resultarea");
  messagearea = document.getElementById("messagearea");
  computerid = document.getElementById("computerid");
  document.getElementById("submit").addEventListener("click", send);
}

async function send() {
  clearMessage(messagearea);
  resultarea.innerHTML = "";
  try {
    const id = computerid.value.trim();
    console.log("id is ", id, id.length);
    if (id.length === 0) return;
    const data = await fetch(`/getOne/${id}`);
    const result = await data.json();
    if (result) {
      if (result.message) {
        // This means error
        updateMessage(messagearea, result.message, result.type);
      }
      updateResult(result);
    }
    console.log(result);
  } catch (err) {
    console.log(err);
    updateMessage(messagearea, `Not found. ${err.message}`, "error");
  }
}

function updateResult(result) {
  if (!result.length) return;
  const computer = result[0];
  resultarea.innerHTML = `
    <p><span class="legend">ID </span>${computer.id}</p>
    <p><span class="legend">Name </span>${computer.name}</p>
    <p><span class="legend">Type </span>${computer.type}</p>
    <p><span class="legend">Processor </span>${computer.processor}</p>
    <p><span class="legend">Amount </span>${computer.amount}</p>
    `;
}
