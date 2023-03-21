"use strict";

(function () {
  let resultarea, messagearea, inputField;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    messagearea = document.getElementById("messagearea");
    inputField = document.getElementById("productId");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    resultarea.innerHTML = "";
    try {
      const id = inputField.value.trim();
      if (id.length === 0) return;
      const data = await fetch(`http://localhost:4000/api/products/${id}`, {
        mode: "cors",
      });
      const result = await data.json();
      if (result) {
        if (result.message) {
          updateMessage(result.message, result.type);
        }
        updateResult(result);
      }
      console.log(result);
    } catch (err) {
      console.log(err);
      updateMessage(`Product not found. ${err.message}`, "error");
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
    if (!result.length) return;
    const product = result[0];
    resultarea.innerHTML = `
    <p><span class="legend">ID </span>${product.productId}</p>
    <p><span class="legend">Name </span>${product.name}</p>
    <p><span class="legend">Model </span>${product.model}</p>
    <p><span class="legend">Type </span>${product.type}</p>
    <p><span class="legend">Price </span>${product.price}</p>
    `;
  }
})();
