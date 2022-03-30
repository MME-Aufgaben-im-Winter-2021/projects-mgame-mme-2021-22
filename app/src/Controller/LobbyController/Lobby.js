// players wait here for game start, host invites new players and edits settings
import {AppwriteDAL} from "../../../services/appwriteConfig.js";
import PlayerList from "../../Views/LobbyView/PlayerList.js";

var GameSettings = {
    roundsToPlay: 5,
    roundDuration: 120,
    gameMode: 0,
}, DAL = new AppwriteDAL(), leaveButton = document.getElementById("leave"), sessionData = DAL.updateSession(),
    playerList = new PlayerList(sessionData.UserIDs);

console.log(sessionData);