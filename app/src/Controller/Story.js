
class Story{

constructor(prompt, memes, player, id){
    this.prompt = prompt;
    this.score = 0;
    this.memes = memes;
    this.player = player;
    this.id = id;

}

addPoints(points){

    this.score += points;

}


}

export default Story;