import { updateMessage, clearMessage } from "/js/helperFunctions.js";

let idField, nameField, typeField, processorField, amountField, messagearea;
let searchState = true;

document.addEventListener("DOMContentLoaded", init);

function init() {
  idField = document.getElementById("id");
  nameField = document.getElementById("name");
  typeField = document.getElementById("type");
  processorField = document.getElementById("processor");
  amountField = document.getElementById("amount");
  messagearea = document.getElementById("messagearea");

  updateFields();

  document.getElementById("submit").addEventListener("click", send);

  idField.addEventListener("focus", clearAll);
}

async function send() {
  clearMessage(messagearea);

  try {
    if (searchState) {
      // Get computer
      const id = idField.value.trim();
      if (id.length === 0) return;
      const data = await fetch(`/getOne/${id}`);
      const result = await data.json();
      if (result) {
        if (result.message) {
          // This means error
          updateMessage(messagearea, result.message, result.type);
        }
        updateComputer(result);
      }
      console.log(result);
    } else {
      // Put computer
      const computer = {
        // pluses are not needed
        id: +idField.value,
        name: nameField.value,
        type: typeField.value,
        processor: processorField.value,
        amount: +amountField.value,
      };
      const options = {
        method: "POST",
        body: JSON.stringify(computer),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch(`/update`, options);
      const status = await data.json();
      if (status.message) {
        updateMessage(messagearea, status.message, status.type);
      }
      searchState = true;
      updateFields();
    }
  } catch (err) {
    updateMessage(messagearea, `Computer not updated. ${err.message}`, "error");
  }
}

function clearAll() {
  if (searchState) {
    clearFieldValues();
    clearMessage(messagearea);
  }
}

function updateFields() {
  if (searchState) {
    idField.removeAttribute("readonly");
    nameField.setAttribute("readonly", true);
    typeField.setAttribute("readonly", true);
    processorField.setAttribute("readonly", true);
    amountField.setAttribute("readonly", true);
  } else {
    idField.setAttribute("readonly", true);
    nameField.removeAttribute("readonly");
    typeField.removeAttribute("readonly");
    processorField.removeAttribute("readonly");
    amountField.removeAttribute("readonly");
  }
}

function clearFieldValues() {
  idField.value = "";
  nameField.value = "";
  typeField.value = "";
  processorField.value = "";
  amountField.value = "";
  searchState = true;
  updateFields();
}

function updateComputer(result) {
  if (!result.length) return;
  const computer = result[0];
  idField.value = computer.id;
  nameField.value = computer.name;
  typeField.value = computer.type;
  processorField.value = computer.processor;
  amountField.value = computer.amount;
  searchState = false;
  updateFields();
}
