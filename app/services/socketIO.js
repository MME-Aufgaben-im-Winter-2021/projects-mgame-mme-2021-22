/* eslint-env node */
const io = require("./../src/Model/index.js").io;

export default function(socket){
    console.log("SocketId: "+ socket.id);
}