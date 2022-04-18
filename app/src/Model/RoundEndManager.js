import { AppwriteDAL } from "../../services/AppwriteService.js";
import Config from "../utils/Config.js";
import RoundScoreboard from "../Views/EndOfRoundView/RoundScoreboard.js";
//gets called when the round ends and shows scoreboard
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
        //playerDocs.sort((a,b)=> a.PlayerScore > b.PlayerScore ? 1 : -1); -- alt. idea to make this code function: playerDocs.sort((a,b)=> (a.PlayerScore*1 > b.PlayerScore*1) ? 1 : -1);
        
		playerDocs.sort( function(a,b) { return a.PlayerScore-b.PlayerScore; } );
        this.roundScoreboard.updateScoreboard(storiesOfLastRound, filteredPlayers);
    }
}

export default RoundEndManager;