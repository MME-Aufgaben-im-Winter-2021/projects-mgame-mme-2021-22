// players wait here for game start, host invites new players and edits settings
import { AppwriteDAL } from "../../../services/AppwriteService.js";
import PlayerList from "../../Views/LobbyView/PlayerList.js";

var GameSettings = {
    roundsToPlay: 5,
    roundDuration: 120,
    gameMode: 0,
  },
  DAL = new AppwriteDAL(),
  leaveButton = document.getElementById("leave"),
  sessionData = await DAL.updateSession(),
  playerList = new PlayerList(sessionData.UserIDs),
  copyButton = document.getElementById("copyToken"),
  tokenText = document.getElementById("lobbyToken");

leaveButton.addEventListener("click", leaveLobby);
tokenText.value = sessionData.$id;
copyButton.addEventListener("click", copyToClipboard);

function copyToClipboard() {
  tokenText.select();
  navigator.clipboard.writeText(tokenText.value);
  //alert("Copied token to clipboard" + tokenText.value);
}

function leaveLobby() {
  DAL.leaveLobby();
}
updateGame();
async function updateGame() {
  //const state = await DAL.updateSession();
  //playerList.updatePlayerList(state.UserIDs);
  DAL.subscribe();

}