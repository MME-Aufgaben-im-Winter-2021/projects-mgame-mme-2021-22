/** playing field. players drop cards in here */
import Observable from "../../utils/Observable.js";


class PlayingField extends Observable {

  constructor() {
    super();
    this.gameView = document.getElementById("game");
    this.playingFieldArray = [];
    this.playingField = document.querySelector(".field");
    this.promptField = document.querySelector(".promptField");
    this.playingFieldArea = document.getElementById("playingField");

  }
  

}
export default PlayingField;