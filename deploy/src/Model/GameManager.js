/**import GameProgressCard from "../Views/GameView/GameProgressCard"
import PlayingField from "../Views/GameView/PlayingField";
import Prompt from "../Views/GameView/Prompt";
*/
import GameProgressCard from "../Views/GameView/GameProgressCard.js";
import PlayingField from "../Views/GameView/PlayingField.js";
import Hand from "../Views/GameView/Hand.js";
import RatingView from "../Views/RatingView/RatingView.js";
import Prompt from "../Views/GameView/Prompt.js";

class GameManager{

constructor(){
    
   this.gameProgressCard = new GameProgressCard;
   this.PlayingField = new PlayingField;
   this.Hand = new Hand;
   this.RatingView = new RatingView;
   this.Prompt = new Prompt;
   this.handArea = document.getElementById("handArea");
   this.playingField = document.getElementById("playingField");
   this.ratingArea = document.getElementById("ratingArea");
   this.promptField = document.getElementById("promptField");
   this.progressField = document.getElementById("progressField");
   this.submitButton = document.querySelector(".submit");
   this.submitButton.addEventListener("click",this.setGameStateRate.bind(this));

}

setGameStateRate()
{
    console.log("huhu");
    this.RatingView.updateView(this.PlayingField.playingFieldArray);
    this.playingField.hidden = true;
    this.RatingView.hidden = false;

}

}
document.getElementById("playingField").hidden = true;
export default GameManager;