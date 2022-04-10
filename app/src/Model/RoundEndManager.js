import { AppwriteDAL } from "../../services/AppwriteService.js";
import Config from "../utils/Config.js";
import RoundScoreboard from "../Views/EndOfRoundView/RoundScoreboard.js";

class RoundEndManager {
    constructor() {
        this.DAL = new AppwriteDAL();
        this.roundScoreboard = new RoundScoreboard(); //View
        this.roundScoreboard.scoreboardView.hidden = false;
        this.continueButton = document.getElementById("continue");
        this.continueButton.addEventListener("click", this.DAL.updateGameState(Config.GAME_STARTED));
        if(window.localStorage.getItem(Config.ROLE_KEY) === Config.PLAYER_ROLE){
            this.continueButton.disabled = true;
        }
    }

    async showRoundScore(round){
        //get all docs -> filter for player scores -> get player array
        let docArr = await this.DAL.downloadMemeStories(), filtered = docArr.filter(doc => doc.Session === window.localStorage.getItem(Config.DOCUMENT_STORAGE_KEY));
    }
}

export default RoundEndManager;