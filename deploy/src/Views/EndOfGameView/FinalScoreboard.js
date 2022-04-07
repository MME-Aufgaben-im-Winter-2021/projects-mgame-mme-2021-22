class FinalScore{

    constructor(){
        this.endGameScreen = document.getElementById("gameEnd");
        this.memeView1 = document.getElementById("bestMeme1");
        this.memeView2 = document.getElementById("bestMeme2");
        this.memeView3 = document.getElementById("bestMeme3");
    }

    addMemes(memes){
    this.memeView1.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[0].id + "\">";
    this.memeView2.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[1].id + "\">";
    this.memeView3.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[2].id + "\">";
    }
}
export default FinalScore;