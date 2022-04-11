/* eslint-disable one-var */

//view for final scoreboard
class FinalScore{

    constructor(){
        this.scoreBoard = document.getElementById("endScoreboard");
        this.scoreTemplate = document.getElementById("userWithScore");
        this.endGameScreen = document.getElementById("gameEnd");

    }

    updateScoreboard(players, stories){
        players.forEach(player => {
                let name = this.scoreTemplate.content.getElementById("username"),
                points = this.scoreTemplate.content.getElementById("points"),
                playerStory = stories.find(story => story.Player === player.PlayerName);

                name.innerHTML = player.PlayerName;

                points.innerHTML = player.PlayerScore + playerStory.Score;
                
                let clone = document.importNode(this.scoreTemplate.content, true);
                this.scoreBoard.appendChild(clone);
            
        });
    }

}
export default FinalScore;