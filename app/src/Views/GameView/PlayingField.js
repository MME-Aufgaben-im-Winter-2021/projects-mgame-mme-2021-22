/** playing field. players drop cards in here */
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";



var playingField,
  promptField;


class PlayingField extends Observable {

  constructor() {
    super();
    this.playingFieldArray = [];
    this.submitButton = document.querySelector(".submit");
    this.submitButton.addEventListener("click",this.submitMemes.bind(this));
    playingField = document.querySelector(".field");
    promptField = document.querySelector(".promptField");
    promptField.innerHTML =
      "<h1> Describe your funniest moment last year </h1>";
  }

  addMeme(memeName, imageSource) {
    if (this.playingFieldArray.length < 3) {
      let newMeme = new Meme(memeName + this.playingFieldArray.length, imageSource);
      this.playingFieldArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
      this.updatePlayingField();
    }
  }

  removeMeme(memeName) {
    this.playingFieldArray = this.playingFieldArray.filter((meme) => meme.id !==
      memeName);
    this.updatePlayingField();
  }

  updatePlayingField() {
    playingField.innerHTML = "";
    for (const meme of this.playingFieldArray) {
      playingField.appendChild(meme.body);
    }
  }
  checkMeme(event) {
    let memeName = event.data[0],
      location = event.data[1],
      swappingMeme = event.data[2];

    if (location === "handArea") {
      this.removeMeme(memeName);

    } else {
      this.swapMeme(memeName, swappingMeme);
      console.log("swapped");
    }
  }
  swapMeme(firstMeme, secondMeme) {
    let indexDragged,
      indexSwapped;

    for (let i = 0; i < this.playingFieldArray.length; i++) {
      let meme = this.playingFieldArray[i];
      if (meme.id === firstMeme) {
        indexDragged = i;
        break;
      }
    }
    for (let i = 0; i < this.playingFieldArray.length; i++) {
      let meme = this.playingFieldArray[i];
      if (meme.id === secondMeme) {
        indexSwapped = i;
        break;
      }
    }
    this.playingFieldArray[indexDragged] = this.playingFieldArray.splice(indexSwapped,
      1, this.playingFieldArray[indexDragged])[
    0]; //https://stackoverflow.com/questions/872310/javascript-swap-array-elements/872317
    this.updatePlayingField();
  }

  submitMemes(){
    let jsarray = this.playingFieldArray;
    sessionStorage.setItem("jsArray", JSON.stringify(jsarray));
    document.location.href = "rating.html";
    console.log("huhu");
    

    

  }

}
export default PlayingField;