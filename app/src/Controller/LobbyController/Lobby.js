// players wait here for game start, host invites new players and edits settings
import { AppwriteDAL } from "../../../services/AppwriteService.js";
import Config from "../../utils/Config.js";
import PlayerList from "../../Views/LobbyView/PlayerList.js";

var /*GameSettings = {
    roundsToPlay: 5,
    roundDuration: 120,
    gameMode: 0,
  },*/
  DAL = new AppwriteDAL(),
  leaveButton = document.getElementById("leave"),
  sessionData = await DAL.updateSession(),
  playerList = new PlayerList(sessionData.UserIDs),
  copyButton = document.getElementById("copyToken"),
  //Setting sliders and input fields
  roundCountRangeSetting = document.getElementById("round-count"),
  roundDurationRangeSetting = document.getElementById("round-length"),
  roundCountSetting = document.getElementById("input-round-count"),
  roundDurationSetting = document.getElementById("input-round-length"),
  playerCountSlider = document.getElementById("player-count"),
  playerCountInput = document.getElementById("input-player-count"),
  //lobby token code
  tokenText = document.getElementById("lobbyToken");

leaveButton.addEventListener("click", leaveLobby);
tokenText.value = sessionData.$id;
copyButton.addEventListener("click", copyToClipboard);

// init setting default values
roundCountSetting.value = roundCountRangeSetting.value = Config.MAX_ROUNDS;
roundDurationSetting.value = roundDurationRangeSetting.value = Config.MIN_ROUND_DURATION;

//Round Count
roundCountRangeSetting.addEventListener("input", function(){setRoundCount(roundCountRangeSetting.value);});
roundCountSetting.addEventListener("input", function (){setRoundCount(roundCountSetting.value);});
//Round Duration
roundDurationRangeSetting.addEventListener("input", function(){ setRoundDuration( roundDurationRangeSetting.value);});
roundDurationSetting.addEventListener("input", function (){ setRoundDuration(roundDurationSetting.value);});

function setRoundCount(count){
  roundCountSetting.value = count;
  roundCountRangeSetting.value = count;
}

function setRoundDuration(duration){
  roundDurationSetting.value = duration;
  roundDurationRangeSetting.value = duration;
}

function copyToClipboard() {
  tokenText.select();
  navigator.clipboard.writeText(tokenText.value);
  //alert("Copied token to clipboard" + tokenText.value);
}

function leaveLobby() {
  DAL.leaveLobby();
}
subscribeGame();
async function subscribeGame() {
  //const state = await DAL.updateSession();
  //playerList.updatePlayerList(state.UserIDs);
  DAL.subscribe(updateGamestate);
}

function updateGamestate(payload){
  console.log(payload.$id.toString());
  console.log(window.localStorage.getItem("documentID"));
  if(payload.$id.toString() === window.localStorage.getItem("documentID")){
    playerList.updatePlayerList(payload.UserIDs);
    console.log(playerList);
  }
}