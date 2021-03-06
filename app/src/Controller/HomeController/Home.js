//Homepage allows user to sign out of session or join a game
import { AppwriteDAL } from "../../../services/AppwriteService.js";

var dbLink = new AppwriteDAL(),
  logoutButton = document.getElementById(
  "logout"), 
  hostButton = document.getElementById("host"),
  usernameText = document.getElementById("username"),
  DAL = new AppwriteDAL(), joinButton = document.getElementById("join"),
  token = document.getElementById("token");
logoutButton.addEventListener("click", logout);
hostButton.addEventListener("click", hostGame);
joinButton.addEventListener("click", joinGame);

function logout() {
  dbLink.logout();
}

async function joinGame(){
    if(token.value !== null){
            let documentData = await DAL.joinSession(token.value);
            setGameStateToLobby(documentData.GameState);
    }
}

async function hostGame() {
  //returns promise as json
  let documentData = await dbLink.hostGame();
  //synchronize my state
  setGameStateToLobby(documentData.GameState); //do
}

function hasUser() {
  let promise = DAL.getAccount();
  promise.then(response => usernameText.innerHTML = response.name, () => window.location.replace("index.html"));
}

hasUser();

function setGameStateToLobby(targetState){
    try {
      let currentState = window.location.pathname;
      currentState = currentState.split("/").pop();
      if (currentState !== targetState) {
        switch (targetState) {
          case "lobby":
            window.location.replace("lobby.html");
            break;
          case "home":
            window.location.replace("homepage.html");
            break;
          default:
            break;
        }
        return "Switching page to: " + targetState;
      }
      return "Page correct";
    // eslint-disable-next-line no-alert
    } catch (error) {alert(error); }
    return true;
  
}