import Config from "../utils/Config.js";
import RatingView from "../Views/RatingView/RatingView.js";

class RatingManager{
    constructor(stories){
        this.ratingRounds = stories.length;
        this.currentRound = 0;
        this.stories = stories;
        this.ratingView = new RatingView();
        console.log(this);
    }

    startRating(){
        //set views
        console.log("Start Rating");
        console.log(this.stories[this.currentRound]);
        let memes = this.stories[this.currentRound].MemeStories;
        this.ratingView.updateView(memes);
        ++this.currentRound;
        setTimeout(this.displayMeme.bind(this), Config.RATING_DURATION);
    }

    displayMeme(){
        while(this.currentRound < this.ratingRounds){
            this.startRating();
        }
        
    }
    
}

export default RatingManager;