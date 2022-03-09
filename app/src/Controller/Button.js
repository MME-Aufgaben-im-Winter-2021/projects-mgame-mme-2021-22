import Observable from "../../utils/Observable.js";

var nicknameInput,
  lobbyIDInput,
  lobbyJoin,
  lobbyCreate;

class LoginButtons extends Observable {

    constructor(){
        super();
        nicknameInput = document.querySelector("#nicknameInput");
        lobbyIDInput = document.querySelector("#lobbyIDInput");
        lobbyJoin = document.querySelector("#lobbyJoin");
        lobbyCreate = document.querySelector("#lobbyCreate");
        lobbyJoin.addEventListener("joinLobbyEvent", joinLobby(nicknameInput));
        lobbyCreate.addEventListener("createNewLobbyEvent", createLobby());
    }

    joinLobby(nicknameInput2){
        console.log("test"+nicknameInput2);
    
    }
    
}

//for tests placed outside the class
function createLobby(){
    console.log("test");
}



