/* eslint-env node */
import express from "express";
import {http} from "http";
import {Server} from "socket.io";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io(), app = express(), server = http.createServer(app), sdk = new Server(server);

sdk.attach(5000);

sdk.on("connection", (socket) => {
    console.log("a user connected to: " + socket);
});

function init() {
    console.log("### Starting MME Project ###");
    console.log(socket);
}

init();