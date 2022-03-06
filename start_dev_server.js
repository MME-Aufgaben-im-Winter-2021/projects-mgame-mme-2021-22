/* eslint-env node */

import "dotenv/config";
import express from "express";
import open from "open";
import { Server } from "socket.io";
import * as http from "http";

function init() {
    let app = express(),server = http.createServer(app), io = new Server(server);
    app.use("/", express.static("app/"));
    //use sendFile as descriped in socket.io example
    /*app.get("/", (req, res) => {
        res.sendFile("index.html", {root: "./app"});
    });*/

    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        socket.on("chat message", (msg) => {
            console.log("message: "+ msg);
            io.emit("chat message", msg);
        });
    });

    server.listen(process.env.DEV_PORT, function() {
        console.log("Server started. Opening application in browser ... [Press CTRL + C to stop server]");
        open(`http://localhost:${process.env.DEV_PORT}`);
    });
}

init();