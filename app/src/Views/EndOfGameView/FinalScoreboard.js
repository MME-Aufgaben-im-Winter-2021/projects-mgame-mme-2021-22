
/* eslint-disable one-var */
class FinalScore{

    constructor(){
        this.scoreBoard = document.getElementById("endScoreboard");
        this.scoreTemplate = document.getElementById("userWithScore");
        this.endGameScreen = document.getElementById("gameEnd");
        this.memeView1 = document.getElementById("bestMeme1");
        this.memeView2 = document.getElementById("bestMeme2");
        this.memeView3 = document.getElementById("bestMeme3");
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
    sortByPoints(players){
    let sortedPlayers = [];
        
    for(let i = 0; i<players.length; i++){
            if(i === 0){
                sortedPlayers.push(players[i]);
            }
            else{
                for(let j = 0; j<sortedPlayers.length; j++){
                if(players[i].points > sortedPlayers[j].points){
                    sortedPlayers.splice(j,0,players[i]);
                    break;
                }
                else{
                    sortedPlayers.push(players[i]);
                }
            }
        }
    }
    return sortedPlayers;
    }

    addMemes(memes){
    this.memeView1.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[0].id + "\">";
    this.memeView2.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[1].id + "\">";
    this.memeView3.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[2].id + "\">";
    }
}
export default FinalScore;