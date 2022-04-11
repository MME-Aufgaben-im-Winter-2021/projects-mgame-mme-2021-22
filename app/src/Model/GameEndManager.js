import { AppwriteDAL } from "../../services/AppwriteService.js";
import FinalScore from "../Views/EndOfGameView/FinalScoreboard.js";

class GameEndManager{
    constructor(){
        this.DAL = new AppwriteDAL();
        this.gameEndView = new FinalScore();
        this.gameEndView.endGameScreen.hidden = false;
        //leave button
    }

    async showFinalScore(round){
        let storyDocsOfLastRound = await this.DAL.downloadMemeStories(round),
        players = await this.DAL.getPlayers();
        this.gameEndView.addMemes();
        this.gameEndView.updateScoreboard(players, storyDocsOfLastRound);
        // [doc1 doc2 doc3] => [ [player1docs], [player2docs] [player3docs]]
        
    }

    endGameSession(){
        //remove everything and move player to homescreen
    }
}
export default GameEndManager;