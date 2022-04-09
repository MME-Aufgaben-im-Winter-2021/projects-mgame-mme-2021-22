//Homepage allows user to sign out of session or join a game
import { AppwriteDAL } from "../../../services/AppwriteService.js";
import Synchronizer from "../../../services/Synchronizer.js";
//import Config from "../../utils/Config.js";

var dbLink = new AppwriteDAL(),
  logoutButton = document.getElementById(
  "logout"), //joinButton = document.getElementById("join")
  hostButton = document.getElementById("host"),
  usernameText = document.getElementById("username"),
  DAL = new AppwriteDAL(), joinButton = document.getElementById("join"), 
  token = document.getElementById("token"),
  sync = new Synchronizer();

logoutButton.addEventListener("click", logout);
hostButton.addEventListener("click", hostGame);
joinButton.addEventListener("click", joinGame);
//token.addEventListener("click", lambda => token.value = "");

function logout() {
  dbLink.logout();
}

async function joinGame(){
    if(token.value !== null){
        try{
            let promise = await DAL.joinSession(token.value);
            sync.subscribeToGame(); // while -> update views with every document update
            sync.synchronizeGameState(promise.GameState); //do
        }catch(exception){
           // eslint-disable-next-line no-alert
           alert("Invalid token");
        }
    }
}

async function hostGame() {
  //returns promise as json
  let documentData = await dbLink.hostGame();
  //synchronize my state
  sync.subscribeToGame(); // while 
  sync.synchronizeGameState(documentData.GameState); //do
}

//.then(response => usernameText.innerHTML = response.name, error => console.log(error)); //window.location.replace("login.html")

function hasUser() {
  let promise = DAL.getAccount();
  promise.then(response => usernameText.innerHTML = response.name, () => window.location.replace("login.html"));
}

hasUser();