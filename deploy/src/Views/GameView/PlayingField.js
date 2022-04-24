/** playing field. players drop cards in here */
import Observable from "../../utils/Observable.js";
//View of playing field
class PlayingField extends Observable {

  constructor() {
    super();
    this.gameView = document.getElementById("game");
    this.playingFieldArray = [];
    this.playingField = document.querySelector(".field");
    this.promptField = document.getElementById("promptField");
    this.playingFieldArea = document.getElementById("playingField");

  }

}
export default PlayingField;