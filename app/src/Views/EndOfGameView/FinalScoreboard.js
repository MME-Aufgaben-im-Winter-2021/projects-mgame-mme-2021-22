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

    updateScoreboard(players){
        players.forEach(player => {
            if(player !==null){
                let name = this.scoreTemplate.content.getElementById("username"),
                points = this.scoreTemplate.content.getElementById("points");
                name.content = player.name;
                points.content = player.points;

                let clone = document.importNode(this.scoreTemplate.content, true);
                this.scoreBoard.appendChild(clone);
            }
        });
    }

    addMemes(memes){
    this.memeView1.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[0].id + "\">";
    this.memeView2.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[1].id + "\">";
    this.memeView3.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[2].id + "\">";
    }
}
export default FinalScore;