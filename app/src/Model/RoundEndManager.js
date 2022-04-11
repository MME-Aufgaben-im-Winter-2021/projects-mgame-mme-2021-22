import { AppwriteDAL } from "../../services/AppwriteService.js";
import Config from "../utils/Config.js";
import RoundScoreboard from "../Views/EndOfRoundView/RoundScoreboard.js";

class RoundEndManager {
    constructor() {
        this.DAL = new AppwriteDAL();
        this.roundScoreboard = new RoundScoreboard(); //View
        this.roundScoreboard.scoreboardView.hidden = false;
        this.continueButton = document.getElementById("continue");
        this.continueButton.addEventListener("click", this.hostContinueRound.bind(this));
        if(window.localStorage.getItem(Config.ROLE_KEY) === Config.PLAYER_ROLE){
            this.continueButton.disabled = true;
        }
    }

    hostContinueRound(){
        this.DAL.updateGameState(Config.GAME_STARTED);
    }

    continueToNextRound(){
        this.roundScoreboard.scoreboardView.hidden = true;
    }


    async showRoundScore(round){
        //get all docs -> filter for player scores -> get player array
        let storiesOfLastRound = await this.DAL.downloadMemeStories(round), 
        playerDocs = await this.DAL.getPlayers(), filteredPlayers = playerDocs.filter(player => player.GameSession === window.localStorage.getItem(Config.DOCUMENT_STORAGE_KEY));
        this.roundScoreboard.updateScoreboard(storiesOfLastRound, filteredPlayers);
    }
}

export default RoundEndManager;