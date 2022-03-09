/* eslint-env node */
import {AppwriteDAL} from "./../../services/appwriteConfig.js";

var app = require("http").createServer(), io = module.exports.io = require("socket.io")(app);

const PORT = process.env.PORT || 5000, SocketManager = require("./../../services/socketIO");

io.on("connection", SocketManager);
app.listen(PORT, () =>{
    console.log("Connected to port: " + AppwriteDAL);
});

function init() {
    console.log("### Starting MME Project ###");
}

init();