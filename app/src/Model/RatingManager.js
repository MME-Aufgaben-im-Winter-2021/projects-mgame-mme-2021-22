/* eslint-disable no-magic-numbers */
import { AppwriteDAL } from "../../services/AppwriteService.js";
import Config from "../utils/Config.js";
import RatingView from "../Views/RatingView/RatingView.js";

class RatingManager{
    constructor(stories){
        this.ratingRounds = stories.length;
        this.currentRound = 0;
        this.stories = stories;
        this.ratingView = new RatingView();
        this.currentDocument = "";
        this.DAL = new AppwriteDAL();

        this.goodButton = document.getElementById("good");
        this.mehButton = document.getElementById("meh");
        this.badButton = document.getElementById("bad");

        this.goodButton.addEventListener("click", this.votedGood.bind(this));
        this.mehButton.addEventListener("click", this.votedMeh.bind(this));
        this.badButton.addEventListener("click", this.votedBad.bind(this));
    }

    startRating(){
        this.enableVoting();
        //set views
        let memes = this.stories[this.currentRound].MemeStories;
        this.currentDocument = this.stories[this.currentRound].$id;
        this.ratingView.updateView(memes);
        ++this.currentRound;
        setTimeout(this.displayMeme.bind(this), Config.RATING_DURATION);
    }

    displayMeme(){
        if (this.currentRound < this.ratingRounds){
            this.startRating();
        }else{
            //end rating phase
            if( window.localStorage.getItem(Config.ROLE_KEY) === Config.HOST_ROLE){
                this.DAL.updateGameState(Config.ROUND_ENDED);
            }
        }
        
    }

    votedGood() {
        this.playRatingSound(true);
        //updateScore
        this.DAL.updateScore(Config.POINTS_FOR_GOOD, this.currentDocument);
        this.disableVoting();
      }
    
      votedMeh() {
        //updateScore
        this.DAL.updateScore(Config.POINTS_FOR_MEH, this.currentDocument);
        this.disableVoting();
      }
    
      votedBad() {
        this.playRatingSound(false);
        //updateScore
        this.DAL.updateScore(Config.POINTS_FOR_BAD, this.currentDocument);
        this.disableVoting();
      }

      disableVoting(){
          this.goodButton.disabled = true;
          this.mehButton.disabled = true;
          this.badButton.disabled = true;
      }
      enableVoting(){
        this.goodButton.disabled = false;
        this.mehButton.disabled = false;
        this.badButton.disabled = false;
    }
    
    playRatingSound(good){
    
        if (good){
          let rand = Math.floor(Math.random() * Config.GOOD_AUDIO_NUM),
    
           audio = new Audio("/resources/rating_audio/good"+rand+".mp3");
          switch(rand){
            case 2: audio.volume = 0.07; break;
            case 4: audio.volume = 0.07; break;
            case 6: audio.volume = 0.07; break;
            case 7: audio.volume = 0.35; break;
            case 8: audio.volume = 0.07; break;
            case 9: audio.volume = 0.17; break;
            case 10: audio.volume = 0.07; break;
            case 11: audio.volume = 0.06; break;
            case 12: audio.volume = 0.17; break;
            case 13: audio.volume = 0.2; break;
            case 15: audio.volume = 0.06; break;
            case 17: audio.volume = 0.06; break;
            case 18: audio.volume = 0.17; break;
            case 19: audio.volume = 0.05; break;
            default: audio.volume = 0.1; break;
          }
          audio.play();
        }
        else{
          let rand = Math.floor(Math.random() * Config.BAD_AUDIO_NUM),
          audio = new Audio("/resources/rating_audio/bad"+rand+".mp3");
          
          switch(rand){
            case 0: audio.volume = 0.07; break;
            case 2: audio.volume = 0.3; break;
            case 15: audio.volume = 0.4; break;
            case 18: audio.volume = 0.2; break;
            case 20: audio.volume = 0.07; break;
    
            default: audio.volume = 0.1; break;
          }
          audio.play();
        }
      }
}

export default RatingManager;