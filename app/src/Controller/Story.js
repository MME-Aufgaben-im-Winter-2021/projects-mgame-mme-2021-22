
const STORY_TEMPLATE = document.querySelector("#finished-story").content
.querySelector("div.story-view").innerHTML;


class Story{

constructor(prompt, memes, player, id){

    this.prompt = prompt;
    this.score = 0;
    this.memes = memes;
    this.player = player;
    this.id = id;
    this.body = document.createElement("li");
    this.body.innerHTML = STORY_TEMPLATE;
    this.body.classList.add("story-view");
    this.playerNameElement = this.body.querySelector(".player");
    this.playerNameElement.innerHTML = player;
    this.firstMemeView = this.body.querySelector(".firstMeme");
    this.firstMemeView.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[0].image + "\">";
    this.secondMemeView = this.body.querySelector(".secondMeme"); 
    this.secondMemeView.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[1].image + "\">";
    this.thirdMemeView = this.body.querySelector(".thirdMeme"); 
    this.thirdMemeView.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[2].image + "\">";

}

addPoints(points){

    this.score += points;

}


}

export default Story;