import { AppwriteDAL } from "../../services/AppwriteService.js";
import Config from "../utils/Config.js";
import FinalScore from "../Views/EndOfGameView/FinalScoreboard.js";
//loads final standings
class GameEndManager{
    constructor(){
        this.DAL = new AppwriteDAL();
        this.gameEndView = new FinalScore();
        this.gameEndView.endGameScreen.hidden = false;
        this.gameEndButton = document.getElementById("leaveGame");
        this.gameEndButton.addEventListener("click", this.endGameSession.bind(this));
    }

    //sets final score
    async showFinalScore(round){
        let storyDocsOfLastRound = await this.DAL.downloadMemeStories(round),
        players = await this.DAL.getPlayers();
        players.sort((a,b) => a.PlayerScore > b.PlayerScore ? 1 : -1);
        this.gameEndView.updateScoreboard(players, storyDocsOfLastRound);
        
    }

    //ends the game and deletes all created files
    endGameSession(){
        //remove everything and move player to homescreen
        if(window.localStorage.getItem(Config.ROLE_KEY) === Config.HOST_ROLE){
            this.DAL.deleteGameFiles();
        }else{
            window.localStorage.clear();
            window.location.replace("homepage.html");
        }
    }
}
export default GameEndManager;