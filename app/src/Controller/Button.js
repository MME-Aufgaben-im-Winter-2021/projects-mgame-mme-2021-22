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
        console.log(lobbyIDInput);
        lobbyJoin = document.querySelector("#lobbyJoin");
        lobbyCreate = document.querySelector("#lobbyCreate");
        lobbyJoin.addEventListener("click", this.joinLobby(nicknameInput));
        lobbyCreate.addEventListener("click", createLobby());
    }

    joinLobby(nicknameInput2){
        console.log("test"+nicknameInput2);
    
    }
    
}

//for tests placed outside the class
function createLobby(){
    console.log("test");
}



export default LoginButtons;



