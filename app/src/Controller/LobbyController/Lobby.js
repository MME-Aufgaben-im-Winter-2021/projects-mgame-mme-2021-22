// players wait here for game start, host invites new players and edits settings
import { AppwriteDAL } from "../../../services/AppwriteService.js";
import Config from "../../utils/Config.js";
import LobbyView from "../../Views/LobbyView/LobbyView.js";

var 
  DAL = new AppwriteDAL(),
  leaveButton = document.getElementById("leave"),
  sessionData = await DAL.updateSession(),
  copyButton = document.getElementById("copyToken"),
  lobbyView = new LobbyView(),
  //Setting sliders and input fields
  roundCountRangeSetting = document.getElementById("round-count"),
  roundDurationRangeSetting = document.getElementById("round-length"),
  roundCountSetting = document.getElementById("input-round-count"),
  roundDurationSetting = document.getElementById("input-round-length"),
  startButton = document.getElementById("start"),
  //lobby token code
  tokenText = document.getElementById("lobbyToken");

startButton.addEventListener("click", function (){ console.log("Startled game as host"); DAL.updateGamestate(Config.GAME_STARTED);}); //lobbyView.setHidden(true); let gameManager = new GameManager(); gameManager.setGameStatePlay();
leaveButton.addEventListener("click", leaveLobby);
tokenText.value = sessionData.$id;
copyButton.addEventListener("click", copyToClipboard);

function copyToClipboard() {
  tokenText.select();
  navigator.clipboard.writeText(tokenText.value);
  //alert("Copied token to clipboard" + tokenText.value);
}
function init(){
// init setting default values
roundCountSetting.value = roundCountRangeSetting.value = Config.DEFAULT_ROUNDS;
roundDurationSetting.value = roundDurationRangeSetting.value = Config.DEFAULT_ROUND_DURATION;

//Round Count
roundCountRangeSetting.addEventListener("input", function(){DAL.updateSessionWithSettings(roundCountRangeSetting.value, null);});
roundCountSetting.addEventListener("input", function (){DAL.updateSessionWithSettings(roundCountSetting.value, null);});
//Round Duration
roundDurationRangeSetting.addEventListener("input", function(){ DAL.updateSessionWithSettings(null, roundDurationRangeSetting.value);});
roundDurationSetting.addEventListener("input", function (){ DAL.updateSessionWithSettings(null, roundDurationSetting.value);});

DAL.subscribe();

//disable host functions if player
if(window.localStorage.getItem(Config.ROLE_KEY) === Config.PLAYER_ROLE){
  roundCountSetting.disabled = true;
  roundCountRangeSetting.disabled = true;
  roundDurationRangeSetting.disabled = true;
  roundDurationSetting.disabled = true;
  startButton.disabled = true;
}
}

function leaveLobby() {
  DAL.leaveLobby();
}

init();
//subscribeGame();
/*
async function subscribeGame() {
  //const state = await DAL.updateSession();
  //playerList.updatePlayerList(state.UserIDs);
  DAL.subscribe(updateGamestate);
}

function updateGamestate(payload){
  console.log(payload.$id.toString());
  console.log(window.localStorage.getItem("documentID"));
  if(payload.$id.toString() === window.localStorage.getItem("documentID")){
    lobbyView.updatePlayerList(payload.UserIDs);
    console.log(lobbyView);
  }
}*/