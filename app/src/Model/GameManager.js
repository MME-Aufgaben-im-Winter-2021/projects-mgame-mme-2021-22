/**import GameProgressCard from "../Views/GameView/GameProgressCard"
import PlayingField from "../Views/GameView/PlayingField";
import Prompt from "../Views/GameView/Prompt";
*/
import GameProgressCard from "../Views/GameView/GameProgressCard.js";
import PlayingField from "../Views/GameView/PlayingField.js";
import Hand from "../Views/GameView/Hand.js";
import RatingView from "../Views/RatingView/RatingView.js";
import Prompt from "../Views/GameView/Prompt.js";

var path = window.location.pathname,
page = path.split("/").pop();


class GameManager{

constructor(){
    
   this.gameProgressCard = new GameProgressCard;

   this.checkFile();
}

checkFile(){
    switch (page) {
        case "game.html":
            this.hand = new Hand;
            this.playingField = new PlayingField;
            this.prompt = new Prompt;
            console.log("ibims");
          break;
        case "rating.html":
            this.ratingView = new RatingView;
            console.log("gtrgt");
            break;
        default:
             break;
      }
}

}
export default GameManager;