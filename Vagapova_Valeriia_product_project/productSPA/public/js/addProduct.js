"use strict";

(function () {
  let productIdField, nameField, modelField, typeField, priceField, messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    productIdField = document.getElementById("productId");
    nameField = document.getElementById("name");
    modelField = document.getElementById("model");
    typeField = document.getElementById("type");
    priceField = document.getElementById("price");
    messagearea = document.getElementById("messagearea");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    const product = {
      productId: +productIdField.value,
      name: nameField.value,
      model: +modelField.value,
      type: typeField.value,
      price: +priceField.value,
    };
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      };
      const data = await fetch(`http://localhost:4000/api/products`, options);
      const status = await data.json();
      if (status.message) {
        updateMessage(status.message, status.type);
      }
    } catch (err) {
      updateMessage(`Product not added. ${err.message}`, "error");
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
