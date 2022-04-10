import { AppwriteDAL } from "../../services/AppwriteService.js";
import Config from "../utils/Config.js";
import RoundScoreboard from "../Views/EndOfRoundView/RoundScoreboard.js";

class RoundEndManager {
    constructor() {
        this.DAL = new AppwriteDAL();
        this.roundScoreboard = new RoundScoreboard();
        this.continueButton = document.getElementById("continue");
        this.continueButton.addEventListener("click", this.DAL.updateGameState(Config.GAME_STARTED));
        if(window.localStorage.getItem(Config.ROLE_KEY) === Config.PLAYER_ROLE){
            this.continueButton.disabled = true;
        }
    }
}