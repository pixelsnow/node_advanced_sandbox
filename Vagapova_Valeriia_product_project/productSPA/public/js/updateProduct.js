"use strict";

(function () {
  let productIdField, nameField, modelField, typeField, priceField, messagearea;
  let searchState = true;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    productIdField = document.getElementById("productId");
    nameField = document.getElementById("name");
    modelField = document.getElementById("model");
    typeField = document.getElementById("type");
    priceField = document.getElementById("price");
    messagearea = document.getElementById("messagearea");

    updateFields();

    document.getElementById("submit").addEventListener("click", send);

    productIdField.addEventListener("focus", clearAll);
  }

  async function send() {
    clearMessage();

    try {
      if (searchState) {
        const id = productIdField.value.trim();
        if (id.length === 0) return;
        const data = await fetch(`http://localhost:4000/api/products/${id}`, {
          mode: "cors",
        });
        const result = await data.json();
        if (result) {
          if (result.message) {
            updateMessage(result.message, result.type);
          }
          updateProduct(result);
        }
      } else {
        const product = {
          productId: +productIdField.value,
          name: nameField.value,
          model: +modelField.value,
          type: typeField.value,
          price: +priceField.value,
        };
        const options = {
          method: "PUT",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        };
        const data = await fetch(
          `http://localhost:4000/api/products/${product.productId}`,
          options
        );
        const status = await data.json();
        if (status.message) {
          updateMessage(status.message, status.type);
        }
        searchState = true;
        updateFields();
      }
    } catch (err) {
      updateMessage(`Product not updated. ${err.message}`, "error");
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

  function clearAll() {
    if (searchState) {
      clearFieldValues();
      clearMessage();
    }
  }

  function updateFields() {
    if (searchState) {
      productIdField.removeAttribute("readonly");
      nameField.setAttribute("readonly", true);
      modelField.setAttribute("readonly", true);
      typeField.setAttribute("readonly", true);
      priceField.setAttribute("readonly", true);
    } else {
      productIdField.setAttribute("readonly", true);
      nameField.removeAttribute("readonly");
      modelField.removeAttribute("readonly");
      typeField.removeAttribute("readonly");
      priceField.removeAttribute("readonly");
    }
  }

  function clearFieldValues() {
    productIdField.value = "";
    nameField.value = "";
    modelField.value = "";
    typeField.value = "";
    priceField.value = "";
    searchState = true;
    updateFields();
  }

  function updateProduct(result) {
    if (!result.length) return;
    const product = result[0];
    productIdField.value = product.productId;
    nameField.value = product.name;
    modelField.value = product.model;
    typeField.value = product.type;
    priceField.value = product.price;
    searchState = false;
    updateFields();
  }
})();
