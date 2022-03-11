/**
 * User enters nickname and submits
 */
 import {AppwriteDAL} from "./../../../services/appwriteConfig.js";
 var dal = new AppwriteDAL(), nickname = document.getElementById("nicknameInput"), sessionID = document.getElementById("lobbyIDInput"), hostButton = document.getElementById("host"),
 joinButton = document.getElementById("join");

//link event listener
 hostButton.addEventListener("click", hostSession);
 joinButton.addEventListener("click", joinSession);

function hostSession(){
    if(nickname.value){
        dal.createSession(nickname.value);
    }
    return 0;
}

function joinSession() {
        dal.joinSession(nickname.value, sessionID.value);
    return 0;
}