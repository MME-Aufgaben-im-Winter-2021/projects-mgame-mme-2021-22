//Homepage allows user to sign out of session or join a game
import { AppwriteDAL } from "../../services/appwriteConfig.js";
import Synchronizer from "../../services/Synchronizer.js";
import Config from "../Model/Config.js";

var dbLink = new AppwriteDAL(), logoutButton = document.getElementById("logout"), //joinButton = document.getElementById("join")
hostButton = document.getElementById("host");
logoutButton.addEventListener("click", logout);
hostButton.addEventListener("click", hostGame);

function logout(){
    dbLink.logout();
}

async function hostGame(){
    //returns promise as json
    let documentData = await dbLink.hostGame(), documentID = documentData.$id, sync = new Synchronizer();
    console.log(documentID);
    //get sessionID
    window.localStorage.setItem("documentID", JSON.stringify(documentID));
    //synchronize my state
    sync.synchronizeGameState(documentData.GameState);
}