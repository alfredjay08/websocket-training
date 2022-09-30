"use strict";

const wsUri = "wss://ws.vi-server.org/mirror";
const websocket = new WebSocket(wsUri);
const form = document.getElementById("form__message");

let output;

const init = () => {
  output = document.getElementsByClassName("message__container")[0];

  websocket.onopen = (e) => onOpen(e);
  websocket.onclose = (e) => onClose(e);
  websocket.onmessage = (e) => onMsg(e);
  websocket.onerror = (e) => onError(e);
};

const onOpen = (e) => {
  console.log(e);
  writeMsg("Ready to Mirror");
};

const onMsg = (e) => {
  writeMsg(`<p style='color: blue;'>RESPONSE: ${e.data}`);
};

const onError = (e) => {
  writeMsg(`<p style='color: red;'>ERROR: ${e.data}`);
};

const sendMsg = (msg) => {
  writeMsg(`SENT: ${msg}`);
  websocket.send(msg);
};

const sendMessage = (e) => {
  e.preventDefault();

  const { message } = Object.fromEntries([...new FormData(e.currentTarget)]);

  sendMsg(`You: ${message}`);
};

const writeMsg = (msg) => {
  const text = document.createElement("p");
  text.innerHTML = msg;
  output.appendChild(text);
};

form.addEventListener("submit", sendMessage);
window.addEventListener("load", init, false);
