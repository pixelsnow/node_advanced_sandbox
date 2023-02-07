"use strict"(function () {
  let method = "GET";
  let urifield;
  let jsonarea;
  let messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    urifield = document.getElementById("urifield");
    jsonarea = document.getElementById("jsonarea");
    messagearea = document.getElementById("messagearea");

    document.getElementById("submit").addEventListener("click", send);
    document.getElementById("methods").addEventListener("change", choose);

    clearSelections();
    urifield.value = "http://localhost:4000/api/";
  }
});
