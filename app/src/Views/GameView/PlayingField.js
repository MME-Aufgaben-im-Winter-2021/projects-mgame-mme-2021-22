/** playing field. players drop cards in here */
import Observable from "../../utils/Observable.js";
//View of playing field
class PlayingField extends Observable {

  constructor() {
    super();
    this.playingField = document.querySelector(".field");
    this.playingFieldArea = document.getElementById("playingField");

  }

  addMemeToPlayingField(memeView){
    this.playingField.innerHTML = memeView;
  }

  clearPlayingField(){
    this.playingField.innerHTML = "";
  }

  hideView(){
    this.playingField.hidden = true;
    this.playingFieldArea.hidden = true;
  }

  showView(){
    this.playingField.hidden = false;
    this.playingFieldArea.hidden = false;
  }

}
export default PlayingField;