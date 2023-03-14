function updateMessage(element, message, type) {
  element.textContent = message;
  element.setAttribute("class", type);
}

function clearMessage(element) {
  element.textContent = "";
  element.removeAttribute("class");
}

export { updateMessage, clearMessage };
