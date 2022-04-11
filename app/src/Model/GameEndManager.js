import { AppwriteDAL } from "../../services/AppwriteService.js";
import Config from "../utils/Config.js";
import FinalScore from "../Views/EndOfGameView/FinalScoreboard.js";

class GameEndManager{
    constructor(){
        this.DAL = new AppwriteDAL();
        this.gameEndView = new FinalScore();
        this.gameEndView.endGameScreen.hidden = false;
        this.gameEndButton = document.getElementById("leaveGame");
        this.gameEndButton.addEventListener("click", this.endGameSession.bind(this));
    }

    async showFinalScore(round){
        let storyDocsOfLastRound = await this.DAL.downloadMemeStories(round),
        players = await this.DAL.getPlayers();
        players.sort((a,b) => a.PlayerScore > b.PlayerScore ? 1 : -1);
        //this.gameEndView.addMemes();
        this.gameEndView.updateScoreboard(players, storyDocsOfLastRound);
        // [doc1 doc2 doc3] => [ [player1docs], [player2docs] [player3docs]]
        
    }

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